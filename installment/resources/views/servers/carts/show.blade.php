@extends('layouts.app')

@section('content')
    <h2>Customer Carts</h2>

    <div class="box">
        <p> installments count : {{$cart->installments_no}}, <a href="{{route('services.installment_conditions.show', [$cart->service, $cart->installmentCondition])}}">Installment condition</a></p>
        <p><a href="{{route('services.show', [$cart->service])}}"> service : {{$cart->service->title}}</a></p>
        <p> amount : {{$cart->amount.$cart->service->unit}}</p>
        <p> price : {{$cart->price}}</p>
        <p> status : {{$cart->status}}</p>
        <p> customer : {{$cart->customer->username}}</p>


        
        <form action="{{route('servers.carts.accept', [$server, $cart])}}" method="POST">
            @csrf
            <input type="submit" value="accept"/>
        </form>

        <form action="{{route('servers.carts.reject', [$server, $cart])}}" method="POST">
            @csrf
            <input type="submit" value="reject"/>
        </form>
    </div>

@endsection