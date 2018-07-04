<?php
 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Cliente.php';
include_once './objects/Empresa.php';

$database = new Database();
$db = $database->getConnection();
$cliente = new Cliente($db);
$empresa = new Empresa($db);

$data = json_decode(file_get_contents("php://input"));
echo '{ ';
if ($data == null || !isset($data->tipo) || !isset($data->email) || !isset($data->password)) {
    echo '"message":"Tipo, email and password values must be specified"';
} else {
    if ($data->tipo == 0) {
        $stmt = $cliente->read('Email', $data->email);
    } else if ($data->tipo == 1) {
        $stmt = $empresa->read('Email', $data->email);
    } else {
        echo '"message":"Unexpected tipo value. 0 for client, 1 for enterprise"';
    }
    
    if (isset($stmt)) {
        $error = $stmt->errorInfo();
        $num = $stmt->rowCount();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (isset($error[2])) {
            echo '"message":"' . $error[2] . '"';
        } else if ($num == 0) {
            echo '"message":"Email or password wrong"';
        } else if (strcmp($row['Password'], $data->password) != 0) {
            echo '"message":"Email or password wrong"';
        } else if ($data->tipo == 1 && $row['RegistoAprovado'] == 0) {
            echo '"message":"Register not yet aproved by VBE administrator"';
        } else {
            echo '"message":""';
        }
    }
}
echo ' }';
