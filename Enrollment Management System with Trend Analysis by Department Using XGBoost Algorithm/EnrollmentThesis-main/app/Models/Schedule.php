<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    //

    use SoftDeletes;
    protected $table = 'schedule';
    protected $fillable = [
        'section_name',
        "subject_code",
        'prof_name',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_name', 'name');
    }
}
