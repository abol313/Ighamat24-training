<?php

echo "creating admins table...\n";

$sqlite = new SQLite3(__DIR__."/../blog.db");
$sqlite->exec("

CREATE TABLE admins (
    id integer primary key,
    username text,
    password text
)

");
echo "created.\n";