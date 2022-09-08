<?php

namespace App\Http\Controllers;

use \App\Models\Customer;
use \App\Models\Server;
use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    //
    public function register(){
        return view('customers.register');
    }
    public function signUp(Request $request){

        $customer = Customer::create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
        ]);

        Auth::guard('customers')->login($customer);
        return back();
    }

    
    public function login(){
        return view('customers.login');
    }
    public function signIn(Request $request){
        Auth::guard('customers')->attempt(
            $request->only([
                'username',
                'password',
            ])
        );

        return back();
    }


    public function logout(){
        Auth::guard('customers')->logout();
        return back();

    }
}
