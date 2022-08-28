<?php

echo "running seeding...\n";
foreach(glob(__DIR__."/seeders/*.php") as $migration){
    // echo $migration;
    require_once($migration);
}
echo "seeded.\n";