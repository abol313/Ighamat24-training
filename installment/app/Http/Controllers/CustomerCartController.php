<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Customer;
use App\Models\Installment;
use App\Models\InstallmentCondition;
use App\Models\Service;
use Illuminate\Http\Request;

class CustomerCartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function index(Customer $customer)
    {
        if(auth('customers')->guest())
            abort(403);
        
        return view('customers.carts.index', ['carts'=>$customer->carts, 'customer'=>$customer]);
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, Customer $customer)
    {
        //
        if(auth('customers')->guest())
            abort(403);

        if(! $service = Service::find($request->input('service_id')))
            abort(403);

        return view('customers.carts.create', [
            'customer' => $customer,
            'service' => $service,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Customer $customer)
    {
        if(auth('customers')->guest())
            abort(403);
        
        if(! $service = Service::find($request->input('service_id')))
            abort(403);
        
        if(! $installmentCondition = $service->installmentConditions->firstWhere('id', $request->input('installment_condition_id')))
            abort(403);

        $price = $request->input('amount') * $service->price_per_unit;

        if($price > $installmentCondition->maximum)
            abort(400, 'The price is more than maximum of the installment plan');

        

        Cart::create([
            'amount' => $request->input('amount'),
            'installments_no' => $installmentCondition->installments_count,
            'price' => $price,
            'status' => 'pending',
            'service_id' => $service->id,
            'customer_id' => $request->input('customer_id'),
            'installment_condition_id' => $installmentCondition->id,
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer, Cart $cart)
    {
        //
        if(auth('customers')->guest())
            abort(403);

        return view('customers.carts.show', ['cart'=>$cart, 'customer'=>$customer]);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer, Cart $cart)
    {
        if(auth('customers')->guest())
            abort(403);
        //

        return view('customers.carts.edit', [
            'customer' => $customer,
            'service' => $cart->service,
            'cart' => $cart,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer, Cart $cart)
    {
        if(auth('customers')->guest())
            abort(403);
        
        if($cart->status !== 'pending')
            abort(403, 'The cart can just edit in pending mode');
        
        $service = $cart->service;

        if(! $installmentCondition = $service->installmentConditions->firstWhere('id', $request->input('installment_condition_id')))
            abort(403);

        $price = $request->input('amount') * $cart->service->price_per_unit;

        if($price > $installmentCondition->maximum)
            abort(400, 'The price is more than maximum of the installment plan');

        $cart->fill([
            'amount' => $request->input('amount'),
            'installments_no' => $installmentCondition->installments_count,
            'price' => $price,
        ]);

        $cart->save();


        return back();
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer, Cart $cart)
    {
        if(auth('customers')->guest())
            abort(403);
        
        if($cart->status === 'accepted')
            abort(400, 'the cart accepted of server, you can not destroy!');

        $cart->delete();

        return back();
        //
    }
}
