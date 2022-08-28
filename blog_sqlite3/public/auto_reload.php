<?php
foreach(glob("../app/models/*.php") as $path) require_once($path);
foreach(glob("../app/database/*.php") as $path) require_once($path);
