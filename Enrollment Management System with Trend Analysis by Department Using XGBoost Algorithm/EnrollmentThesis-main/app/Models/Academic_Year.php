<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Academic_Year extends Model
{
    //
    protected $table = "academic_year";
    protected $fillable = [
        'start',
        'end',
        'status'
    ];
}
