<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once './config/Database.php';
    include_once './objects/PedidoOrganizacaoVirtual.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $pedidoOrganizacaoVirtual = new PedidoOrganizacaoVirtual($db);
    
    $data = json_decode(file_get_contents("php://input"));
    echo '{ ';
    if ($data == null || !isset($data->idFestival) || !isset($data->emailCliente) || !isset($data->pedidoAprovado)) {
         echo '"message": "New values for virtual organization request must be specified"';
    } else {
        $pedidoOrganizacaoVirtual->pedidoAprovado = $data->pedidoAprovado;
        $stmt = $pedidoOrganizacaoVirtual->update($data->idFestival, $data->emailCliente);
        $error = $stmt->errorInfo();
        echo '"message":"' . $error[2] . '"';
    }
    echo ' }';