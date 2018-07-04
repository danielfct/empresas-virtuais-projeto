<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once './config/Database.php';
    include_once './objects/Tarefa.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $tarefa = new Tarefa($db);
    
    $data = json_decode(file_get_contents("php://input"));
    echo '{ ';
    if ($data == null || !isset($data->id) || !isset($data->estado)) {
         echo '"message": "New values for task must be specified"';
    } else {
        $tarefa->estado = $data->estado;
        $stmt = $tarefa->update($data->id);
        $error = $stmt->errorInfo();
        echo '"message":"' . $error[2] . '"';
    }
    echo ' }';


