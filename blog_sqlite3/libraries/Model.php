<?php

namespace Abol\Database;

use \PDO;

class Model extends PDO {
    protected $keyName = 'id';
    protected $table = 'table_name';

    protected $db = "blog";

    function __construct(){
        parent::__construct("sqlite:".__DIR__."/../database/$this->db.db");
    }

    function all($columns = ['*'], $mode=PDO::FETCH_BOTH){
        $columnsQuery = implode(',',$columns);
        return $this->query("SELECT $columnsQuery FROM $this->table")->fetchAll($mode);
    }

    function create($record){
        $valuesWildcards = implode(', ',array_map(fn($field)=>":$field", array_keys($record)));
        $columns = implode(', ',array_keys($record));
        $statement = $this->prepare("INSERT INTO $this->table ($columns) VALUES ($valuesWildcards)");
        foreach($record as $field => $value)
            $statement->bindValue($field, $value);
        return $statement->execute();
    }

    function update($key, $record){
        $wildcards = implode(', ',array_map(fn($field)=>"$field = :$field", array_keys($record)));
        $statement = $this->prepare("UPDATE $this->table SET $wildcards WHERE :pk_name = :pk");
        $statement->bindValue(':pk_name', $this->keyName);
        $statement->bindValue(':pk', $key);
        foreach($record as $field => $value)
            $statement->bindValue(":$field", $value);
        return $statement->execute();
    }

    function delete($key){
        $statement = $this->prepare("DELETE FROM $this->table WHERE :pk_name = :pk");
        $statement->bindValue(':pk_name', $this->keyName);
        $statement->bindValue(':pk', $key);
        return $statement->execute();
    }
}