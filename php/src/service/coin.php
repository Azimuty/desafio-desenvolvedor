<?php

class CoinSV {

  /*
  * Acessa a url, filtra as conversões possíveis que comecem com BRL
  */
  public static function getCoins() {
    $coinRes = json_decode(file_get_contents('https://economia.awesomeapi.com.br/json/available'));
    $coins = [];
    foreach ($coinRes as $key => $value) {
      $coinFromTo = explode('-', $key);
      if ($coinFromTo[0] == "BRL")
        $coins[$coinFromTo[1]] = explode("/", $value)[1];
    }
    return $coins;
  }

  /*
  * Retorna o valor de conversão para a moeda selecionada.
  */
  public static function getConversionValue(Response $res, string $coin) {
    $coins = CoinSV::getCoins();
    if (!(array_key_exists($coin, $coins))) $res->onBadRequest(Errors::isInvalid("Coin"));
    $conversionRes = json_decode(file_get_contents('https://economia.awesomeapi.com.br/json/last/BRL-'.$coin));
    $key = 'BRL'.$coin;
    return ceil(100 * (1 / (float)($conversionRes->$key->bid))) / 100;
  }
}

?>