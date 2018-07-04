<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/FeedbackTarefa.php';

$database = new Database();
$db = $database->getConnection();
$feedbackTarefa = new FeedbackTarefa($db);
$data = json_decode(file_get_contents("php://input"));

echo '{ ';
if ($data == null || $data->tarefa == null || $data->emailAvaliador == null || 
        $data->emailAvaliado == null || $data->classificacao  == null) {
    echo '"message":"Tarefa, emailAvaliador, emailAvaliado, classificacao values must be specified"';
} else {
    $feedbackTarefa->tarefa = $data->tarefa;
    $feedbackTarefa->emailAvaliador = $data->emailAvaliador;
    $feedbackTarefa->emailAvaliado = $data->emailAvaliado;
    $feedbackTarefa->classificacao = $data->classificacao;
    $stmt = $feedbackTarefa->insert();
    $error = $stmt->errorInfo();
    echo '"message":"' . $error[2] . '"';
}
echo ' }';



