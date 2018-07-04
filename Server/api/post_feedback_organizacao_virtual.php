<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/FeedbackOrganizacaoVirtual.php';

$database = new Database();
$db = $database->getConnection();
$feedbackOrganizacaoVirtual = new FeedbackOrganizacaoVirtual($db);
$data = json_decode(file_get_contents("php://input"));

echo '{ ';
if ($data == null || $data->festival == null || $data->emailAvaliador == null || 
        $data->emailAvaliado == null || $data->classificacao  == null) {
    echo '"message":"Festival, emailAvaliador, emailAvaliado, classificacao values must be specified"';
} else {
    $feedbackOrganizacaoVirtual->festival = $data->festival;
    $feedbackOrganizacaoVirtual->emailAvaliador = $data->emailAvaliador;
    $feedbackOrganizacaoVirtual->emailAvaliado = $data->emailAvaliado;
    $feedbackOrganizacaoVirtual->classificacao = $data->classificacao;
    $stmt = $feedbackOrganizacaoVirtual->insert();
    $error = $stmt->errorInfo();
    echo '"message":"' . $error[2] . '"';
}
echo ' }';

