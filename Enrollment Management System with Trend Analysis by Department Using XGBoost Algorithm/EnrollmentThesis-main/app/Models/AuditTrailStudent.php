<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditTrailStudent extends Model
{
    //
    protected $table = 'audit_trail_student';
    protected $fillable = [
        'description',
        'user',
    ];
}
