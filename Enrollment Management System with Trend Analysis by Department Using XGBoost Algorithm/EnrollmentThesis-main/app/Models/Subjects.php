<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subjects extends Model
{
    //
    use HasFactory, Notifiable;
    use SoftDeletes;
    
    protected $table = 'subjects';
    protected $fillable = [
        'program_code',
        'code',
        'name',
        'prerequisites',
        'period',
        'department',
        'year_level',
        'category',
        'lec',
        'lab',
        'unit',
        'total',
    ];

    public function programs() {
        return $this->belongsTo(Programs::class, 'program_code', 'code');
    }

    public function studentSubjects()
    {
        return $this->hasOne(Student_Subjects::class, 'subject_code', 'code');
    }

}

