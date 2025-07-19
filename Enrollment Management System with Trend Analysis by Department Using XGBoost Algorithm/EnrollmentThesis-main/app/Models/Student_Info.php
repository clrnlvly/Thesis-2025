<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Student_Info extends Model
{
    use HasFactory, Notifiable;
    // 
    use SoftDeletes;
    protected $table = 'student_info';
    protected $fillable = [
        'student_id',
        'department',
        'school_year',
        'semester',
        'branch',
        'year_level',
        'program',
        'classified_as',
        'last_school_attended',
        'last_school_address',
        'status'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function personalInfo()
    {
        return $this->hasOne(Personal_Info::class, 'student_info_id', 'student_id');
    }

    public function guardian()
    {
        return $this->hasOne(Guardian::class, 'student_info_id', 'student_id');
    }

    public function documents() 
    {
        return $this->hasOne(Documents::class, 'student_info_id', 'student_id');   
    }

    public function paymentVerification() 
    {
        return $this->hasMany(Payment_Verification::class, 'student_info_id', 'student_id');
    }

    public function sectionStudent() 
    {
        return $this->hasOne(Section_Student::class, 'student_info_id', 'student_id');
    }

    public function studentSubjects() 
    {
        return $this->hasMany(Student_Subjects::class, 'student_info_id', 'student_id');
    }

    public function studentFees() 
    {
        return $this->hasMany(Student_Fees::class, 'student_info_id', 'student_id');
    }

    public function paymentDetails() 
    {
        return $this->hasMany(Payment_Details::class, 'student_info_id', 'student_id');
    }

    public function grades() 
    {
        return $this->hasMany(Grades::class, 'student_info_id', 'student_id');
    }

    public function evaluation()
    {
        return $this->hasMany(Evaluation::class, 'student_info_id', 'student_id');
    }
    
}
