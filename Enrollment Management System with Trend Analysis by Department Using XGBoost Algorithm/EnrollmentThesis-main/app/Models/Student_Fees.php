<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student_Fees extends Model
{
    //
    use SoftDeletes;
    protected $table = 'student_fees';
    protected $fillable = [
        'student_info_id',
        'payment_details_id',
        'year_level',
        'semester',
        'status',
        'total_amount',
        'amount_paid',
    ];

    public function studentInfo()
    {
        return $this->belongsTo(Student_Info::class, 'student_info_id', 'student_id');
    }

    public function paymentDetails()
    {
        return $this->belongsTo(Payment_Details::class, 'payment_details_id', 'id');
    }
    
}
