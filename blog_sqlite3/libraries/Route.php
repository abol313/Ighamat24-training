<?php
namespace Abol\Router;

class Route {
    static $routes = [];

    static function purneUri($uri){
        return trim(trim($uri), '/');
    }

    static function addRoute($uri, $closure){
        $uri = self::purneUri($uri);
        self::$routes[$uri] = $closure;
    }

    static function getContent($uri, $fallbackClosure){
        $uri = self::purneUri($uri);
        $closure = self::$routes[$uri] ?? $fallbackClosure;
        return $closure();
    }
}