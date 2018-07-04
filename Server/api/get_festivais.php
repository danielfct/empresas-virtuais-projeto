<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Festival.php';

$database = new Database();
$db = $database->getConnection();
$festival = new Festival($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $festival->read($filter, $value);

$festivais = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $festival_item = array(
        "id" => $Id,
        "nome" => $Nome,
        "pais" => $Pais,
        "cidade" => $Cidade,
        "localidade" => $Localidade,
        "dataInicio" => $DataInicio,
        "dataFim" => $DataFim,
    );
    array_push($festivais, $festival_item);
}
echo json_encode($festivais);