<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Empresa.php';

$database = new Database();
$db = $database->getConnection();
$empresa = new Empresa($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $empresa->read($filter, $value);

$empresas = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $empresa_item = array(
        "email" => $Email,
        "password" => $Password,
        "nome" => $Nome,
        "telefone" => $Telefone,
        "pais" => $Pais,
        "cidade" => $Cidade,
        "localidade" => $Localidade,
        "avatar" => base64_encode($Avatar),
        "numTrabalhadores" => $NumTrabalhadores,
        "zonaOperacao" => $ZonaOperacao,
        "tipo" => $Tipo
    );
    array_push($empresas, $empresa_item);
}
echo json_encode($empresas);