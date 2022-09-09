<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Installment;
use Illuminate\Http\Request;

class CartInstallmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function index(Cart $cart)
    {
        //
        if(! $customer = auth('customers')->user())
            abort(403);
        if($customer->id !== $cart->customer_id)
            abort(403);


        return view('customers.carts.installments.index', [
            'customer' => $customer,
            'cart' => $cart,
            'installments' => $cart->installments,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @param  \App\Models\Installment  $installment
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart, Installment $installment)
    {
        //
                //
        if(! $customer = auth('customers')->user())
            abort(403);
        if($customer->id !== $cart->customer_id)
            abort(403);

        return view('customers.carts.installments.show', [
            'customer' => $customer,
            'cart' => $cart,
            'installment' => $installment,
        ]);

    }

    public function pay(Cart $cart, Installment $installment)
    {
        //
                //
        if(! $customer = auth('customers')->user())
            abort(403);
        if($customer->id !== $cart->customer_id)
            abort(403);

        if($installment->paid_at)
            abort(400, 'the installment paid');
        if($installment->server_accepted_at)
            abort(400, 'the installment accepted');

        $installment->paid_at = date('Y-m-d H:i:s');
        
        $installment->save();

        return back();
    }

    public function unpay(Cart $cart, Installment $installment)
    {
        //
                //
        if(! $customer = auth('customers')->user())
            abort(403);
        if($customer->id !== $cart->customer_id)
            abort(403);
        
        if(!$installment->paid_at)
            abort(400, 'the installment un-paid');
        if($installment->server_accepted_at)
            abort(400, 'the installment accepted');


        $installment->paid_at = null;

        $installment->save();

        return back();

    }


}
