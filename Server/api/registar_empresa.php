<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Empresa.php';
include_once './objects/Pais.php';

$database = new Database();
$db = $database->getConnection();
$empresa = new Empresa($db);
$pais = new Pais($db); 

$data = json_decode(file_get_contents("php://input"));
echo '{ ';
if ($data == null || $data->email == null || $data->password == null ||
        $data->nome == null || $data->telefone == null || $data->pais == null ||
        $data->cidade == null || $data->localidade == null || $data->numTrabalhadores == null ||
        $data->zonaOperacao == null || $data->tipo == null) {
    echo '"message": "Values for new enterprise must be specified"';
} else {
    $empresa->email = $data->email;
    $empresa->password = $data->password;
    $empresa->nome = $data->nome;
    $empresa->telefone = $data->telefone;
    $empresa->pais = $pais->getCodeFromCountry($data->pais);
    $empresa->cidade = $data->cidade;
    $empresa->localidade = $data->localidade;
    $empresa->numTrabalhadores = $data->numTrabalhadores;
    $empresa->zonaOperacao = $data->zonaOperacao;
    $empresa->tipo = $data->tipo;
    $empresa->registoAprovado = false;
    $stmt = $empresa->insert();
    $error = $stmt->errorInfo();
    echo '"message":"' . $error[2] . '"';
}
echo ' }';
