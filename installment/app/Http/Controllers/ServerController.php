<?php

namespace App\Http\Controllers;

use \App\Models\Server;
use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ServerController extends Controller
{
    //
    public function register(){
        return view('servers.register');
    }
    public function signUp(Request $request){

        $server = Server::create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
        ]);

        Auth::guard('servers')->login($server);
        return back();
    }

    
    public function login(){
        return view('servers.login');
    }
    public function signIn(Request $request){
        Auth::guard('servers')->attempt(
            $request->only([
                'username',
                'password',
            ])
        );

        return back();
    }

    
}
