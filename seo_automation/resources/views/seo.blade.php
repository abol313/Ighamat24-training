<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Seo Check</title>
</head>
<body>
    @foreach($info as $title=>$description)
        <p>{{$title}}</p>
        <pre><?php print_r($description)?></pre>
    @endforeach

</body>
</html>