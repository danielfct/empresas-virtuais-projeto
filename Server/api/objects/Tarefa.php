<?php

class Tarefa {
    
    private $conn;
    private $table_name;      
 
    public $id;
    public $nome;
    public $tipo;
    public $dataTempoInicio;
    public $dataTempoFim;
    public $festival;
    public $coordenador;
    public $responsavel;
    public $estado;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "tarefa";
    }

    function read($filter1, $value1, $filter2, $value2) {
        $query = "SELECT * FROM $this->table_name";
        if ($filter1 != NULL && $value1 != NULL) {
            $query .= " WHERE $filter1 = ?";
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " AND $filter2 = ?";
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " WHERE $filter2 = ?";
            }
        }
        $stmt = $this->conn->prepare($query);
        if ($filter1 != NULL && $value1 != NULL) { 
            $stmt->bindParam(1, $value1);
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(2, $value2);
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(1, $value2);
            }
        }
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
        $id = htmlspecialchars(strip_tags($id));
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
        $stmt = $this->bindValues($stmt);
        $id = htmlspecialchars(strip_tags($id));
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
      if($this->tipo) {
        $res = $this->addComma($res);
        $res .= "Tipo=:Tipo";
      }
      if($this->dataTempoInicio) {
        $res = $this->addComma($res);
        $res .= "DataTempoInicio=:DataTempoInicio";
      }
      if($this->dataTempoFim) {
        $res = $this->addComma($res);
        $res .= "DataTempoFim=:DataTempoFim";
      }
      if($this->festival) {
        $res = $this->addComma($res);
        $res .= "Festival=:Festival";
      }
      if($this->coordenador) {
        $res = $this->addComma($res);
        $res .= "Coordenador=:Coordenador";
      }
      if($this->responsavel) {
        $res = $this->addComma($res);
        $res .= "Responsavel=:Responsavel";
      }
      if($this->estado) {
        $res = $this->addComma($res);
        $res .= "Estado=:Estado";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->id) {
        $this->id=htmlspecialchars(strip_tags($this->id));
      }
      if ($this->nome) {
        $this->nome=htmlspecialchars(strip_tags($this->nome));
      }
      if ($this->tipo) {
        $this->tipo=htmlspecialchars(strip_tags($this->tipo));
      }
      if ($this->dataTempoInicio) {
        $this->dataTempoInicio=htmlspecialchars(strip_tags($this->dataTempoInicio));
      }
      if ($this->dataTempoFim) {
        $this->dataTempoFim=htmlspecialchars(strip_tags($this->dataTempoFim));
      }
      if ($this->coordenador) {
        $this->coordenador=htmlspecialchars(strip_tags($this->coordenador));
      }
      if ($this->responsavel) {
        $this->responsavel=htmlspecialchars(strip_tags($this->responsavel));
      }
      if ($this->estado) {
        $this->estado=htmlspecialchars(strip_tags($this->estado));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->id) {
        $stmt->bindParam(":Id", $this->id);
      }
      if ($this->nome) {
        $stmt->bindParam(":Nome", $this->nome);
      }
      if ($this->tipo) {
        $stmt->bindParam(":Tipo", $this->tipo);
      }
      if ($this->dataTempoInicio) {
       $stmt->bindParam(":DataTempoInicio", $this->dataTempoInicio);
      }
      if ($this->dataTempoFim) {
         $stmt->bindParam(":DataTempoFim", $this->dataTempoFim);
      }
      if ($this->festival) {
         $stmt->bindParam(":Festival", $this->festival);
      }
      if ($this->coordenador) {
        $stmt->bindParam(":Coordenador", $this->coordenador);
      }
      if ($this->responsavel) {
        $stmt->bindParam(":Responsavel", $this->responsavel);
      }
      if ($this->estado) {
        $stmt->bindParam(":Estado", $this->estado);
      }
      return $stmt;
    }
}