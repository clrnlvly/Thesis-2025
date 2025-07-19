<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Other_Billing extends Model
{
    //
    use SoftDeletes;
    protected $table  = 'other_billing';
    protected $fillable = [
        'payment_type',
        'name',
        'amount',
        'description',
       
    ];
}
