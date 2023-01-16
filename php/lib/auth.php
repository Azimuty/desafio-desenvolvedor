<script>

  $(document).ready(function(){

    $("#tab-login").click(function(){
      $("#pills-register").hide();
      $("#pills-login").show();
    });

    $("#tab-register").click(function(){
      $("#pills-login").hide();
      $("#pills-register").show();
    });

    $("#login").submit(function(e) {
      let data = {
        email: $("#loginEmail").val(),
        password: $("#loginPassword").val()
      };
      Api('/login', 'POST', function(response) {
        localStorage.setItem('token',response.token);
        localStorage.setItem('userName',response.name);
        goTo('/cotacao.php');
      }, data);
      pd(e);
    })

    $("#register").submit(function(e){
      let password = $("#registerPassword").val();
      if (password != $("#registerRepeatPassword").val()) {
        alert("As senhas digitadas não são iguais!!!");
        return false;
      }
      let data = {
        name: $("#registerName").val(),
        email: $("#registerEmail").val(),
        password: password
      };
      Api('/user', 'POST', function(response) {
        localStorage.setItem('token',response.token);
        localStorage.setItem('userName',response.name);
        goTo('/cotacao.php');
      }, data);
      pd(e);
    });

  });
   
</script>