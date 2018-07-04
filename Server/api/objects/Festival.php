<?php

class Festival {
    
    private $conn;
    private $table_name;      
    
    public $id;
    public $nome;
    public $pais;
    public $cidade;
    public $localidade;
    public $dataInicio;
    public $dataFim;
    public $imagem;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "festival";
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
        $query = "DELETE FROM $this->table_name WHERE id = ?";
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
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE id=:Id";
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
      if($this->nome) {
        $res = $this->addComma($res);
        $res .= "Nome=:Nome";
      }
      if($this->pais) {
        $res = $this->addComma($res);
        $res .= "Pais=:Pais";
      }
      if($this->cidade) {
        $res = $this->addComma($res);
        $res .= "Cidade=:Cidade";
      }
      if($this->localidade) {
        $res = $this->addComma($res);
        $res .= "Localidade=:Localidade";
      }
      if($this->dataInicio) {
        $res = $this->addComma($res);
        $res .= "DataInicio=:DataInicio";
      }
      if($this->dataFim) {
        $res = $this->addComma($res);
        $res .= "DataFim=:DataFim";
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
      if ($this->nome) {
        $this->password=htmlspecialchars(strip_tags($this->nome));
      }
      if ($this->pais) {
        $this->pais=htmlspecialchars(strip_tags($this->pais));
      }
      if ($this->cidade) {
        $this->cidade=htmlspecialchars(strip_tags($this->cidade));
      }
      if ($this->localidade) {
        $this->localidade=htmlspecialchars(strip_tags($this->localidade));
      }
      if ($this->dataInicio) {
        $this->dataInicio=htmlspecialchars(strip_tags($this->dataInicio));
      }
      if ($this->dataFim) {
        $this->dataFim=htmlspecialchars(strip_tags($this->dataFim));
      }
      if ($this->imagem) {
        $this->imagem=htmlspecialchars(strip_tags($this->imagem));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->id) {
        $stmt->bindParam(":Id", $this->id);
      }
      if ($this->nome) {
        $stmt->bindParam(":Nome", $this->nome);
      }
      if ($this->pais) {
       $stmt->bindParam(":Pais", $this->pais);
      }
      if ($this->cidade) {
         $stmt->bindParam(":Cidade", $this->cidade);
      }
      if ($this->localidade) {
         $stmt->bindParam(":Localidade", $this->localidade);
      }
      if ($this->dataInicio) {
         $stmt->bindParam(":DataInicio", $this->dataInicio);
      }
      if ($this->dataFim) {
         $stmt->bindParam(":DataFim", $this->dataFim);
      }
      if ($this->imagem) {
        $stmt->bindParam(":Imagem", $this->imagem, PDO::PARAM_LOB);
      }
      return $stmt;
    }
}