<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Server;
use Illuminate\Http\Request;

class ServerCartController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Server  $server
     * @return \Illuminate\Http\Response
     */
    public function index(Server $server)
    {
        if(auth('servers')->id() !== $server->id)
            abort(403);

        //
        return view('servers.carts.index', [
            'server' => $server,
            'carts' => Cart::where('status', 'pending')->whereIn('service_id', $server->services->pluck('id'))->get(),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Server  $server
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Server $server, Cart $cart)
    {
        //
        if(auth('servers')->id() !== $server->id)
            abort(403);
        

        if(! $server->services->contains('id', $cart->service_id))
            abort(403);
        if($cart->status !== 'pending')
            abort(403);

        return view('servers.carts.show', [
            'server' => $server,
            'cart' => $cart,
        ]);
    }


    public function accept(Server $server, Cart $cart){
        if(auth('servers')->id() !== $server->id)
            abort(403);
        

        if(! $server->services->contains('id', $cart->service_id))
            abort(403);
        if($cart->status !== 'pending')
            abort(403);

        $cart->status = "accepted";
        $cart->save();

        return back();
    }

    public function reject(Server $server, Cart $cart){
        if(auth('servers')->id() !== $server->id)
            abort(403);
        

        if(! $server->services->contains('id', $cart->service_id))
            abort(403);
        if($cart->status !== 'pending')
            abort(403);
        
        $cart->status = "rejected";
        $cart->save();

        return back();

    }
}
