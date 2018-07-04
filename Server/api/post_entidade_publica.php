<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/EntidadePublica.php';

$database = new Database();
$db = $database->getConnection();
$entidadePublica = new EntidadePublica($db);
$data = json_decode(file_get_contents("php://input"));

echo '{ ';
if ($data == null || $data->nome == null || $data->contacto == null || 
        $data->pais == null || $data->cidade  == null || $data->tipo  == null) {
    echo '"message":"Nome, contacto, pais, cidade and tipo values must be specified"';
} else {
    $entidadePublica->nome = $data->nome;
    $entidadePublica->contacto = $data->contacto;
    $entidadePublica->pais = $data->pais;
    $entidadePublica->cidade = $data->cidade;
    $entidadePublica->tipo = $data->tipo;
    $stmt = $entidadePublica->insert();
    $error = $stmt->errorInfo();
    echo '"message":"' . $error[2] . '"';
}
echo ' }';



