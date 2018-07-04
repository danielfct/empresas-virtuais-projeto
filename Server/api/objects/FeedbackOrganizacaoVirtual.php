<?php

class FeedbackOrganizacaoVirtual {
    
    private $conn;
    private $table_name;      
    
    public $festival;
    public $emailAvaliador;
    public $emailAvaliado;
    public $classificacao;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "feedbackOrganizacaoVirtual";
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
    
    function delete($festival, $emailAvaliador, $emailAvaliado) {
        $query = "DELETE FROM $this->table_name WHERE festival = ? AND emailAvaliador = ? AND emailAvaliado = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $festival);
        $stmt->bindParam(2, $emailAvaliador);
        $stmt->bindParam(3, $emailAvaliado);
        $stmt->execute();
        return $stmt;
    }
    
    function addComma($res) {
      if(strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($festival, $emailAvaliador, $emailAvaliado) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE festival=:Festival AND emailAvaliador=:EmailAvaliador AND emailAvaliado=:EmailAvaliado";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $festival=htmlspecialchars(strip_tags($festival));
        $emailAvaliador=htmlspecialchars(strip_tags($emailAvaliador));
        $emailAvaliado=htmlspecialchars(strip_tags($emailAvaliado));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":Festival", $festival);
        $stmt->bindParam(":EmailAvaliador", $emailAvaliador);
        $stmt->bindParam(":EmailAvaliado", $emailAvaliado);
        $stmt->execute();
        return $stmt;
    }

    private function buildQueryAttributes() {
      $res = "";
      if($this->festival) {
        $res .= "Festival=:Festival";
      }
      if($this->emailAvaliador) {
        $res = $this->addComma($res);
        $res .= "EmailAvaliador=:EmailAvaliador";
      }
      if($this->emailAvaliado) {
        $res = $this->addComma($res);
        $res .= "EmailAvaliado=:EmailAvaliado";
      }
      if($this->classificacao) {
        $res = $this->addComma($res);
        $res .= "Classificacao=:Classificacao";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->festival) {
        $this->festival=htmlspecialchars(strip_tags($this->festival));
      }
      if ($this->emailAvaliador) {
        $this->emailAvaliador=htmlspecialchars(strip_tags($this->emailAvaliador));
      }
      if ($this->emailAvaliado) {
        $this->emailAvaliado=htmlspecialchars(strip_tags($this->emailAvaliado));
      }
      if ($this->classificacao) {
        $this->classificacao=htmlspecialchars(strip_tags($this->classificacao));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->festival) {
        $stmt->bindParam(":Festival", $this->festival);
      }
      if ($this->emailAvaliador) {
        $stmt->bindParam(":EmailAvaliador", $this->emailAvaliador);
      }
      if ($this->emailAvaliado) {
       $stmt->bindParam(":EmailAvaliado", $this->emailAvaliado);
      }
      if ($this->classificacao) {
         $stmt->bindParam(":Classificacao", $this->classificacao);
      }
      return $stmt;
    }
}