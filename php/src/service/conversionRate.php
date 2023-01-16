<?php

class ConversionRateSV {

  /*
  * Retorna a taxa de conversão baseada no valor
  */
  public static function getQuoteRate(float $value) {
    $conversionRateData = [
      'quoteDivValue' => 3000,
      'lowQuoteRate' => 1,
      'hightQuoteRate' => 2
    ];
    if ($value <= $conversionRateData['quoteDivValue']) return $conversionRateData['hightQuoteRate'];
    return $conversionRateData['lowQuoteRate'];
  }

}

?>