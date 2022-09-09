@extends('layouts.app')

@section('content')
    <h2>Customer Carts</h2>

    <div class="box">
        <p> installments count : {{$cart->installments_no}}, <a href="{{route('services.installment_conditions.show', [$cart->service, $cart->installmentCondition])}}">Installment condition</a></p>
        <p><a href="{{route('services.show', [$cart->service])}}"> service : {{$cart->service->title}}</a></p>
        <p> amount : {{$cart->amount.$cart->service->unit}}</p>
        <p> price : {{$cart->price}}</p>
        <p> status : {{$cart->status}}</p>
        <p>
            <a href="{{route('carts.installments.index', [$cart])}}">installments</a>
        </p>
        <p><a href="{{route('customers.carts.edit', [$customer, $cart])}}">Edit </a></p>
        <form action="{{route('customers.carts.destroy', [$customer, $cart])}}" method="post">
            @csrf
            @method('delete')
            <input type="submit" value="delete"/>
        </form>
    </div>

@endsection