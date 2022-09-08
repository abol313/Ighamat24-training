<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstallmentCondition extends Model
{
    use HasFactory;
    protected $table = "installment_conditions";
    protected $fillable = [
        'maximum',
        'installments_count',
        'service_id',
    ];
}
