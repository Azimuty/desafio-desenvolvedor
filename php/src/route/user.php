<?php

function userRoutes(Router $router) {
  $router->add('POST', '/user', 'user', 'create', false);
}

?>