<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campus extends Model
{
    //
    protected $table = 'campus';
    protected $fillable = [
        'name',
        'location',
        'url'
    ];
}
