<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment_Verification extends Model
{
    //
    use SoftDeletes;

    protected $table ='payment_verification';
    protected $fillable = [
        'student_info_id',
        'name',
        'email',
        'purpose',
        'semester',
        'reference',
        'amount',
        'payment_receipt',
        'year_level',
        'program',
        'status',
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }
}
