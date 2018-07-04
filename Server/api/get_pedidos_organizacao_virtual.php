<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/PedidoOrganizacaoVirtual.php';

$database = new Database();
$db = $database->getConnection();
$pedidoOrganizacaoVirtual = new PedidoOrganizacaoVirtual($db);

$filter = filter_input(INPUT_GET, 'filter');
$value = $filter != NULL ? filter_input(INPUT_GET, 'value') : NULL;

$stmt = $pedidoOrganizacaoVirtual->read($filter, $value);

$pedidos_organizacao_virtual = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $pedido_organizacao_virtual_item = array(
        "idFestival" => $IdFestival,
        "emailCliente" => $EmailCliente,
        "pedidoAprovado" => $PedidoAprovado
    );
    array_push($pedidos_organizacao_virtual, $pedido_organizacao_virtual_item);
}
echo json_encode($pedidos_organizacao_virtual);

