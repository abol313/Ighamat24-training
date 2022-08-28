<?php
echo "creating posts table...\n";

$sqlite = new SQLite3(__DIR__."/../blog.db");
$sqlite->exec("

CREATE TABLE posts (
    id integer primary key,
    title text,
    description text
)

");

echo "created.\n";
