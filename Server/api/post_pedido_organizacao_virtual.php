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
    if ($data == null || $data->idFestival == null || $data->emailCliente == null) {
         echo '"message":"IdFestival, emailCliente values must be specified"';
    } else {
        $pedidoOrganizacaoVirtual->idFestival = $data->idFestival;
        $pedidoOrganizacaoVirtual->emailCliente = $data->emailCliente;
        $pedidoOrganizacaoVirtual->pedidoAprovado = false;
        $stmt = $pedidoOrganizacaoVirtual->insert();
        $error = $stmt->errorInfo();
        echo '"message":"'.$error[2].'"';
    }
    echo ' }';

