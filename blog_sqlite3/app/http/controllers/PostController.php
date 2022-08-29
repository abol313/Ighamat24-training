<?php
namespace App\Http\Controllers;

use App\Models\Post;

class PostController {
    public function index(){
        view('posts.index');
    }

    public function adminIndex(){
        view('admin.posts.index');
    }

    public function show($request, $id){
        $post = (new Post())->find($id);
        view('posts.show', ['post'=>$post]);
    }

    public function adminShow($request, $id){
        $post = (new Post())->find($id);
        view('admin.posts.show', ['post'=>$post]);
    }

    public function create(){
        view('admin.posts.create');
    }

    public function store($request){
        $post = new Post();
        $post->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        var_dump($_SERVER);
    }

    public function edit($request, $id){
        $post = (new Post())->find($id);
        view('admin.posts.edit', ['post'=>$post]);
    }

    public function update($request){
        $post = new Post();
        $post->update($request->input('id'),[
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        var_dump($_SERVER);
    }

}