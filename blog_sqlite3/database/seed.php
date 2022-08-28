<?php
require_once(__DIR__."/../public/auto_reload.php");

echo "running seeding...\n";
foreach(glob(__DIR__."/seeders/*.php") as $migration){
    // echo $migration;
    require_once($migration);
}
echo "seeded.\n";