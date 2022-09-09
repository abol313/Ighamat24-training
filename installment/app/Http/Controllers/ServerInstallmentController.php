<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Installment;
use App\Models\Server;
use Illuminate\Http\Request;

class ServerInstallmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Server  $server
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Server $server)
    {
        //
        if(! $authServer = auth('servers')->user())
            abort(403);
        if($authServer->id !== $server->id)
            abort(403);


        if($request->has('cart_id')){
            $cart = Cart::find($request->input('cart_id'));
            return view('servers.carts.installments.index', [
                'installments' => $cart->installments,
                'server' => $server,
                'cart' => $cart
            ]);
        }
        return view('servers.carts.installments.index', [
            'installments' => $server->installments(),
            'server' => $server,
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Server  $server
     * @param  \App\Models\Installment  $installment
     * @return \Illuminate\Http\Response
     */
    public function show(Server $server, Installment $installment)
    {
        //
        if(! $authServer = auth('servers')->user())
            abort(403);
        if($authServer->id !== $server->id)
            abort(403);
        if(! $server->services->contains('id', $installment->cart->service->id))
            abort(403);

        return view('servers.carts.installments.show', [
            'installment' => $installment,
            'server' => $server,
        ]);
    }

    public function accept(Server $server, Installment $installment){
        if(! $authServer = auth('servers')->user())
            abort(403);
        if($authServer->id !== $server->id)
            abort(403);

        if(!$installment->paid_at)
            abort(400, 'the installment un-paid');
        if($installment->server_accepted_at)
            abort(400, 'the installment accepted');

        $installment->server_accepted_at = date('Y-m-d H:i:s');

        $installment->save();
        return back();
        
    }
}
