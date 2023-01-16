<?php

require_once $basePath."model/user.php";

require_once $basePath."service/user.php";

class controller {

  /*
  * (POST) /create - Cadastrar novo usuário
  */
  public function create(Request $req, Response $res) {
    global $UserRP;
    $dbUser = $UserRP->create($res, $req->body);
    $res->onSuccess(UserSV::output($dbUser));
  }

}

?>