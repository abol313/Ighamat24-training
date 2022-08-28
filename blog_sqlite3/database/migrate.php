<?php
echo "running migration...\n";
foreach(glob(__DIR__."/migrations/*.php") as $migration){
    // echo $migration;
    require_once($migration);
}
echo "migrated.\n";