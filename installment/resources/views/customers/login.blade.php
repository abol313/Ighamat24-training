@extends('layouts.app')

@section('content')
    <p>customer login</p>
    <form action="{{route('customers.sign_in')}}" method="post">
        @csrf
        
        <input name="username" placeholder="user name"/>
        <input name="password" placeholder="password"/>

        <input type="submit" value="login" />
    </form>
@endsection
