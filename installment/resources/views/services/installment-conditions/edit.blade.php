@extends('layouts.app')

@section('content')
    <h2>
        <a href="{{route('services.show', [$service])}}">
            Service : {{$service->title}}
        </a>
    </h2>
    <p>Service Installment Condition Edit</p>

    <form action="{{route('services.installment_conditions.update', [$service, $installmentCondition])}}" method="post">
        @csrf
        @method('put')
        
        <input name="maximum" type="number" placeholder="specify the maximum price that accepted to this installment way" value="{{$installmentCondition->maximum}}" required/>
        <input name="installments_count" type="number" placeholder="the number of installments should be paid steply" value="{{$installmentCondition->installments_count}}" required/>

        <input type="submit" value="edit installment condition" />
    </form>
@endsection
