<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;
use \GuzzleHttp\Client;
use \Symfony\Component\DomCrawler\Crawler;
use \Symfony\Component\DomCrawler\Link;
use \Symfony\Component\DomCrawler\Image;

class SEOController extends Controller
{
    //
    function check(Request $request){
        // var_dump($request);die();
        
        $infos = [];
        
        $url = $request->input('url');
        $baseUrl = $url;
        
        $guzzle = new Client();
        
        // var_dump($request);die();
        // $response = $guzzle->request("GET", $url);
        
        // var_dump($request);
        $urls = [$url];
        $checkedUrls = [];
        $requestMethod = "GET";

        $i = 100;
        while($i-->0){

            $popedUrl = array_pop($urls);

            if($popedUrl === null) break;


            $info = [];

            if($url = Url::where('path', $popedUrl)->first()){
                
                $infos[] = $info = [
                    'url' => $url->path,
                    'title' => $url->title,
                    'status' => $url->status,
                    'meta-description' => $url->meta_description,
                    'canonical' => $url->canonical,
                    'has-importants' => $url->has_importants,
                    'images' => $url->images->pluck('path')->all(),
                    'videos' => $url->videos->pluck('path')->all(),
                    'links' => $url->links->pluck('path')->all(),
                ];

            }else{
                $response = $guzzle->request("GET", $popedUrl);
                $infos[] = $info = $this->crawl($response->getBody(), $response->getStatusCode(), $popedUrl);
                Url::createFromInfo($info);
            }

            $checkedUrls[$popedUrl] = true;

            foreach($info['links'] as $link){
                if( $this->matchDomain($link, $baseUrl) && !($checkedUrls[$link] ?? null))
                    array_push($urls, $link);
            }
            
        }


        return view('seo', ['infos' => $infos]);
    }

    function crawl($body, $status, $url){
        $urlInfo = [];

        $crawl = new Crawler($body, $url);

        $urlInfo['url'] = $url;
        
        $urlInfo['status'] = $status;
        
        $urlInfo['links'] = [];
        foreach($crawl->filter('body a')->links() as $link){
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

        
        $urlInfo['title'] = $crawl->filter('head > title')->first()->innerText() ?? null;
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
        return $matches[1];
    }
}
