@extends('layouts.app')

@section('content')
    <h2 class="box">
        <a href="{{route('services.show', [$service])}}">
            Service : {{$service->title}}
        </a>
        <p>unit : {{$service->unit}}</p>
        <p>price per unit : {{$service->price_per_unit}}</p>
    </h2>
    <p>Cart Edit</p>

    <form action="{{route('customers.carts.update', [$customer, $cart])}}" method="post">
        @csrf
        @method('put')
        
        <input name="amount" placeholder="amount" type="integer" value="{{$cart->amount}}" required/>
        <select name="installment_condition_id" required>
            <option disabled>Choose one installment plan</option>
            @foreach($service->installmentConditions as $installmentCondition)
                <option value="{{$installmentCondition->id}}" @selected($cart->installmentCondition->id === $installmentCondition->id)>max:{{$installmentCondition->maximum}}, count:{{$installmentCondition->installments_count}}</option>
            @endforeach
        </select>

        <input type="submit" value="edit cart" />
    </form>
@endsection
