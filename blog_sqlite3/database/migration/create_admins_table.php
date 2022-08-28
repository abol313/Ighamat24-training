<?php
$sqlite = new SQLite3("../blog.db");
$sqlite->exec("

CREATE TABLE admins (
    id integer primary key,
    username text,
    password text
)

");