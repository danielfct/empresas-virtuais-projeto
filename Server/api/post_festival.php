<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Festival.php';
include_once './objects/Pais.php';

$database = new Database();
$db = $database->getConnection();
$festival = new Festival($db);
$pais = new Pais($db);
$data = json_decode(file_get_contents("php://input"));

echo '{ ';
if ($data == null || $data->nome == null || $data->pais == null || $data->cidade == null ||
        $data->localidade == null || $data->dataInicio == null || $data->dataFim == null) {
    echo '"message":"Nome, pais, cidade, localidade, dataInicio and dataFim values must be specified"';
} else {
    $festival->nome = $data->nome;
    $festival->pais = $pais->getCodeFromCountry($data->pais);
    $festival->cidade = $data->cidade;
    $festival->localidade = $data->localidade;
    $festival->dataInicio = $data->dataInicio;
    $festival->dataFim = $data->dataFim;
    $stmt = $festival->insert();
    $error = $stmt->errorInfo();
    echo '"message":"' . $error[2] . '"';
}
echo ' }';
