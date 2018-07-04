<?php

class Imagem {
    
    private $conn;
    private $table_name;      
    
    public $id;
    public $imagem;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "imagem";
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
    
    function delete($id) {
        $query = "DELETE FROM $this->table_name WHERE Id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt;
    }
    
    function addComma($res) {
      if(strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($id) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE Id=:Id";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $id=htmlspecialchars(strip_tags($id));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":Id", $id);
        $stmt->execute();
        return $stmt;
    }
    
    private function buildQueryAttributes() {    
      $res = "";
      if($this->id) {
        $res .= "Id=:Id";
      }
      if($this->imagem) {
        $res = $this->addComma($res);
        $res .= "Imagem=:Imagem";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->id) {
        $this->id=htmlspecialchars(strip_tags($this->id));
      }
      if ($this->imagem) {
        $this->imagem=htmlspecialchars(strip_tags($this->imagem));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->id) {
        $stmt->bindParam(":Id", $this->id);
      }
      if ($this->imagem) {
        $stmt->bindParam(":Imagem", $this->imagem);
      }
      return $stmt;
    }
}