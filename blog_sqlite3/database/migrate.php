<?php
//! If there is no .db (database) file you can run it file as php,
// then the database file will automatically create

echo "running migration...\n";
foreach(glob(__DIR__."/migrations/*.php") as $migration){
    // echo $migration;
    require_once($migration);
}
echo "migrated.\n";