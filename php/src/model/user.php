<?php

require_once $basePath."util/database.php";

$UserMD = new Model("user", [
  "name" => [ "type" => "string", "require" => true ],
  "email" => [ "type" => "string", "unique" => [], "require" => true ],
  "password" => [ "type" => "string", "require" => true ]
]);

$UserRP = new Repository('User', $UserMD);

?>