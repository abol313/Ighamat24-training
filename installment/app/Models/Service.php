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

    public function category(){
        return $this->belongsTo(ServiceCategory::class, 'category_id', 'id');
    }

    public function server(){
        return $this->belongsTo(Server::class, 'server_id', 'id');
    }

    public function installmentConditions(){
        return $this->hasMany(InstallmentCondition::class);
    }
}
