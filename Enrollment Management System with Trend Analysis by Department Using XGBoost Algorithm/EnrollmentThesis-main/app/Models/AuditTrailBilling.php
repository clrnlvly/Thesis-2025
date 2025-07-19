<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditTrailBilling extends Model
{
    //
    protected $table = 'audit_trail_billing';
    protected $fillable = [
        'description',
        'user',
    ];
}
