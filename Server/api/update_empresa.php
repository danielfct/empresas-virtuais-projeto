<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once './config/Database.php';
    include_once './objects/Empresa.php';
    $database = new Database();
    $db = $database->getConnection();
    $empresa = new Empresa($db);
    
    $data = json_decode(file_get_contents("php://input"));
    echo isset($data->password);
    echo '{ ';
    if ($data == null || !isset($data->email) || (!isset($data->password) && 
            !isset($data->nome) && !isset($data->telefone) && !isset($data->pais) &&
            !isset($data->cidade) && !isset($data->localidade) && !isset($data->avatar) && 
            !isset($data->numTrabalhadores) && !isset($data->zonaOperacao) && 
            !isset($data->registoAprovado))) {
         echo '"message": "New values for enterprise must be specified"';
    } else {
        $empresa->password = isset($data->password) ? $data->password : null;
        $empresa->nome = isset($data->nome) ? $data->nome : null;
        $empresa->telefone = isset($data->telefone) ? $data->telefone : null;
        $empresa->pais = isset($data->pais) ? $data->pais : null;
        $empresa->cidade = isset($data->cidade) ? $data->cidade : null;
        $empresa->localidade = isset($data->localidade) ? $data->localidade : null;
        $empresa->avatar = isset($data->avatar) ? $data->avatar : null;
        $empresa->numTrabalhadores = isset($data->numTrabalhadores) ? $data->numTrabalhadores : null;
        $empresa->zonaOperacao = isset($data->zonaOperacao) ? $data->zonaOperacao : null;
        $empresa->registoAprovado = isset($data->registoAprovado) ? $data->registoAprovado : null;
        $stmt = $empresa->update($data->email);
        $error = $stmt->errorInfo();
        echo '"message":"' . $error[2] . '"';
    }
    echo ' }';

