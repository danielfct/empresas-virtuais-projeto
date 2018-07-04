<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once './config/Database.php';
    include_once './objects/OrganizacaoVirtual.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $organizacaoVirtual = new OrganizacaoVirtual($db);
    $data = json_decode(file_get_contents("php://input"));
 
    echo '{ ';
    if ($data == null || $data->idFestival == null || $data->emailCliente == null || $data->emailEmpresa == null) {
         echo '"message":"IdFestival, emailCliente and emailEmpresa values must be specified"';
    } else {
        $organizacaoVirtual->idFestival = $data->idFestival;
        $organizacaoVirtual->emailCliente = $data->emailCliente;
        $organizacaoVirtual->emailEmpresa = $data->emailEmpresa;
        $organizacaoVirtual->pedidoEmpresa = false;
        $stmt = $organizacaoVirtual->insert();
        $error = $stmt->errorInfo();
        echo '"message":"'.$error[2].'"';
    }
    echo ' }';
