<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users_IDFormat extends Model
{
    protected $table = "users_id_format";
    protected $fillable = [
        'user_type',
        'id_format',
    ];
}
