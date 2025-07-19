<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditTrailCurriculum extends Model
{
    //
    protected $table = 'audit_trail_curriculum';
    protected $fillable = [
        'description',
        'user',
    ];
}
