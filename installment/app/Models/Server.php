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
}
