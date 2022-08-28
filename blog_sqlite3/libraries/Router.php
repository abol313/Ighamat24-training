<?php
namespace Abol\Router;

class Router {
    public $routes=[];

    function purneUri($uri){
        return trim(trim($uri), '/');
    }

    function addRoute($uri, $closure){
        $uri = $this->purneUri($uri);
        $this->routes[$uri] = $closure;
    }

    function getContent($uri, $fallbackClosure=(fn()=>"404 |Not Found")){
        $uri = $this->purneUri($uri);
        $closure = $this->routes[$uri] ?? $fallbackClosure;
        return $closure();
    }

    function getUri(){
        return $_SERVER['REQUEST_URI'];
    }
}