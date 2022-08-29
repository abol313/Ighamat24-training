<?php

use Abol\Router\Router;
use App\Http\Controllers\PostController;


Router::addRoute('/posts',[PostController::class,'index'])->name('posts.index');
Router::addRoute('/owner/posts',[PostController::class,'adminIndex'])->name('admin.posts.index');

Router::addRoute('/owner/posts/create',[PostController::class,'create'])->name('admin.posts.create');
Router::addRoute('/owner/posts/store',[PostController::class,'store'])->name('admin.posts.store');

Router::addRoute('/owner/posts/edit/{id}',[PostController::class,'edit'])->name('admin.posts.edit');
Router::addRoute('/owner/posts/update',[PostController::class,'update'])->name('admin.posts.update');

Router::addRoute('/owner/posts/destroy/{id}',[PostController::class,'destroy'])->name('admin.posts.destroy');


Router::addRoute('/posts/{id}',[PostController::class,'show'])->name('posts.show');
Router::addRoute('/owner/posts/{id}',[PostController::class,'adminShow'])->name('admin.posts.show');

