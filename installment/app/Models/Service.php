<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $table = "services";
    protected $fillable = [
        'title',
        'description',
        'price_per_unit',
        'unit',
        'category_id',
        'server_id',
    ];
}
