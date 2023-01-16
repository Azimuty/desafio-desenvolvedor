<?php

function quoteRoutes(Router $router) {
  $router->add('GET', '/quote-data', 'quote', 'getData', true);
  $router->add('GET', '/quote', 'quote', 'getAll', true);
  $router->add('POST', '/quote', 'quote', 'create', true);
}

?>