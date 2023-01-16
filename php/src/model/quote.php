<?php

require_once $basePath."util/database.php";

$QuoteMD = new Model("quote", [
  "userId" => [ "type" => "int" ],
  "coin" => [ "type" => "string", "require" => true ],
  "value" => [ "type" => "number", "require" => true, "min" => 1000, "max" => 100000 ],
  "payMethod" => [ "type" => "string", "require" => true ],
  "conversionCoinValue" => [ "type" => "number" ],
  "payMethodRate" => [ "type" => "number" ],
  "conversionRate" => [ "type" => "number" ],
  'payMethodRateValue' => [ "type" => "number" ],
  'conversionRateValue' => [ "type" => "number" ],
  'netValue' => [ "type" => "number" ],
  'coinValue' =>  [ "type" => "number" ],
  "createdAt" => [ "type" => "number" ]
]);

$QuoteRP = new Repository('Quote', $QuoteMD);

?>