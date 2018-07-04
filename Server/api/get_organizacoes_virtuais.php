<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/OrganizacaoVirtual.php';

$database = new Database();
$db = $database->getConnection();
$organizacaoVirtual = new OrganizacaoVirtual($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $organizacaoVirtual->read($filter, $value);

$organizacoesVirtuais = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $organizacaoVirtual_item = array(
        "idFestival" => $IdFestival,
        "emailCliente" => $EmailCliente,
        "emailEmpresa" => $EmailEmpresa,
        "pedidoEmpresa" => $PedidoEmpresa
    );
    array_push($organizacoesVirtuais, $organizacaoVirtual_item);
}
echo json_encode($organizacoesVirtuais);
