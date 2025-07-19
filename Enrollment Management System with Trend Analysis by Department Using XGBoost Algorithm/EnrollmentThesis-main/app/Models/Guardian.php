<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Guardian extends Model
{
    //
    use HasFactory, Notifiable;

    use SoftDeletes;
    protected $table = 'guardian';
    protected $fillable = [
        'student_id',
        'father_name',
        'father_occupation',
        'father_phone',
        'mother_name',
        'mother_occupation',
        'mother_phone',
        'guardian_name',
        'guardian_relationship',
        'guardian_phone'
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }
}
