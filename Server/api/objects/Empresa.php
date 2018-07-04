<?php

class Empresa {
    
    private $conn;
    private $table_name;      
    
    public $email;
    public $password;
    public $nome;
    public $telefone;
    public $pais;
    public $cidade;
    public $localidade;
    public $avatar;
    public $numTrabalhadores;
    public $zonaOperacao;
    public $tipo;
    public $registoAprovado;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "empresa";
    }

    function read($filter, $value) {
        $query = "SELECT * FROM $this->table_name";
        if (isset($filter)&& isset($value)) {
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
    
    function delete($email) {
        $query = "DELETE FROM $this->table_name WHERE Email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);
        $stmt->execute();
        return $stmt;
    }
    
    function addComma($res) {
      if (strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($email) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE Email=:Email";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $email=htmlspecialchars(strip_tags($email));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":Email", $email);
        $stmt->execute();
        return $stmt;
    }
    
    private function buildQueryAttributes() {
      $res = "";
      if($this->email) {
        $res .= "Email=:Email";
      }
      if($this->password) {
        $res = $this->addComma($res);
        $res .= "Password=:Password";
      }
      if($this->nome) {
        $res = $this->addComma($res);
        $res .= "Nome=:Nome";
      }
      if($this->telefone) {
        $res = $this->addComma($res);
        $res .= "Telefone=:Telefone";
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
      if($this->avatar) {
        $res = $this->addComma($res);
        $res .= "Avatar=:Avatar";
      }
      if($this->numTrabalhadores) {
        $res = $this->addComma($res);
        $res .= "NumTrabalhadores=:NumTrabalhadores";
      }
      if($this->zonaOperacao) {
        $res = $this->addComma($res);
        $res .= "ZonaOperacao=:ZonaOperacao";
      }
      if($this->tipo) {
        $res = $this->addComma($res);
        $res .= "Tipo=:Tipo";
      }
      if($this->registoAprovado) {
        $res = $this->addComma($res);
        $res .= "RegistoAprovado=:RegistoAprovado";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->email) {
        $this->email=htmlspecialchars(strip_tags($this->email));
      }
      if ($this->password) {
        $this->password=htmlspecialchars(strip_tags($this->password));
      }
      if ($this->nome) {
        $this->nome=htmlspecialchars(strip_tags($this->nome));
      }
      if ($this->telefone) {
        $this->telefone=htmlspecialchars(strip_tags($this->telefone));
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
      if ($this->avatar) {
        $this->avatar=htmlspecialchars(strip_tags($this->avatar));
      }
      if ($this->numTrabalhadores) {
        $this->numTrabalhadores=htmlspecialchars(strip_tags($this->numTrabalhadores));
      }
      if ($this->zonaOperacao) {
        $this->zonaOperacao=htmlspecialchars(strip_tags($this->zonaOperacao));
      }
      if ($this->tipo) {
        $this->tipo=htmlspecialchars(strip_tags($this->tipo));
      }
      if ($this->registoAprovado) {
        $this->registoAprovado=htmlspecialchars(strip_tags($this->registoAprovado));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->email) {
        $stmt->bindParam(":Email", $this->email);
      }
      if ($this->password) {
        $stmt->bindParam(":Password", $this->password);
     }
      if ($this->nome) {
        $stmt->bindParam(":Nome", $this->nome);
      }
      if ($this->telefone) {
       $stmt->bindParam(":Telefone", $this->telefone);
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
      if ($this->avatar) {
        $stmt->bindParam(":Avatar", $this->avatar, PDO::PARAM_LOB);
      }
      if ($this->numTrabalhadores) {
        $stmt->bindParam(":NumTrabalhadores", $this->numTrabalhadores);
      }
      if ($this->zonaOperacao) {
        $stmt->bindParam(":ZonaOperacao", $this->zonaOperacao);
      }
      if ($this->tipo) {
        $stmt->bindParam(":Tipo", $this->tipo);
      }
      if ($this->registoAprovado) {
        $stmt->bindParam(":RegistoAprovado", $this->registoAprovado);
      }
      return $stmt;
    }
}