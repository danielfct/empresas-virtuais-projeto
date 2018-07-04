<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/EntidadePublica.php';

$database = new Database();
$db = $database->getConnection();
$entidadePublica = new EntidadePublica($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $entidadePublica->read($filter, $value);

$entidadesPublicas = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $entidade_publica_item = array(
        "nome" => $Nome,
        "contacto" => $Contacto,
        "pais" => $Pais,
        "cidade" => $Cidade,
        "tipo" => $Tipo
    );
    array_push($entidadesPublicas, $entidade_publica_item);
}
echo json_encode($entidadesPublicas);

