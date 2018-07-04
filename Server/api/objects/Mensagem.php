<?php

class Mensagem {

    private $conn;
    private $table_name1;
    private $table_name2;
    private $table_name3;
    private $table_name4;
    private $table_name5;

    public $id;
    public $emissor;
    public $recetor;
    public $dataTempo;
    public $mensagem;
    public $idOrganizacao;

    public function __construct($db) {
        $this->conn = $db;
        $this->table_name1 = "mensagemClienteEmpresa";
        $this->table_name2 = "mensagemEmpresaEmpresa";
        $this->table_name3 = "mensagemEmpresaCliente";
        $this->table_name4 = "mensagemCliente";
        $this->table_name5 = "mensagemEmpresa";
    }

    function readMessagesClientToEnterprise($filter1, $value1, $filter2, $value2, $emissor, $recetor) {
        $query = "SELECT * FROM $this->table_name1 WHERE Emissor = ? AND Recetor = ?";
        if ($filter1 != NULL && $value1 != NULL) {
            $query .= " AND $filter1 = ?";
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " AND $filter2 = ?";
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " WHERE $filter2 = ?";
            }
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $emissor);
        $stmt->bindParam(2, $recetor);
        if ($filter1 != NULL && $value1 != NULL) { 
            $stmt->bindParam(3, $value1);
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(4, $value2);
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(3, $value2);
            }
        }
        $stmt->execute();
        return $stmt;
    }

    function readMessagesEnterpriseToEnterprise($filter1, $value1, $filter2, $value2, $emissor, $recetor) {
        $query = "SELECT * FROM $this->table_name2 WHERE Emissor = ? AND Recetor = ?";
        if ($filter1 != NULL && $value1 != NULL) {
            $query .= " AND $filter1 = ?";
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " AND $filter2 = ?";
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " WHERE $filter2 = ?";
            }
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $emissor);
        $stmt->bindParam(2, $recetor);
        if ($filter1 != NULL && $value1 != NULL) { 
            $stmt->bindParam(3, $value1);
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(4, $value2);
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(3, $value2);
            }
        }
        $stmt->execute();
        return $stmt;
    }

    function readMessagesEnterpriseToClient($filter1, $value1, $filter2, $value2, $emissor, $recetor) {
        $query = "SELECT * FROM $this->table_name3 WHERE Emissor = ? AND Recetor = ?";
        if ($filter1 != NULL && $value1 != NULL) {
            $query .= " AND $filter1 = ?";
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " AND $filter2 = ?";
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $query .= " WHERE $filter2 = ?";
            }
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $emissor);
        $stmt->bindParam(2, $recetor);
        if ($filter1 != NULL && $value1 != NULL) { 
            $stmt->bindParam(3, $value1);
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(4, $value2);
            }
        } else {
            if ($filter2 != NULL && $value2 != NULL) {
                $stmt->bindParam(3, $value2);
            }
        }
        $stmt->execute();
        return $stmt;
    }

    function readPublicClientMessages($filter1, $value1, $filter2, $value2) {
        $query = "SELECT * FROM $this->table_name4";
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

    function readPublicEnterpriseMessages($filter1, $value1, $filter2, $value2) {
        $query = "SELECT * FROM $this->table_name5";
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

    function insertMessageClientToEnterprise() {
        $query = "INSERT INTO $this->table_name1 SET " . $this->buildQueryAttributes();
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $stmt = $this->bindValues($stmt);
        $stmt->execute();
        return $stmt;
    }

    function insertMessageEnterpriseToEnterprise() {
        $query = "INSERT INTO $this->table_name2 SET " . $this->buildQueryAttributes();
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $stmt = $this->bindValues($stmt);
        $stmt->execute();
        return $stmt;
    }

    function insertMessageEnterpriseToClient() {
        $query = "INSERT INTO $this->table_name3 SET " . $this->buildQueryAttributes();
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $stmt = $this->bindValues($stmt);
        $stmt->execute();
        return $stmt;
    }
    
    function insertMessageClient() {
        $query = "INSERT INTO $this->table_name4 SET " . $this->buildQueryAttributes();
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $stmt = $this->bindValues($stmt);
        $stmt->execute();
        return $stmt;
    }

    function insertMessageEnterprise() {
        $query = "INSERT INTO $this->table_name5 SET " . $this->buildQueryAttributes();
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $stmt = $this->bindValues($stmt);
        $stmt->execute();
        return $stmt;
    }

    function addComma($res) {
        if (strlen($res) > 0) {
            $res .= ", ";
        }
        return $res;
    }

    function updateMessageClientToEnterprise($idOrganizacao, $emissor, $recetor) {
        $query = "UPDATE $this->table_name1 SET " . $this->buildQueryAttributes() . " WHERE IdOrganizacao=:IdOrganizacao AND Emissor=:Emissor AND Recetor=:Recetor";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $idOrganizacao = htmlspecialchars(strip_tags($idOrganizacao));
        $emissor = htmlspecialchars(strip_tags($emissor));
        $recetor = htmlspecialchars(strip_tags($recetor));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":IdOrganizacao", $idOrganizacao);
        $stmt->bindParam(":Emissor", $emissor);
        $stmt->bindParam(":Recetor", $recetor);
        $stmt->execute();
        return $stmt;
    }

    function updateMessageEnterpriseToEnterprise($idOrganizacao, $emissor, $recetor) {
        $query = "UPDATE $this->table_name2 SET " . $this->buildQueryAttributes() . " WHERE IdOrganizacao=:IdOrganizacao AND Emissor=:Emissor AND Recetor=:Recetor";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $idOrganizacao = htmlspecialchars(strip_tags($idOrganizacao));
        $emissor = htmlspecialchars(strip_tags($emissor));
        $recetor = htmlspecialchars(strip_tags($recetor));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":IdOrganizacao", $idOrganizacao);
        $stmt->bindParam(":Emissor", $emissor);
        $stmt->bindParam(":Recetor", $recetor);
        $stmt->execute();
        return $stmt;
    }
    
    function updateMessageEnterpriseToClient($idOrganizacao, $emissor, $recetor) {
        $query = "UPDATE $this->table_name3 SET " . $this->buildQueryAttributes() . " WHERE IdOrganizacao=:IdOrganizacao AND Emissor=:Emissor AND Recetor=:Recetor";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $idOrganizacao = htmlspecialchars(strip_tags($idOrganizacao));
        $emissor = htmlspecialchars(strip_tags($emissor));
        $recetor = htmlspecialchars(strip_tags($recetor));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":IdOrganizacao", $idOrganizacao);
        $stmt->bindParam(":Emissor", $emissor);
        $stmt->bindParam(":Recetor", $recetor);
        $stmt->execute();
        return $stmt;
    }
    
    function updateMessageClient($idOrganizacao, $emissor) {
        $query = "UPDATE $this->table_name4 SET " . $this->buildQueryAttributes() . " WHERE IdOrganizacao=:IdOrganizacao AND Emissor=:Emissor";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $idOrganizacao = htmlspecialchars(strip_tags($idOrganizacao));
        $emissor = htmlspecialchars(strip_tags($emissor));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":IdOrganizacao", $idOrganizacao);
        $stmt->bindParam(":Emissor", $emissor);
        $stmt->execute();
        return $stmt;
    }
    
    function updateMessageEnterprise($idOrganizacao, $emissor) {
        $query = "UPDATE $this->table_name5 SET " . $this->buildQueryAttributes() . " WHERE IdOrganizacao=:IdOrganizacao AND Emissor=:Emissor";
        $stmt = $this->conn->prepare($query);
        $this->sanitize();
        $idOrganizacao = htmlspecialchars(strip_tags($idOrganizacao));
        $emissor = htmlspecialchars(strip_tags($emissor));
        $stmt = $this->bindValues($stmt);
        $stmt->bindParam(":IdOrganizacao", $idOrganizacao);
        $stmt->bindParam(":Emissor", $emissor);
        $stmt->execute();
        return $stmt;
    }

    private function buildQueryAttributes() {
        $res = "";
        if ($this->id) {
            $res .= "Id=:Id";
        }
        if ($this->emissor) {
            $res = $this->addComma($res);
            $res .= "Emissor=:Emissor";
        }
        if ($this->recetor) {
            $res = $this->addComma($res);
            $res .= "Recetor=:Recetor";
        }
        if ($this->dataTempo) {
            $res = $this->addComma($res);
            $res .= "DataTempo=:DataTempo";
        }
        if ($this->mensagem) {
            $res = $this->addComma($res);
            $res .= "Mensagem=:Mensagem";
        }
        if ($this->idOrganizacao) {
            $res = $this->addComma($res);
            $res .= "IdOrganizacao=:IdOrganizacao";
        }
        return $res;
    }

    private function sanitize() {
        if ($this->id) {
            $this->id = htmlspecialchars(strip_tags($this->id));
        }
        if ($this->emissor) {
            $this->emissor = htmlspecialchars(strip_tags($this->emissor));
        }
        if ($this->recetor) {
            $this->recetor = htmlspecialchars(strip_tags($this->recetor));
        }
        if ($this->dataTempo) {
            $this->dataTempo = htmlspecialchars(strip_tags($this->dataTempo));
        }
        if ($this->mensagem) {
            $this->mensagem = htmlspecialchars(strip_tags($this->mensagem));
        }
        if ($this->idOrganizacao) {
            $this->idOrganizacao = htmlspecialchars(strip_tags($this->idOrganizacao));
        }
    }

    private function bindValues($stmt) {
        if ($this->id) {
            $stmt->bindParam(":Id", $this->id);
        }
        if ($this->emissor) {
            $stmt->bindParam(":Emissor", $this->emissor);
        }
        if ($this->recetor) {
            $stmt->bindParam(":Recetor", $this->recetor);
        }
        if ($this->dataTempo) {
            $stmt->bindParam(":DataTempo", $this->dataTempo);
        }
        if ($this->mensagem) {
            $stmt->bindParam(":Mensagem", $this->mensagem);
        }
        if ($this->idOrganizacao) {
            $stmt->bindParam(":IdOrganizacao", $this->idOrganizacao);
        }
        return $stmt;
    }

}
