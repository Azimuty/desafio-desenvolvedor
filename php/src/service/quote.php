<?php

require_once $basePath."service/coin.php";
require_once $basePath."service/payMethod.php";
require_once $basePath."service/conversionRate.php";


class QuoteSV {

  /*
  * Cria a cotação a partir do dados recebidos
  */
  public static function createDbQuote(Request $req, Response $res, $quoteReq) {
    $payMethodRate = PayMethodSV::getPayMethodRate($res, $quoteReq['payMethod']);
    $conversionRate = ConversionRateSV::getQuoteRate($quoteReq['value']);
    $conversionValue = CoinSV::getConversionValue($res, $quoteReq['coin']);
    $payMethodRateValue = ceil($quoteReq['value'] * $payMethodRate) / 100;
    $conversionRateValue = ceil($quoteReq['value'] * $conversionRate) / 100;
    $netValue = $quoteReq['value'] - ($conversionRateValue + $payMethodRateValue);
    return [
      'userId' => $req->userId,
      'coin' => $quoteReq['coin'],
      'value' => $quoteReq['value'],
      'payMethod' =>  $quoteReq['payMethod'],
      'conversionCoinValue' => $conversionValue,
      'payMethodRate' => $payMethodRate,
      'conversionRate' => $conversionRate,
      'payMethodRateValue' => $payMethodRateValue,
      'conversionRateValue' => $conversionRateValue,
      'netValue' => $netValue,
      'coinValue' =>  floor(100 * $netValue / $conversionValue) / 100,
      'createdAt' =>  time() * 1000
    ];
  }

}

?>