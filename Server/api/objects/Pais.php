<?php

class Pais {
    
    private $conn;
    private $table_name;			
    
    public $codigo;
    public $nome;
    public $capital;

    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "pais";
    }

    function read($filter, $value) {
        $query = "SELECT * FROM $this->table_name";
        if ($filter != null && $value != null) {
            $filter = htmlspecialchars(strip_tags($filter));
            $query .= " WHERE $filter = ?";
        }
        $stmt = $this->conn->prepare($query);
        $value = htmlspecialchars(strip_tags($value));
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

    function delete($codigo) {
        $query = "DELETE FROM " . $this->table_name . " WHERE codigo = ?";
        $stmt = $this->conn->prepare($query);
        $codigo = htmlspecialchars(strip_tags($codigo));
        $stmt->bindParam(1, $codigo);
        $stmt->execute();
        return $stmt;
    }

    function addComma($res) {
      if(strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($codigo) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE codigo=:Codigo";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $codigo = htmlspecialchars(strip_tags($codigo));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":Codigo", $codigo);
        $stmt->execute();
        return $stmt;
    }
    
    private function buildQueryAttributes() {
      $res = "";
      if($this->codigo) {
        $res .= "Codigo=:Codigo";
      }
      if($this->nome) {
        $res = $this->addComma($res);
        $res .= "Nome=:Nome";
      }
      if($this->capital) {
        $res = $this->addComma($res);
        $res .= "Capital=:Capital";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->codigo) {
        $this->codigo = htmlspecialchars(strip_tags($this->codigo));
      }
      if ($this->nome) {
        $this->nome = htmlspecialchars(strip_tags($this->nome));
      }
      if ($this->capital) {
        $this->capital = htmlspecialchars(strip_tags($this->capital));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->codigo) {
        $stmt->bindParam(":Codigo", $this->codigo);
      }
      if ($this->nome) {
        $stmt->bindParam(":Nome", $this->nome);
      }
      if ($this->capital) {
        $stmt->bindParam(":Capital", $this->capital);
      }
      return $stmt;
    }
    
    function getCodeFromCountry($country) {
        $query = "SELECT Codigo FROM pais WHERE Nome = ?";
        $stmt = $this->conn->prepare($query);
        $country = htmlspecialchars(strip_tags($country));
        $stmt->bindParam(1, $country);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['Codigo']; 
    }
    
}

