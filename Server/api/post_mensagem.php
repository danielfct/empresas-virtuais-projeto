<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once './config/Database.php';
    include_once './objects/Mensagem.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $mensagem = new Mensagem($db);
    $data = json_decode(file_get_contents("php://input"));
 
    echo '{ ';
    if ($data == null || $data->tipoEmissor == null || $data->emissor == null || 
            $data->tipoRecetor == null || $data->recetor == null ||
            $data->dataTempo == null || $data->mensagem == null || $data->idOrganizacao == null) {
         echo '"message":"Emissor type, emissor, recetor type, recetor, datatime, message and organizationId values must be specified"';
    } else {
        $mensagem->emissor = $data->emissor;
        $mensagem->recetor = isset($data->recetor);
        $mensagem->dataTempo = $data->dataTempo;
        $mensagem->mensagem = $data->mensagem;
        $mensagem->idOrganizacao = $data->idOrganizacao;
        if ($data->tipoEmissor == 0 && !isset($data->tipoRecetor)) {
            $stmt = $mensagem->insertMessageClient();
        }
        if ($data->tipoEmissor == 1 && !isset($data->tipoRecetor)) {
            $stmt = $mensagem->insertMessageEnterprise();
        }
        if ($data->tipoEmissor == 0 && $data->tipoRecetor == 1) {
            $stmt = $mensagem->insertMessageClientToEnterprise();
        } else if ($data->tipoEmissor == 1 && $data->tipoRecetor == 0) {
            $stmt = $mensagem->insertMessageEnterpriseToClient();
        } else if ($data->tipoEmissor == 1 && $data->tipoRecetor == 1) {
            $stmt = $mensagem->insertMessageEnterpriseToEnterprise();
        }
        else {
            echo '"message":"Wrong combination of emissor and recetor types: 0 for client and 1 for enterprise"';
        }
        if (isset($stmt)) {
            $error = $stmt->errorInfo();
            echo '"message":"'.$error[2].'"';
        }
    }
    echo ' }';