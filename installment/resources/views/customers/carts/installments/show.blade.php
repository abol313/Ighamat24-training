@extends('layouts.app')

@section('content')
    <h2><a href="{{route('customers.carts.show', [$customer, $cart])}}">Cart</a> Installments</h2>

    <div class="box">
        <p> price : {{$installment->price}}</p>
        @if($installment->paid_at)
            <p>pay status : paid</p>
        @else
            <p>pay status : un-paid</p>
        @endif

        @if($installment->paid_at)
            <p>accept status : accepted</p>
        @else
            <p>accept status : not-accepted</p>
        @endif
    </div>

@endsection