<?php
require_once("./auto_reload.php");

use Abol\Router\Router;

echo Router::getContent(Router::getUri());