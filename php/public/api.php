<?php

$basePath = "/var/www/src/";
require_once $basePath."util/azimuty.php";
require_once $basePath."route/index.php";

$req = new Request();
$res = new Response();

$router = new Router();
loadRoutes($router);
$route = $router->getRoute($req, $res);

try {
  require $basePath."controller/".$route->controller.".php";
  $controller = new Controller();
  $controller->{$route->action}($req, $res);
} catch (Exception $e) {
  $res->onNotFound();
}

?>
