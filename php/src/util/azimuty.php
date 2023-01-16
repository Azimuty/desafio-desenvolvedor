<?php

require_once $basePath.'util/jwt.php';


class Request {

  public $method = "";
  public $url = "";
  public $query = [];
  public $headers = null;
  public $body = null;
  public $userId = null;

  function __construct() {
    $uri = explode("/", $_SERVER['REQUEST_URI'], 3);

    $this->method = $_SERVER["REQUEST_METHOD"];
    $this->url = "/".explode("?", (count($uri) > 2 ? $uri[2] : ""), 2)[0];
    parse_str($_SERVER['QUERY_STRING'], $this->query);
    $this->headers = getallheaders();
    $this->body = json_decode(file_get_contents('php://input'), true);
  }
  
}


class Response {

  public function onSuccess($data) {
    header_remove('Set-Cookie');
    header("HTTP/1.1 200 OK");
    echo json_encode($data);
    exit();
  }

  public function onBadRequest($error) {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode($error);
    exit();
  }

  public function onUnauthorized() {
    header("HTTP/1.1 401 Unauthorized");
    exit();
  }

  public function onNotFound() {
    header("HTTP/1.1 404 Not Found");
    exit();
  }

}


class Router {
  public $routes = [];

  /*
  * Adiciona nova rota.
  */
  public function add($method, $url, $controller, $action, $auth) {
    array_push($this->routes, (object) [
      'method' => $method,
      'url' => $url,
      'controller' => $controller,
      'action' => $action,
      'auth' => $auth
    ]);
  }

  /*
  * Localiza a rota e autentifica caso a rota indique necessário.
  */
  public function getRoute(Request &$req, Response $res) {
    foreach ($this->routes as $route)
      if ($route->method == $req->method && $route->url == $req->url) {
        if ($route->auth)
          Middleware::verifyToken($req, $res);
        return $route;
      }
    $res->onNotFound();
  }
}


class Middleware {

  protected static $tokenSecret = 'MyTG33ZJhnTAB5HRXt';

  /*
  * Retorna o token a partir do id do usuário
  */
  public static function getToken($userId): string {
    return JWT::encode([ 'id' => $userId ],  Middleware::$tokenSecret);
  }

  /*
  * Verifica o token recebido e incrementa a variável request com o id do usuário.
  */
  public static function verifyToken(Request &$req, Response $res) {
    $authorization = array_key_exists('Authorization', $req->headers) ? $req->headers['Authorization'] : "";
    $decodedToken = JWT::decode($authorization, Middleware::$tokenSecret);
    if ($decodedToken == null) $res->onUnauthorized();
    $req->userId = $decodedToken['id'];
  }

}


class Model {

  public $tableName = "";
  public $params = [];

  function __construct(string $tableName, $params) {
    $this->tableName = $tableName;
    $this->params = $params;
    $this->createTable();
  }

  private function createTable() {
    $query = "create table if not exists \"".$this->tableName."\" ( id serial PRIMARY KEY";
    foreach ($this->params as $key => $param) {
      $query .= ", \"".$key."\" ";
      if (array_key_exists('type', $param)) {
        switch ($param['type']) {
          case "string":
            $query .= "varchar(255) "; break;
          default:
            $query .= "varchar(255) ";
        }
      } else {
        $query .= "varchar(255) ";
      }
      $query .= "not null";
    }
    $query .= " )";
    pg_query($query) or die('Query failed: ' . pg_last_error());
  }
}


class Repository {
  private $model = null;
  private $objName = null;

  function __construct(string $objName, Model $model) {
    $this->objName = $objName;
    $this->model = $model;
  }
  
  public function getAll($where = null) {
    $query = "select * from \"".$this->model->tableName."\"".$this->getWhere($where);
    $result = Database::query($query);
    if (!$result) return [];
    return pg_fetch_all($result);
  }

  public function getOneById(Response $res, $id) {
    $query = "select * from \"".$this->model->tableName."\" where id=".$id." limit 1";
    $result = Database::query($query);
    $resultArray = pg_fetch_all($result);
    if (count($resultArray) > 0) return $resultArray[0];
    $res->onBadRequest(Errors::notFound($this->objName));
  }

  public function getOne($where = null) {
    $query = "select * from \"".$this->model->tableName."\"".$this->getWhere($where)." limit 1";
    $result = Database::query($query);
    if (!$result) return null;
    $resultArray = pg_fetch_all($result);
    if (count($resultArray) > 0) return $resultArray[0];
    return null;
  }

  public function create(Response $res, array $data) {
    $this->inputVerification($res, $data);
    $columns = "";
    $values = "";
    foreach ($this->model->params as $key => $param) {
      $columns .= ($columns == "" ? "" : ", ").'"'.$key.'"';
      $values .= ($values == "" ? "" : ", ")."'".$data[$key]."'";
    }
    $query = "insert into \"".$this->model->tableName."\" (".$columns.") values (".$values.") returning *";
    $result = Database::query($query);
    if (!$result) return null;
    $resultArray = pg_fetch_all($result);
    if (count($resultArray) > 0) return $resultArray[0];
    return null;
  }

  private function getWhere($where) {
    if ($where == null) return "";
    $query = "";
    foreach($where as $key => $value) {
      $aspas = is_string($value) ? "'" : "";
      $query .= ($query == "" ? "" : ",").' "'.$key.'"='.$aspas.$value.$aspas;
    }
    return ($query == "" ? "" : " where").$query;
  }

  /*** VERIFICATION ***/
  private function inputVerification(Response $res, array &$data) {
    foreach($this->model->params as $param => $properties) {

      // Require
      if (array_key_exists('require', $properties) && $properties['require']
        && (!array_key_exists($param, $data) || empty($data[$param]) ))
        $res->onBadRequest(Errors::isInvalid($param));

      // Unique
      if (array_key_exists('unique', $properties)) {
        $where = [];
        foreach ($properties['unique'] as $prop)
          if (array_key_exists($prop, $data) && !empty($data[$prop]))
            array_push($where, $data[$prop]);
        $exists = $this->getOne($where);
        if ($exists != null) $res->onBadRequest(Errors::isUnavailable($param));
      }

      // Min
      if (array_key_exists('min', $properties) && array_key_exists($param, $data))
        if ($data[$param] < $properties['min'])
          $res->onBadRequest(custom('INVALID-PARAM-VALUE','Failed: Invalid '.$param.' < '.$properties['min']));

      // Max
      if (array_key_exists('max', $properties) && array_key_exists($param, $data))
        if ($data[$param] > $properties['max'])
          $res->onBadRequest(custom('INVALID-PARAM-VALUE','Failed: Invalid '.$param.' > '.$properties['max']));

    }
  }

}


class Errors {

  public static function notFound(string $obj, string $msg = null) {
    return [
      'name' => str_replace(' ', '-', strtoupper($obj)).'-NOT-FOUND',
      'message' => $msg != null ? $msg : 'Failed: '.$obj.' not found.'
    ];
  }

  public static function isInvalid(string $obj, string $msg = null) {
    return [
      'name' => 'INVALID-'.str_replace(' ', '-', strtoupper($obj)),
      'message' => $msg != null ? $msg : 'Failed: Invalid '.$obj.'.'
    ];
  }

  public static function isUnavailable(string $obj, string $msg = null) {
    return [
      'name' => str_replace(' ', '-', strtoupper($obj)).'-UNAVAILABLE',
      'message' => $msg != null ? $msg : 'Failed: This '.$obj.' is already in use!'
    ];
  }

  public static function custom(string $name, string $msg) {
    return [
      'name' => str_replace(' ', '-', strtoupper($name)),
      'message' => $msg
    ];
  }

}

?>