<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <?php
    $headerButton = "quote";
    include('../lib/head.php');
    include('../lib/history.php');
  ?>
</head>
<body class="container">

  <?php
    include('../lib/header.php');
  ?>

  <div class="container centered col-lg-12 login">
    <h5 class="card-title text-center">Histórico de Cotações</h5>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Valor</th>
          <th>Pagamento</th>
          <th>Valor Conversão</th>
          <th>Valor Comprado</th>
          <th>Taxa Pagamento</th>
          <th>Taxa Conversão</th>
          <th>Valor Líquido</th>
        </tr>
      </thead>
      <tbody id="historico">
      </tbody>
    </table>

  </div>

</body>
</html>