<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'path',
        'title',
        'meta_description',
        'canonical',
        'has_importants',
    ];

    public static function createFromInfo($info){
        $url = Url::create([
            'status' => $info['status'],
            'path' => $info['url'],
            'title' => $info['title'],
            'meta_description' => $info['meta-description'],
            'canonical' => $info['canonical'],
            'has_importants' => $info['has-importants'],
        ]);

        Image::insert(
            collect($info['images'])->map(fn($path)=>['path'=>$path, 'url_id'=>$url->id])->all()
        );

        Video::insert(
            collect($info['videos'])->map(fn($path)=>['path'=>$path, 'url_id'=>$url->id])->all()
        );

        Link::insert(
            collect($info['links'])->map(fn($path)=>['path'=>$path, 'url_id'=>$url->id])->all()
        );

        return $url;
    }

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function videos(){
        return $this->hasMany(Video::class);
    }
    
    public function links(){
        return $this->hasMany(Link::class);
    }

    
}
