@extends('layouts.app')

@section('content')
    <h2>
        <a href="{{route('services.show', [$service])}}">
            Service : {{$service->title}}
        </a>
    </h2>
    <p>Service Installment Condition Create</p>

    <form action="{{route('services.installment_conditions.store', [$service])}}" method="post">
        @csrf
        
        <input name="maximum" placeholder="specify the maximum price that accepted to this installment way" required/>
        <input name="installments_count" placeholder="the number of installments should be paid steply" required/>

        <input type="submit" value="create installment condition" />
    </form>
@endsection
