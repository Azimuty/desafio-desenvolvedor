<nav class="navbar navbar-light">
  <a class="navbar-brand">Bem vindo <script>document.write(localStorage.getItem('userName'));</script></a>
  <form class="form-inline">
    <?php if ($headerButton == "history") { ?>
      <button class="btn btn-outline-success mr-md-3 my-2 my-sm-0" id="goToHistorico">Historico</button>
    <?php } else { ?>
      <button class="btn btn-success mr-md-3 my-2 my-sm-0" id="goToCotacao">Nova Cotação</button>
    <?php } ?>
    <button class="btn btn-outline-success my-2 my-sm-0" id="btnLogout">Logout</button>
  </form>
</nav>