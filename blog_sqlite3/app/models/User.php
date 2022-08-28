<?php
namespace App\Models;

use SQLite3;

class User extends SQLite3 {
    public $keyName = 'id';
    protected $table = 'users';

    function __construct(){
        $this->open("../database/blog.db");
    }

    function all($columns = ['*']){
        $wildcards = implode(' ',array_map(fn($column)=>'?', $columns));
        $statement = $this->prepare("SELECT $wildcards FROM $this->table");
        for($i = 0; $i < count($columns); $i++)
            $statement->bindValue($i, $columns[$i]);
        return $statement->execute();
    }

    function create($record){
        
    }
}