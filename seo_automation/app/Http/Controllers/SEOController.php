<?php

namespace App\Http\Controllers;

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
        
        $guzzle = new Client();
        
        // var_dump($request);die();
        $response = $guzzle->request("GET", $url);
        
        // var_dump($request);
        
        $infos[] = $this->crawl($response->getBody(), $response->getStatusCode(), $url);

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
}
