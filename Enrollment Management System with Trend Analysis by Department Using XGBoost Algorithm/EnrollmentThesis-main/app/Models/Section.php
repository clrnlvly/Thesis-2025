<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Section extends Model
{
    //
    use SoftDeletes;
    protected $table = 'section';
    protected $fillable = [
        'name',
        'program_code',
        'year_level',
        'semester'
    ];

    public function schedule()
    {
        return $this->hasMany(Schedule::class, 'section_name', 'name');
    }

    public function sectionStudent()
    {
        return $this->hasOne(Section_Student::class, 'section_id', 'id');
    }
}
