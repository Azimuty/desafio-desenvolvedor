<?php

class Database {

  public static $connection = null;

  public static function conn() {
    Database::$connection = pg_connect("host=172.17.0.1 dbname=postgres user=postgres password=postgres")
    or die ('Could not connect: ' . pg_last_error());;
  }

  public static function query($query = "" , $params = []) {
    return pg_query(Database::$connection, $query);
  }

}

Database::conn();

?>