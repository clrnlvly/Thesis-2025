<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section_Student extends Model
{
    //
    protected $table = 'section_student';
    protected $fillable = [
        'section_id',
        'student_info_id',
        'status'
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id', 'id');
    }
}
