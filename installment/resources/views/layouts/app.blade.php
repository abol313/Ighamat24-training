<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Installment</title>
</head>
<body>
    <style>
        .box{
            padding: 10px;
            border: 1px solid black;
        }
    </style>
    <header>
        @auth('customers')
            <h2>Hey [{{auth('customers')->user()->username}}], you are a Customer, <a href="{{route('customers.logout')}}">logout customer</a></h2>
        @else
            <div>
                <a href="{{route('customers.login')}}">Login Customer</a>
                <a href="{{route('customers.register')}}">Signup Customer</a>
            </div>
        @endauth

        @auth('servers')
            <h2>Hey [{{auth('servers')->user()->username}}], you are a Server, <a href="{{route('servers.logout')}}">logout server</a></h2>
        @else
            <div>
                <a href="{{route('servers.login')}}">Login Server</a>
                <a href="{{route('servers.register')}}">Signup Server</a>
            </div>
        @endauth

        <div class="box">
            <h2>Services</h2>
            <p>
                <a href="{{route('services.index')}}">List Services</a>
            </p>
            @auth('servers')
                <p>
                    <a href="{{route('services.index_my_services')}}">List My Services</a>
                </p>
            @endauth
            @if(auth('servers')->user()?->can('create', \App\Models\Service::class))
                <p>
                    <a href="{{route('services.create')}}">Create Services</a>
                </p>
                <p>
                    <a href="{{route('servers.carts.index', [auth('servers')->user()])}}">List Server's Pending Carts</a>
                </p>
            
            @endif
        </div>
    </header>

    <main>
        @section('content')
            <p>Ok</p>
        @show
    </main>


</body>
</html>