@extends('layouts.app')

@section('content')
    <h2>Services</h2>

    @forelse($services as $service)
        <div class="box">
            <h2>
                <a href="{{route('services.show', [$service])}}">
                    {{$service->title}}
                </a>
            </h2>
            <p>{{$service->description}}</p>
            <p>category : {{$service->category->name}}</p>
            <p>server : {{$service->server->username}}</p>

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
    @empty
        <h2>No Service !</h2>
    @endforelse

@endsection