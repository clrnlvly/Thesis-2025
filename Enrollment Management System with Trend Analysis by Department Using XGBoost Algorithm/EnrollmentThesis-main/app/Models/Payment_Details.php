<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment_Details extends Model
{
    //
    use SoftDeletes;
    protected $table = 'payment_details';
    protected $fillable = [
        'student_info_id',
        'fee_type',
        'fee_id',
        'year_level',
        'semester',
        'amount'
    ];

    public function studentFees() 
    {
        return $this->hasOne(Student_Fees::class,'payment_details_id', 'id');
    }

    public function studentInfo() {
        return $this->belongsTo(Student_Info::class,'student_info_id', 'student_id');
    }
}
