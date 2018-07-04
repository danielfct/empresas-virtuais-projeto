<?php

class PedidoOrganizacaoVirtual {
    
    private $conn;
    private $table_name;			
    
    public $idFestival;
    public $emailCliente;
    public $pedidoAprovado;

    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "pedidoOrganizacaoVirtual";
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

    function delete($idFestival, $emailCliente) {
        $query = "DELETE FROM " . $this->table_name . " WHERE idFestival = ? AND emailCliente = ?";
        $stmt = $this->conn->prepare($query);
        $idFestival = htmlspecialchars(strip_tags($idFestival));
        $emailCliente = htmlspecialchars(strip_tags($emailCliente));
        $stmt->bindParam(1, $idFestival);
        $stmt->bindParam(2, $emailCliente);
        $stmt->execute();
        return $stmt;
    }

    function addComma($res) {
      if(strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($idFestival, $emailCliente) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE idFestival=:IdFestival AND emailCliente=:EmailCliente";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $idFestival = htmlspecialchars(strip_tags($idFestival));
        $emailCliente = htmlspecialchars(strip_tags($emailCliente));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":IdFestival", $idFestival);
        $stmt->bindParam(":EmailCliente", $emailCliente);
        $stmt->execute();
        return $stmt;
    }
    
    private function buildQueryAttributes() {
      $res = "";
      if($this->idFestival) {
        $res .= "IdFestival=:IdFestival";
      }
      if($this->emailCliente) {
        $res = $this->addComma($res);
        $res .= "EmailCliente=:EmailCliente";
      }
      if($this->pedidoAprovado) {
        $res = $this->addComma($res);
        $res .= "PedidoAprovado=:PedidoAprovado";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->idFestival) {
        $this->idFestival = htmlspecialchars(strip_tags($this->idFestival));
      }
      if ($this->emailCliente) {
        $this->emailCliente = htmlspecialchars(strip_tags($this->emailCliente));
      }
      if ($this->pedidoAprovado) {
        $this->pedidoAprovado = htmlspecialchars(strip_tags($this->pedidoAprovado));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->idFestival) {
        $stmt->bindParam(":IdFestival", $this->idFestival);
      }
      if ($this->emailCliente) {
        $stmt->bindParam(":EmailCliente", $this->emailCliente);
      }
      if ($this->pedidoAprovado) {
        $stmt->bindParam(":PedidoAprovado", $this->pedidoAprovado);
      }
      return $stmt;
    }
    
}

