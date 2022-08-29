<?php
namespace Abol\Router;

use Abol\Http\Request\Request;
use Exception;

class Router {
    static $routes=[];
    static $routeNames=[];

    protected $routeUri;
    protected $closure;

    public function __construct($routeUri, $closure){
        $this->routeUri = $routeUri;
        $this->closure = $closure;
    }

    static function purneUri($uri){
        return trim(trim($uri), '/');
    }

    static function addRoute($routeUri, $closure){
        $routeUri = self::purneUri($routeUri);
        if(is_array($closure)){
            $closure = fn(...$params)=>(new $closure[0])->{$closure[1]}(...$params);
        }
        self::$routes[$routeUri] = $closure;

        return new Router($routeUri, $closure);
    }

    static function getRouteOfName($name){
        return self::$routeNames[$name];
    }

    public function name($name){
        self::$routeNames[$name] = function($params=[]){
            $routeUri = $this->routeUri;
            $queries = [];
            foreach($params as $key => $value){
                // str_replace();
                $paramRaw = '{'.$key.'}';
                if( strpos($routeUri, $paramRaw) !== false ){
                    $routeUri = str_replace($paramRaw, $value, $routeUri);
                }else{
                    $queries[$key] = $value;
                }
            }
            $matches = [];
            if(($count = preg_match_all("/{(?<p>[^\/\?]*)}/", $routeUri, $matches))>0){
                $remainingParamsNames = "{".implode(', ',$matches[1])."}";
                // var_dump($remainingParamsNames, $matches, $this->routeUri);die();
                throw new Exception("Route Error: Not Enough Params!
                ############# ($count param(s) is not passed) : $remainingParamsNames #############
                ");
            }
            if(!empty($queries)){
                $routeUri .= '?'.http_build_query($queries);
            }
            return $routeUri;
        };
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
        // echo "$pattern"."\n</br>";
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