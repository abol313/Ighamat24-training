<form action="{{route('customers.sign_up')}}" method="post">
    @csrf
    
    <input name="username" placeholder="user name"/>
    <input name="password" placeholder="password"/>

    <input type="submit" value="sign up" />
</form>