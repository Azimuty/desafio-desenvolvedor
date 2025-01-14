<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <?php
    $headerButton = "history";
    include('../lib/head.php');
    include('../lib/quote.php');
  ?>
</head>
<body class="container">

  <?php
    include('../lib/header.php');
  ?>

  <div class="container centered col-lg-6 login" id="novaCotacao">
    <h5 class="card-title text-center">Nova Cotação</h5>
    <form id="postQuote">
      
      <div class="form-group">
        <label for="moedaOrigem">Moeda de origem</label>
        <input type="text" class="form-control" id="moedaOrigem" value="BRL (Real Brasileiro)" readonly>
      </div>

      <div class="form-group">
        <label for="moedaDestino">Moeda de destino</label>
        <select class="custom-select custom-select mb-2" id="moedaDestino">
        </select>
      </div>

      <div class="form-group">
        <label for="valorConversao">Valor para conversão</label>
        <input type="number" class="form-control" id="valorConversao" min="1000" max="100000" step=".01">
      </div>
      
      <div class="form-group">
        <label for="formaPagamento">Forma de pagamento</label>
        <select class="custom-select custom-select mb-2" id="formaPagamento">
        </select>
      </div>

      <div class="text-center">
        <button class="btn btn-success" type="submit">Enviar Cotação</button>
      </div>

    </form>
  </div>

  <div class="container centered col-lg-12 login" style="display: none;" id="resultadoCotacao">
    <h5 class="card-title text-center">Resultado da Cotação</h5>

    <table class="table table-striped">
      <tbody>
        <tr>
          <th scope="row">Moeda de origem</th>
          <td>BRL (Real Brasileiro)</td>
        </tr>
        <tr>
          <th scope="row">Moeda de destino</th>
          <td id="coin"></td>
        </tr>
        <tr>
          <th scope="row">Valor para conversão</th>
          <td id="value"></td>
        </tr>
        <tr>
          <th scope="row">Forma de pagamento</th>
          <td id="payMethod"></td>
        </tr>
        <tr>
          <th scope="row">Valor da "Moeda de destino" usado para conversão</th>
          <td id="conversionCoinValue"></td>
        </tr>
        <tr>
          <th scope="row">Valor comprado em "Moeda de destino"</th>
          <td id="coinValue"></td>
        </tr>
        <tr>
          <th scope="row">Taxa de pagamento</th>
          <td id="payMethodRateValue"></td>
        </tr>
        <tr>
          <th scope="row">Taxa de conversão</th>
          <td id="conversionRateValue"></td>
        </tr>
        <tr>
          <th scope="row">Valor utilizado para conversão descontando as taxas</th>
          <td id="netValue"></td>
        </tr>
      </tbody>
    </table>

    <div class="text-center">
      <button class="btn btn-info" id="btnNovaCotacao">Nova Cotação</button>
    </div>

  </div>

</body>
</html>