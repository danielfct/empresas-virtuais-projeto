<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Cidade.php';

$database = new Database();
$db = $database->getConnection();
$cidade = new Cidade($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $cidade->read($filter, $value);

$cidades = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $cidade_item = array(
        "cidade" => $Cidade,
        "pais" => $Pais
    );
    array_push($cidades, $cidade_item);
}
echo json_encode($cidades);
