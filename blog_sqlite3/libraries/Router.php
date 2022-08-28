<?php
namespace Abol\Router;

class Router {
    static $routes=[];

    static function purneUri($uri){
        return trim(trim($uri), '/');
    }

    static function addRoute($uri, $closure){
        $uri = self::purneUri($uri);
        self::$routes[$uri] = $closure;
    }

    static function getContent($uri, $fallbackClosure=null){
        $uri = self::purneUri($uri);
        $closure = self::$routes[$uri] ?? $fallbackClosure ?? fn()=>"404 | Not Found";
        return $closure();
    }

    static function getUri(){
        return $_SERVER['REQUEST_URI'];
    }
}