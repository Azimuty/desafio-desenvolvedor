<?php

require_once $basePath."model/quote.php";

require_once $basePath."service/quote.php";
require_once $basePath."service/coin.php";
require_once $basePath."service/payMethod.php";

class controller {

  /*
  * (GET) /quote-data - Obter lista de moedas e formas de pagamento
  */
  public function getData(Request $req, Response $res) {
    $res->onSuccess([
      'coins' => CoinSV::getCoins(),
      'payMethods' => PayMethodSV::getPayMethodData()
    ]);
  }

  /*
  * (GET) /quote - Obter histórico de cotações
  */
  public function getAll(Request $req, Response $res) {
    global $QuoteRP;
    $dbQuotes = $QuoteRP->getAll([ 'userId' => $req->userId ]);
    $res->onSuccess($dbQuotes);
  }

  /*
  * (POST) /quote - Adicionar nova cotação
  */
  public function create(Request $req, Response $res) {
    global $QuoteRP;
    $dbQuote = QuoteSV::createDbQuote($req, $res, $req->body);
    $res->onSuccess($QuoteRP->create($res, $dbQuote));
  }

}

?>