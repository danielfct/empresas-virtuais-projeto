<?php
  // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-type: image/jpeg");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once './config/Database.php';
    include_once './objects/Festival.php';
    
    $database = new Database();
    $db = $database->getConnection();
    $festival = new Festival($db);
    
    $id = filter_input(INPUT_GET, 'id');
    $stmt = $festival->read("id", $id);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo $row['Imagem'];