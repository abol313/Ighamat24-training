<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    use HasFactory;
    protected $table = "installments";
    protected $fillable = [
        'price',
        'cart_id',
    ];

    public function cart(){
        return $this->belongsTo(Cart::class);
    }
}
