<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    //
    protected $table = 'evaluation';
    protected $fillable = [
        'student_info_id',
        'semester',
        'year_level',
        'clearance',
        'grades_eval',
        'documents',
        'payment'
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }
}
