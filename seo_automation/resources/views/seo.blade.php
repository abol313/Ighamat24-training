<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    @vite('resources/css/app.scss')
    <title>Seo Check</title>
</head>
<body>

    <h1>Number Of Urls Checked : {{count($infos)}}</h1>
    @foreach($infos as $info)
        @php
            $titleLength = mb_strlen($info['title']);
            $hasSeoTitleLength = 50 <= $titleLength && $titleLength <= 60;

            $metaDescriptionLength = mb_strlen($info['meta-description']);
            $hasSeoMetaDescriptionLength = 50 <= $metaDescriptionLength && $metaDescriptionLength <= 160;
        @endphp
        <div @class(['info-item', 'border-warning' => !$info['has-importants']]) onclick="this.classList.toggle('info-item-clicked')">
            <h2 @class([
                "url", 
                "success"=>str_starts_with($info['status'], '2'), 
                "warning"=>str_starts_with($info['status'], '3'), 
                "danger"=>str_starts_with($info['status'], '4'), 
                "danger"=>str_starts_with($info['status'], '5'), 
                ])>{{$info['status']}} | {{$info['url']}}</h2>

            <div class="desc">
                @if($info['has-importants'])
                    <h2 class="ok">It has title, meta description, and canonical</h2>
                @else
                    <h2 class="warning">This link has seo problems!</h2>
                @endif

                @if($info['title'])
                    <h3 class="title ok">Title {!!$hasSeoTitleLength?"":'<span class="warning">[ should be in size range of 50-60 ] </span>'!!}: {{$info['title']}}</h3>
                @else
                    <h3 class="title warning">No Title !</h3>
                @endif

                
                @if($info['meta-description'])
                    <h3 class="meta-description ok">Meta Description {!!$hasSeoMetaDescriptionLength?"":'<span class="warning">[ should be in size range of 50-160 ] </span>'!!}: {{$info['meta-description']}}</h3>
                @else
                    <h3 class="meta-description warning">No Meta Description !</h3>
                @endif

                
                @if($info['canonical'])
                    <h3 class="canonical ok">Canonical : {{$info['canonical']}}</h3>
                @else
                    <h3 class="canonical warning">No Canonical !</h3>
                @endif

                

                <div class="links">
                    <h3>Links : </h3>
                    @foreach($info['links'] as $link)
                        <a href="{{$link}}">
                            <p class="link">{{$link}}</p>
                        </a>
                    @endforeach
                </div>
                <hr/>

                <div class="images">
                    <h3>Images : </h3>
                    @foreach($info['images'] as $image)
                        <a href="{{$image}}">
                            <p class="image">{{$image}}</p>
                        </a>
                    @endforeach
                </div>
                <hr/>

                <div class="videos">
                    <h3>Videos : </h3>
                    @foreach($info['videos'] as $video)
                        <a href="{{$video}}">
                            <p class="video">{{$video}}</p>
                        </a>
                    @endforeach
                </div>
                <hr/>

                
            </div>
        </div>
    @endforeach

</body>
</html>