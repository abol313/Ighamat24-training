<?php
$sqlite = new SQLite3("../blog.db");
$sqlite->exec("

CREATE TABLE posts (
    id integer primary key,
    title text,
    description text
)

");