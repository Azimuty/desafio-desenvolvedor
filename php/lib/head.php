<meta charset="UTF-8">
<title>Desafio Desenvolvedor</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<style>
  body {
    background: url('img/bkg.webp') center top;
    background-size: 100vw auto;
  }
  .login {
    margin-top: calc( 50vh - 300px );
  }
  .container, .navbar {
    background-color: rgba(255,255,255,0.9);
    border-radius: 7px;
    padding: 15px;
  }
</style>
<script>
  const url = "http://localhost:8080";

  function goTo(route) { window.location.href = `${url}${route}`; }
  function pd(e) { e.preventDefault(); }

  function Api(route, method, onSuccess, data = null) {
    const ajax = {
      type: method,
      url: `${url}/api${route}`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: { authorization: localStorage.getItem('token') || "" },
      success: onSuccess,
      failure: function (response) {
        console.log(response);
        alert("Failure"); 
      },
      error: function (response) {
        console.log(response);
        alert(response.responseJSON.message);
      } 
    };
    if (data != null) ajax['data'] = (typeof data == "object") ? JSON.stringify(data) : data;
    $.ajax(ajax);
  }

  $(document).ready(function(){

    $('#goToHistorico').click(function(e) { goTo('/historico.php'); pd(e); });

    $('#goToCotacao').click(function(e) { goTo('/cotacao.php'); pd(e); });

    $('#btnLogout').click(function(e) {
      localStorage.clear();
      goTo('/');
      pd(e);
    });

  });
</script>
