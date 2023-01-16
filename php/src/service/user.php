<?php

class UserSV {

  /*
  * Adiciona token e remove a senha
  */
  public static function output($user) {
    $user['token'] = Middleware::getToken($user['id']);
    unset($user['password']);
    return $user;
  }

}

?>