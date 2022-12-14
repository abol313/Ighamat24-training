<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Server extends Authenticatable
{
    use HasFactory;
    protected $table = "servers";
    protected $fillable = [
        'username',
        'password',
    ];

    public function services(){
        return $this->hasMany(Service::class);
    }

    public function carts(){
        return Cart::whereIn('service_id', $this->services->pluck('id'))->get();
    }

    public function installments(){
        return Installment::whereIn('cart_id', $this->carts()->pluck('id'))->get();
    }
}
