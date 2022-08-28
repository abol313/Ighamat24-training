<?php
$viewsDir = __DIR__."../views";
function view($viewName){
    global $viewsDir;
    return require_once($viewsDir."/".str_replace('.', '/', $viewName).".abol.php");
}