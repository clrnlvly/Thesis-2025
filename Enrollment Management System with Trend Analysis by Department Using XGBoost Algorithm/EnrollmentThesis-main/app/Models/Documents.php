<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Documents extends Model
{
    use SoftDeletes;
    protected $table = 'documents';
    protected $fillable = [
        'student_info_id',
        'form_138A',
        'form_137',
        'good_moral',
        'psa',
        'pic_2x2',
        'ctc_transferee',
        'grade_transferee',
        'f137_transferee',
        'status',
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }
}
