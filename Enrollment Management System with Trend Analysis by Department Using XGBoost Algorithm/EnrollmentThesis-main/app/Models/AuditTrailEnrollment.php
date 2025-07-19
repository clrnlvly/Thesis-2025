<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditTrailEnrollment extends Model
{
    //
    protected $table = 'audit_trail_enrollment';
    protected $fillable = [
        'description',
        'user',
    ];
}
