<?php

require $basePath.'route/auth.php';
require $basePath.'route/user.php';
require $basePath.'route/quote.php';

function loadRoutes(Router $router) {
  authRoutes($router);
  userRoutes($router);
  quoteRoutes($router);
}

?>