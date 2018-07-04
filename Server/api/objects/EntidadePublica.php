<?php

class EntidadePublica {
    
    private $conn;
    private $table_name;      
    
    public $nome;
    public $contacto;
    public $pais;
    public $cidade;
    public $tipo;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "entidadePublica";
    }

    function read($filter, $value) {
        $query = "SELECT * FROM $this->table_name";
        if ($filter != NULL && $value != NULL) {
            $query .= " WHERE $filter = ?";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $value);
        $stmt->execute();
        return $stmt;
    }
    
    function insert() {             
        $query = "INSERT INTO $this->table_name SET " . $this->buildQueryAttributes();
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $stmt = $this->bindValues($stmt);
        $stmt->execute();
        return $stmt;
    }
    
    function delete($contacto) {
        $query = "DELETE FROM $this->table_name WHERE contacto = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $contacto);
        $stmt->execute();
        return $stmt;
    }
    
    function addComma($res) {
      if(strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($contacto) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE contacto=:Contacto";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $contacto=htmlspecialchars(strip_tags($contacto));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":Contacto", $contacto);
        $stmt->execute();
        return $stmt;
    }
    
    private function buildQueryAttributes() {
      $res = "";
      if($this->nome) {
        $res .= "Nome=:Nome";
      }
      if($this->contacto) {
        $res = $this->addComma($res);
        $res .= "Contacto=:Contacto";
      }
      if($this->pais) {
        $res = $this->addComma($res);
        $res .= "Pais=:Pais";
      }
      if($this->cidade) {
        $res = $this->addComma($res);
        $res .= "Cidade=:Cidade";
      }
      if($this->tipo) {
        $res = $this->addComma($res);
        $res .= "Tipo=:Tipo";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->nome) {
        $this->nome=htmlspecialchars(strip_tags($this->nome));
      }
      if ($this->contacto) {
        $this->contacto=htmlspecialchars(strip_tags($this->contacto));
      }
      if ($this->pais) {
        $this->pais=htmlspecialchars(strip_tags($this->pais));
      }
      if ($this->cidade) {
        $this->cidade=htmlspecialchars(strip_tags($this->cidade));
      }
      if ($this->tipo) {
        $this->tipo=htmlspecialchars(strip_tags($this->tipo));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->nome) {
        $stmt->bindParam(":Nome", $this->nome);
      }
      if ($this->contacto) {
        $stmt->bindParam(":Contacto", $this->contacto);
      }
      if ($this->pais) {
       $stmt->bindParam(":Pais", $this->pais);
      }
      if ($this->cidade) {
         $stmt->bindParam(":Cidade", $this->cidade);
      }
      if ($this->tipo) {
         $stmt->bindParam(":Tipo", $this->tipo);
      }
      return $stmt;
    }
}