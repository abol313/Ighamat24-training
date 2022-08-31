<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;
use \GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use \Symfony\Component\DomCrawler\Crawler;
use \Symfony\Component\DomCrawler\Link;
use \Symfony\Component\DomCrawler\Image;

class SEOController extends Controller
{
    //
    function check(Request $request){
        // var_dump($request);die();
        set_time_limit(200);
        $infos = [];
        
        $url = $request->input('url');
        $baseUrl = $url;
        
        $guzzle = new Client();
        
        // var_dump($request);die();
        // $response = $guzzle->request("GET", $url);
        
        // var_dump($request);
        // $lastUrl = Url::query()->latest('id')->get()->first();
        $urls = [$url];
        // $lastUrl->delete();
        $checkedUrls = [];
        $requestMethod = "GET";
        $i = 0;
        while($i++<50){
            if($i%2===0)
                info('count',['index'=>$i]);
            $popedUrl = array_pop($urls);

            if($popedUrl === null) break;


            $info = [];

            if($urlRecord = Url::where('path', $popedUrl)->first()){
                
                $infos[] = $info = [
                    'url' => $urlRecord->path,
                    'title' => $urlRecord->title,
                    'status' => $urlRecord->status,
                    'meta-description' => $urlRecord->meta_description,
                    'canonical' => $urlRecord->canonical,
                    'has-importants' => $urlRecord->has_importants,
                    'images' => $urlRecord->images->pluck('path')->all(),
                    'videos' => $urlRecord->videos->pluck('path')->all(),
                    'links' => $urlRecord->links->pluck('path')->all(),
                ];

                // echo "<pre>";
                // print_r($info);
                // echo "</pre>";
            }else{
                // continue;
                try{
                    $response = $guzzle->request("GET", $popedUrl);
                }catch(ClientException $e){
                    logger('response', [$response]);
                }
                // logger('response', [$response->getBody()->getContents(),$response]);

                $infos[] = $info = $this->crawl($response->getBody(), $response->getStatusCode(), $popedUrl);
                Url::createFromInfo($info);
            }

            $checkedUrls[$popedUrl] = true;

            foreach($info['links'] as $link){
                // echo "<p>$link</p>";
                if( $this->matchDomain($link, $baseUrl) && !($checkedUrls[$link] ?? null))
                    array_push($urls, $link);
            }

            // echo "<pre>";
            // print_r($urls);
            // echo "</pre>";
        }


        return view('seo', ['infos' => $infos]);
    }

    function crawl($body, $status, $url){
        $urlInfo = [];

        $crawl = new Crawler($body, $url);

        $urlInfo['url'] = $url;
        
        $urlInfo['status'] = $status;
        
        $urlInfo['links'] = [];
        foreach($crawl->filter('body a, head link')->links() as $link){
            $urlInfo['links'][] = $link->getUri();
        }

        $urlInfo['images'] = [];
        foreach($crawl->filter('body img')->images() as $image){
            $urlInfo['images'][] = $image->getUri();
        }

        // $urlInfo['videos'] = $crawl->filter('body video')->children();
        
        $urlInfo['videos'] = [];
        foreach($crawl->filter('body video')->extract(['src']) as $videoSrc){
            $urlInfo['videos'][] = $videoSrc;
        }

        $title = $crawl->filter('head > title')->getNode(0) ?? null;
        // $title = $titles ? $titles : null ;
        // logger('$title', [$title]);
        $urlInfo['title'] = $title ? $title->textContent : null;
        $urlInfo['meta-description'] = $crawl->filter('head > meta[name="description"]')->extract(['content'])[0] ?? null;
        $urlInfo['canonical'] = $crawl->filter('head link[rel="canonical"]')->extract(['href'])[0] ?? null;

        $urlInfo['has-importants'] = $urlInfo['title'] && $urlInfo['meta-description'] && $urlInfo['canonical'];
        
        // print_r($urlInfo);
        // echo "</pre>";

        return $urlInfo;
    }

    function matchDomain($url, $baseUrl){
        return $this->getDomain($url) === $this->getDomain($baseUrl);
    }

    function getDomain($url){
        // echo "getDomain : $url";
        $matches = null;
        $url = str_replace("https://", "", $url);
        $url = str_replace("http://", "", $url);
        preg_match("/^.*\.([^.]*\.[^.\/]*)/", '.'.$url.'/', $matches);
        
        
        // logger("url:$url");
        if(count($matches)<2){
            logger('matches', [
                'matches' => $matches,
                'url' => $url,
            ]);
            return false;
        }
        return $matches[1];
    }
}
