<?php

use Abol\Router\Router;

Router::addRoute('/home',function(){
    view('home');
});