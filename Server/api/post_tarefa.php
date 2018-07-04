<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Tarefa.php';

$database = new Database();
$db = $database->getConnection();
$tarefa = new Tarefa($db);
$data = json_decode(file_get_contents("php://input"));

echo '{ ';
if ($data == null || $data->nome == null || $data->tipo == null || $data->dataTempoInicio == null || 
        $data->dataTempoFim == null || $data->festival == null || $data->coordenador == null || 
        $data->responsavel == null) {
    echo '"message":"Nome, pais, cidade, localidade, dataInicio and dataFim values must be specified"';
} else {
    $tarefa->tipo = $data->tipo;
    $tarefa->nome = $data->nome;
    $tarefa->dataTempoInicio = $data->dataTempoInicio;
    $tarefa->dataTempoFim = $data->dataTempoFim;
    $tarefa->festival = $data->festival;
    $tarefa->coordenador = $data->coordenador;
    $tarefa->responsavel = $data->responsavel;
    $festival->estado = "Incompleta";
    $stmt = $tarefa->insert();
    $error = $stmt->errorInfo();
    echo '"message":"' . $error[2] . '"';
}
echo ' }';
