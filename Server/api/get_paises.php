<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Pais.php';

$database = new Database();
$db = $database->getConnection();
$pais = new Pais($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $pais->read($filter, $value);

$paises = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);
    $pais_item = array(
        "codigo" => $Codigo,
        "nome" => $Nome,
        "capital" => $Capital
    );
    array_push($paises, $pais_item);
}
echo json_encode($paises);