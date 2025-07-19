<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Billing_Type extends Model
{
    //
    use SoftDeletes;
    protected $table  = 'billing_type';
    protected $fillable = [
        "fee_type",
        "program_name",
        "no_unit",
        "amount",
        "misellaneous_name",
        "misellaneous_description" ,
        "discount_name" ,
        "discount_amount" ,
        "total_amount" ,
    ];

}
