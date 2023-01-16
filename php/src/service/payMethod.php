<?php

class PayMethodSV {

  /*
  * Retorna os métodos de pagamento, com nome e taxa
  */
  public static function getPayMethodData() {
    return [
      "ticket" => [
        "name" => "Boleto",
        "rate" => 1.45
      ],
      "creditCard" => [
        "name" => "Cartão de Crédito",
        "rate" => 7.63
      ]
    ];
  }

  /*
  * Retorna a taxa referente ao método de pagamento selecionado.
  */
  public static function getPayMethodRate(Response $res, string $payMethod) {
    $payMethodsData = PayMethodSV::getPayMethodData();
    if (!(array_key_exists($payMethod, $payMethodsData))) $res->onBadRequest(Errors::isInvalid("Pay Method"));
    return $payMethodsData[$payMethod]['rate'];
  }

}

?>