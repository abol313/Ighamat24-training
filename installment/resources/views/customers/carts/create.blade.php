@extends('layouts.app')

@section('content')
    <h2 class="box">
        <a href="{{route('services.show', [$service])}}">
            Service : {{$service->title}}
        </a>
        <p>unit : {{$service->unit}}</p>
        <p>price per unit : {{$service->price_per_unit}}</p>
    </h2>
    <p>Cart Create</p>

    <form action="{{route('customers.carts.store', [$customer])}}" method="post">
        @csrf
        
        <input name="amount" placeholder="amount" type="integer" required/>
        <input name="customer_id" type="hidden" value="{{$customer->id}}" required/>
        <select name="installment_condition_id" required>
            <option disabled selected>Choose one installment plan</option>
            @foreach($service->installmentConditions as $installmentCondition)
                <option value="{{$installmentCondition->id}}">max:{{$installmentCondition->maximum}}, count:{{$installmentCondition->installments_count}}</option>
            @endforeach
        </select>
        <input type="hidden" name="service_id" value="{{$service->id}}"/>

        <input type="submit" value="create cart" />
    </form>
@endsection
