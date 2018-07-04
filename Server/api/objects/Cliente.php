<?php

class Cliente {
    
    private $conn;
    private $table_name;      
    
    public $email;
    public $password;
    public $username;
    public $nome;
    public $telefone;
    public $telemovel;
    public $morada;
    public $avatar;
    
    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = "cliente";
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
    
    function delete($email) {
        $query = "DELETE FROM $this->table_name WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);
        $stmt->execute();
        return $stmt;
    }
    
    function addComma($res) {
      if(strlen($res) > 0) {
        $res .= ", ";
      }
      return $res;
    }
    
    function update($email) {
        $query = "UPDATE $this->table_name SET " . $this->buildQueryAttributes() . " WHERE email=:Email";
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
      if($this->username) {
        $res = $this->addComma($res);
        $res .= "Username=:Username";
      }
      if($this->nome) {
        $res = $this->addComma($res);
        $res .= "Nome=:Nome";
      }
      if($this->telefone) {
        $res = $this->addComma($res);
        $res .= "Telefone=:Telefone";
      }
      if($this->telemovel) {
        $res = $this->addComma($res);
        $res .= "Telemovel=:Telemovel";
      }
      if($this->morada) {
        $res = $this->addComma($res);
        $res .= "Morada=:Morada";
      }
      if($this->avatar) {
        $res = $this->addComma($res);
        $res .= "Avatar=:Avatar";
      }
      return $res;
    }
    
    private function sanitize() {
      if ($this->email) {
        $this->email = htmlspecialchars(strip_tags($this->email));
      }
      if ($this->password) {
        $this->password = htmlspecialchars(strip_tags($this->password));
      }
      if ($this->username) {
        $this->username = htmlspecialchars(strip_tags($this->username));
      }
      if ($this->nome) {
        $this->nome = htmlspecialchars(strip_tags($this->nome));
      }
      if ($this->telefone) {
        $this->telefone = htmlspecialchars(strip_tags($this->telefone));
      }
      if ($this->telemovel) {
        $this->telemovel = htmlspecialchars(strip_tags($this->telemovel));
      }
      if ($this->morada) {
        $this->morada = htmlspecialchars(strip_tags($this->morada));
      }
      if ($this->avatar) {
        $this->avatar = htmlspecialchars(strip_tags($this->avatar));
      }
    }
    
    private function bindValues($stmt) {
      if ($this->email) {
        $stmt->bindParam(":Email", $this->email);
      }
      if ($this->password) {
        $stmt->bindParam(":Password", $this->password);
      }
      if ($this->username) {
       $stmt->bindParam(":Username", $this->username);
      }
      if ($this->nome) {
         $stmt->bindParam(":Nome", $this->nome);
      }
      if ($this->telefone) {
         $stmt->bindParam(":Telefone", $this->telefone);
      }
      if ($this->telemovel) {
        $stmt->bindParam(":Telemovel", $this->telemovel);
      }
      if ($this->morada) {
        $stmt->bindParam(":Morada", $this->morada);
      }
      if ($this->avatar) {
        $stmt->bindParam(":Avatar", $this->avatar);
      }
      return $stmt;
    }
}