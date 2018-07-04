<?php

class Localidade {
    
    private $conn;
    private $table_name;      
    
    public $nome;
    public $cidade;
    public $pais;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "localidade";
    }

    function read($filter, $value) {
        $query = "SELECT $this->table_name.Nome as Localidade, Cidade, pais.Nome as Pais "
                . "FROM $this->table_name "
                . "INNER JOIN pais ON $this->table_name.Pais = pais.Codigo";
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
    
    function delete($nome, $cidade, $pais) {
        $query = "DELETE FROM $this->table_name WHERE nome = ? AND cidade = ? AND pais = ?";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $stmt->bindParam(1, $nome);
        $stmt->bindParam(2, $cidade);
        $stmt->bindParam(3, $pais);
        $stmt->execute();
        return $stmt;
    }
    
    function addComma($res) {
      if(strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($nome, $cidade, $pais) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE nome=:Nome AND cidade=:Cidade AND pais=:Pais";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $nome = htmlspecialchars(strip_tags($nome));
        $cidade = htmlspecialchars(strip_tags($cidade));
        $pais = htmlspecialchars(strip_tags($pais));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":Nome", $nome);
        $stmt->bindParam(":Cidade", $cidade);
        $stmt->bindParam(":Pais", $pais);
        $stmt->execute();
        return $stmt;
    }

    private function buildQueryAttributes() {
      $res = "";
      if($this->nome) {
        $res .= "Nome=:Nome";
      }
      if($this->cidade) {
        $res = $this->addComma($res);
        $res .= "Cidade=:Cidade";
      }
      if($this->pais) {
        $res = $this->addComma($res);
        $res .= "Pais=:Pais";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->nome) {
        $this->nome=htmlspecialchars(strip_tags($this->nome));
      }
      if ($this->cidade) {
        $this->cidade=htmlspecialchars(strip_tags($this->cidade));
      }
      if ($this->pais) {
        $this->pais=htmlspecialchars(strip_tags($this->pais));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->nome) {
        $stmt->bindParam(":Nome", $this->nome);
      }
      if ($this->cidade) {
        $stmt->bindParam(":Cidade", $this->cidade);
      }
      if ($this->pais) {
       $stmt->bindParam(":Pais", $this->pais);
      }
      return $stmt;
    }
}
