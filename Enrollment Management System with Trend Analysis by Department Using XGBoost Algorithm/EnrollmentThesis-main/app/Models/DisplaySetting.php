<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisplaySetting extends Model
{
    //
    protected $table = 'display_settings';
    protected $fillable = [
        'grade_sidebar',
        'enrollment_sidebar',
        'evaluation_sidebar'
    ];
}
