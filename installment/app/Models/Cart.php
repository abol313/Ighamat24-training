<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = "carts";
    protected $fillable = [
        'installments_no',
        'price',
        'amount',
        'status',
        'service_id',
        'customer_id',
        'installment_condition_id',
    ];

    public function service(){
        return $this->belongsTo(Service::class);
    }

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function installmentCondition(){
        return $this->belongsTo(InstallmentCondition::class, 'installment_condition_id', 'id');
    }

    public function installments(){
        return $this->hasMany(Installment::class);
    }
}
