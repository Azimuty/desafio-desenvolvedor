<?php

function authRoutes(Router $router) {
  $router->add('POST', '/login', 'auth', 'login', false);
}

?>