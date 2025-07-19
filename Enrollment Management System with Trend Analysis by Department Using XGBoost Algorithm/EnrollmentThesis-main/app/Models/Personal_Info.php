<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Personal_Info extends Model
{
    //
    use HasFactory, Notifiable;

    use SoftDeletes;
    protected $table = 'personal_info';
    protected $fillable = [
        'student_id',
        'first_name',
        'last_name',
        'middle_name',
        'address',
        'birth_date',
        'birth_place',
        'civil_status',
        'gender',
        'religion'
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }
}
