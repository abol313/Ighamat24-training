@extends('layouts.app')

@section('content')
    <p>server register</p>

    <form action="{{route('servers.sign_up')}}" method="post">
        @csrf
        
        <input name="username" placeholder="user name"/>
        <input name="password" placeholder="password"/>

        <input type="submit" value="register" />
    </form>
@endsection
