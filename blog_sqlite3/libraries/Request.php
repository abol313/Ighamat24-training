<?php
namespace Abol\Http\Request;

class Request {
    protected string $uri;
    protected array $inputs;
    protected array $params;

    public function __construct($uri = null, $inputs = null, $params = null){
        $this->uri = $uri ?? $_SERVER['REQUEST_URI'];
        $this->inputs = $inputs ?? $_REQUEST;
        $this->params = $params ?? [];
    }

    public function setParams($params){
        $this->params = $params;
    }

    public function input($name, $default=null){
        return $this->inputs[$name] ?? $default;
    }

    public function param($name, $default=null){
        return $this->params[$name] ?? $default;
    }
}