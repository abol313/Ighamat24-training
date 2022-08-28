<?php

namespace App\Models;

use SQLite3;

class Model extends SQLite3 {
    protected $keyName = 'id';
    protected $table = 'table_name';

    protected $db = "blog";

    function __construct(){
        $this->open(__DIR__."/../../database/$this->db.db");
    }

    function all($columns = ['*']){
        $wildcards = implode(' ',array_map(fn($column)=>' ? ', $columns));
        $statement = $this->prepare("SELECT $wildcards FROM :table_name");
        $statement->bindValue(':table_name', $this->table);
        for($i = 0; $i < count($columns); $i++)
            $statement->bindValue($i, $columns[$i]);
        return $statement->execute();
    }

    function create($record){
        $wildcards = implode(', ',array_map(fn($field)=>":$field", array_keys($record)));
        $statement = $this->prepare("INSERT INTO :table_name VALUES ($wildcards)");
        $statement->bindValue(':table_name', $this->table);
        foreach($record as $field => $value)
            $statement->bindValue($field, $value);
        return $statement->execute();
    }

    function update($key, $record){
        $wildcards = implode(', ',array_map(fn($field)=>"$field = :$field", array_keys($record)));
        $statement = $this->prepare("UPDATE :table_name SET $wildcards WHERE :pk_name = :pk");
        $statement->bindValue(':table_name', $this->table);
        $statement->bindValue(':pk_name', $this->keyName);
        $statement->bindValue(':pk', $key);
        foreach($record as $field => $value)
            $statement->bindValue(":$field", $value);
        return $statement->execute();
    }

    function delete($key){
        $statement = $this->prepare("DELETE FROM :table_name WHERE :pk_name = :pk");
        $statement->bindValue(':table_name', $this->table);
        $statement->bindValue(':pk_name', $this->keyName);
        $statement->bindValue(':pk', $key);
        return $statement->execute();
    }
}