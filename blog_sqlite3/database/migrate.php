<?php
foreach(glob("./migrations/*.php") as $migration)
    require_once($migration);