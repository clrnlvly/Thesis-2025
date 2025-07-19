<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email_Logs extends Model
{
    //
    protected $table = 'email_logs' ;
    protected $fillable = [
        'users_id',
        'application',
    ];

    public function users() {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }
}
