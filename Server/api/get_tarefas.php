<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './objects/Tarefa.php';

$database = new Database();
$db = $database->getConnection();
$tarefa = new Tarefa($db);

$filter1 = filter_input(INPUT_GET, 'filter1');
$value1 = $filter1 != NULL ? filter_input(INPUT_GET, 'value1') : NULL;

$filter2 = filter_input(INPUT_GET, 'filter2');
$value2 = $filter2 != NULL ? filter_input(INPUT_GET, 'value2') : NULL;

$stmt = $tarefa->read($filter1, $value1, $filter2, $value2);

$tarefas = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $tarefa_item = array(
        "id" => $Id,
        "nome" => $Nome,
        "tipo" => $Tipo,
        "dataTempoInicio" => $DataTempoInicio,
        "dataTempoFim" => $DataTempoFim,
        "festival" => $Festival,
        "coordenador" => $Coordenador,
        "responsavel" => $Responsavel,
        "estado" => $Estado
    );
    array_push($tarefas, $tarefa_item);
}
echo json_encode($tarefas);