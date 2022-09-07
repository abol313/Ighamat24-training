<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Installment</title>
</head>
<body>
    <header>
        @auth('customers')
            Hey [{{auth('customers')->user()->username}}], you are a Customer
        @endauth
        @auth('servers')
            Hey {{auth('servers')->user()->username}}], you are a Server
        @endauth
    </header>

    <main>
        @section('content')
            <p>Ok</p>
        @show
    </main>


</body>
</html>