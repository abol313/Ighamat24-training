<?php
foreach(glob(__DIR__."/../libraries/*.php") as $path) require_once($path);
foreach(glob(__DIR__."/../app/models/*.php") as $path) require_once($path);
foreach(glob(__DIR__."/../app/database/*.php") as $path) require_once($path);
foreach(glob(__DIR__."/../routes/*.php") as $path) require_once($path);
