<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Cliente.php';

$database = new Database();
$db = $database->getConnection();
$cliente = new Cliente($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $cliente->read($filter, $value);

$clientes = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $cliente_item = array(
        "email" => $Email,
        "password" => $Password,
        "nome" => $Nome,
        "telefone" => $Telefone,
        "telemovel" => $Telemovel,
        "morada" => $Morada,
        "avatar" => base64_encode($Avatar)
    );
    array_push($clientes, $cliente_item);
}
echo json_encode($clientes);

