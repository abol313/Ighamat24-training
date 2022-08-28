<?php
namespace Abol\Router;

use Abol\Http\Request\Request;

class Router {
    static $routes=[];

    static function purneUri($uri){
        return trim(trim($uri), '/');
    }

    static function addRoute($routeUri, $closure){
        $routeUri = self::purneUri($routeUri);
        if(is_array($closure)){
            $closure = fn(...$params)=>(new $closure[0])->{$closure[1]}(...$params);
        }
        self::$routes[$routeUri] = $closure;
    }

    static function getContent($uri, $fallbackClosure=null){
        $uri = self::purneUri($uri);
        $request = new Request($uri, null, null);
        foreach(self::$routes as $routeUri => $closure){
            $params = self::extractInputs($uri, $routeUri);
            if( $params !== false ){
                $request->setParams($params);
                return $closure($request, ...$params);
            }
        }

        if($fallbackClosure===null){
            $fallbackClosure = fn()=>"404 | Not Found";
        }
        // $closure = self::$routes[$uri] ?? $fallbackClosure ?? fn()=>"404 | Not Found";
        return $fallbackClosure($request);
    }

    // print_r(extractInputs('/posts/123', '/posts/{id}/{a}'));
    private static function extractInputs($uri, $routeUri){
        $uri = self::purneUri($uri);
        $routeUri = self::purneUri($routeUri);
        $pattern = preg_replace("/{([\w]+)}/", "(?<$1>[^/?]*)", $routeUri);
        $pattern = str_replace('/', '\\/', $pattern);
        $pattern = "^$pattern$";
        $matches = null;
        $inputs = [];
        // echo "/$pattern/"."\n";
        if(preg_match_all("/".$pattern."/", $uri, $matches) === 0)
            return false;
        // print_r($matches);
        foreach($matches as $key => $value)
            if(is_string($key))
                $inputs[$key] = $value[0];
        // var_dump($inputs);
        return $inputs;
    }

    static function getUri(){
        return $_SERVER['PATH_INFO'];
    }
}