<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grades extends Model
{
    //
    use SoftDeletes;
    protected $table = 'grades';
    protected $fillable = [
        'sender_id',
        'student_info_id',
        'semester',
        'year_level',
        'subject',
        'grade',
        'status'
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }

    public function gradeEditRequests() {
        return $this->hasOne(GradeEditRequest::class, 'grade_id', 'id');
    }
}
