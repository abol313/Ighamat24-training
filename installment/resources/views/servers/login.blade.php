@extends('layouts.app')

@section('content')
    <p>server login</p>

    <form action="{{route('servers.sign_in')}}" method="post">
        @csrf
        
        <input name="username" placeholder="user name"/>
        <input name="password" placeholder="password"/>

        <input type="submit" value="login" />
    </form>
@endsection
