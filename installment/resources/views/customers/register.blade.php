@extends('layouts.app')

@section('content')
    <p>customer register</p>
    <form action="{{route('customers.sign_up')}}" method="post">
        @csrf
        
        <input name="username" placeholder="user name"/>
        <input name="password" placeholder="password"/>

        <input type="submit" value="register" />
    </form>
@endsection
