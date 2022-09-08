@extends('layouts.app')

@section('content')
    <h2>Service</h2>

    <div class="box">
            <h2>{{$service->title}}</h2>
            <p>{{$service->description}}</p>
            <p>category : {{$service->category->name}}</p>
            <p>server : {{$service->server->username}}</p>
            <p>unit : {{$service->unit}}</p>
            <p>price_per_unit : {{$service->price_per_unit}}</p>

            <p>
                <a href="{{route('services.installment_conditions.index', [$service])}}">
                    Show installment conditions
                </a>
            </p>

            @if(auth('servers')->user()?->can('update',$service))
                <a href="{{route('services.edit', [$service])}}">edit service</a>
            @endif
            @if(auth('servers')->user()?->can('delete',$service))
                <form action="{{route('services.destroy', [$service])}}" method="POST">
                    @csrf
                    @method('delete')
                    <input type="submit" value="delete"/>
                </form>
            @endif
    </div>

@endsection