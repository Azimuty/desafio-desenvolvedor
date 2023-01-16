<?php

require_once $basePath."model/user.php";

require_once $basePath."service/user.php";

class controller {

  /*
  * (POST) /login - Efetuar login no sistema
  */
  public function login(Request $req, Response $res) {
    global $UserRP;
    $dbUser = $UserRP->getOne([ 'email' => $req->body['email'] ]);
    if ($dbUser == null) $res->onBadRequest(Errors::notFound('User'));
    if ($req->body['password'] != $dbUser['password']) $res->onBadRequest(Errors::isInvalid('Password'));
    $userRes = UserSV::output($dbUser);
    $res->onSuccess($userRes);
  }

}

?>