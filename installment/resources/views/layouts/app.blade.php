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
            <h2>Hey [{{auth('customers')->user()->username}}], you are a Customer</h2>
        @endauth

        @auth('servers')
            <h2>Hey [{{auth('servers')->user()->username}}], you are a Server</h2>
        @endauth
    </header>

    <main>
        @section('content')
            <p>Ok</p>
        @show
    </main>


</body>
</html>