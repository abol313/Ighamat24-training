<?php
$viewsDir = __DIR__."/../views";
function view($viewName){
    global $viewsDir;
    return require_once($viewsDir."/".str_replace('.', '/', $viewName).".abol.php");
}


function strLimitLength(string $str,int $max,string $exceed="..."){
    $out = mb_substr($str, 0, $max);
    if(mb_strlen($str)>$max)
        $out = mb_substr($out, 0, -mb_strlen($exceed)) . $exceed;
    return $out;
}