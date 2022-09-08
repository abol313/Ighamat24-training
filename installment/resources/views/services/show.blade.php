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
    </div>

@endsection