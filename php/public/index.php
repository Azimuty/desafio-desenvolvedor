<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <?php
    include('../lib/head.php');
    include('../lib/auth.php');
  ?>
</head>
<body class="container">

<div class="container centered col-lg-6 login">

  <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
    
    <!-- Pills navs -->
    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link active" data-mdb-toggle="pill" href="#" role="tab"
          aria-controls="pills-login" aria-selected="true">Login</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#" role="tab"
          aria-controls="pills-register" aria-selected="false">Registro</a>
      </li>
    </ul>

    <form id="login">
      <br>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input type="email" id="loginEmail" class="form-control" />
        <label class="form-label" for="loginEmail">Email</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="loginPassword" class="form-control" />
        <label class="form-label" for="loginPassword">Senha</label>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Login</button>

    </form>
  </div>

  <div class="tab-pane" style="display: none;" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
    
    <!-- Pills navs -->
    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="tab-login" data-mdb-toggle="pill" href="#" role="tab"
          aria-controls="pills-login" aria-selected="true">Login</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link active" data-mdb-toggle="pill" href="#" role="tab"
          aria-controls="pills-register" aria-selected="false">Registro</a>
      </li>
    </ul>
    
    <form id="register"><br>
      <!-- Name input -->
      <div class="form-outline mb-4">
        <input type="text" id="registerName" class="form-control" />
        <label class="form-label" for="registerName">Name</label>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input type="email" id="registerEmail" class="form-control" />
        <label class="form-label" for="registerEmail">Email</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="registerPassword" class="form-control" />
        <label class="form-label" for="registerPassword">Password</label>
      </div>

      <!-- Repeat Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="registerRepeatPassword" class="form-control" />
        <label class="form-label" for="registerRepeatPassword">Repeat password</label>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-3">Registrar</button>
    </form>
  </div>
  <!-- Pills content -->
</div>

</body>
</html>