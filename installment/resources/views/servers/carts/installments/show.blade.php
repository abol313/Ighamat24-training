@extends('layouts.app')

@section('content')
    @if($cart ?? null)
        <h2><a href="{{route('servers.carts.show', [$server, $cart])}}">Cart</a> Installments</h2>
    @else
        <h2>Installments</h2>
    @endif

    <div class="box">
        <p><a href="{{route('servers.carts.show', [$server, $installment->cart])}}">Go To Cart</a></p>
        <p> price : {{$installment->price}}</p>
        @if($installment->paid_at)
            <p>pay status : paid</p>
        @else
            <p>pay status : un-paid</p>
        @endif

        @if($installment->server_accepted_at)
            <p>accept status : accepted</p>
        @else
            <p>accept status : not-accepted</p>
        @endif

        @if(!$installment->server_accepted_at)
            <form action="{{route('servers.installments.accept', [$server, $installment])}}" method="post">
                @csrf
                <input type="submit" value="Accept Paid Installment"/>
            </form>
        @endif

    </div>

    
@endsection