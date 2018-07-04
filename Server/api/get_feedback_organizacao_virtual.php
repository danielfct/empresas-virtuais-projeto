<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/FeedbackOrganizacaoVirtual.php';

$database = new Database();
$db = $database->getConnection();
$feedbackOrganizacaoVirtual = new FeedbackOrganizacaoVirtual($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $feedbackOrganizacaoVirtual->read($filter, $value);

$feedbacksOrganizacaoVirtual = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $feedbackOrganizacaoVirtual_item = array(
        "festival" => $Festival,
        "emailAvaliador" => $EmailAvaliador,
        "emailAvaliado" => $EmailAvaliado,
        "classificacao" => $Classificacao
    );
    array_push($feedbacksOrganizacaoVirtual, $feedbackOrganizacaoVirtual_item);
}
echo json_encode($feedbacksOrganizacaoVirtual);



