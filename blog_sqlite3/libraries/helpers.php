<?php

use Abol\Router\Router;

$viewsDir = __DIR__."/../views";
function view($viewName, $data=[]){
    global $viewsDir;

    foreach($data as $key => $value)
        $$key = $value;
    
    return require_once($viewsDir."/".str_replace('.', '/', $viewName).".abol.php");
}


function strLimitLength(string $str,int $max,string $exceed="..."){
    $out = mb_substr($str, 0, $max);
    if(mb_strlen($str)>$max)
        $out = mb_substr($out, 0, -mb_strlen($exceed)) . $exceed;
    return $out;
}

function redirectTo($uri, $query=null){
    $uri = trim($uri, '/');
    $queryRaw = $query ? "?".http_build_query($query) : null;
    $host = $_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'];
    $location = $uri.$queryRaw;
    header("Location: $location");
    die();
}

function route($name, $params=[]){
    $closure = Router::getRouteOfName($name);
    
    $uri = '/'.$closure($params);
    return $uri;
}