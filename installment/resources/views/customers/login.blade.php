<form action="{{route('customers.sign_in')}}" method="post">
    @csrf
    
    <input name="username" placeholder="user name"/>
    <input name="password" placeholder="password"/>

    <input type="submit" value="login" />
</form>