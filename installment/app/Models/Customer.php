<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Customer extends Authenticatable
{
    use HasFactory;
    protected $table = "customers";
    protected $fillable = [
        'username',
        'password',
    ];

    public function carts(){
        return $this->hasMany(Cart::class);
    }
}
