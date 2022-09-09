@extends('layouts.app')

@section('content')
    <h2><a href="{{route('customers.carts.show', [$customer, $cart])}}">Cart</a> Installments</h2>

    @foreach($installments as $installment)
        <div class="box">
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

            @if(!$installment->paid_at)
                <form action="{{route('carts.installments.pay', [$cart, $installment])}}" method="post">
                    @csrf
                    <input type="submit" value="Pay"/>
                </form>
            @endif
            {{-- <form action="{{route('carts.installments.unpay', [$cart, $installment])}}" method="post">
                @csrf
                <input type="submit" value="UnPay"/>
            </form> --}}
        </div>

    @endforeach
@endsection