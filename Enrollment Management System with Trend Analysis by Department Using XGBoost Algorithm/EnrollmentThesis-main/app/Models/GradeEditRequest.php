<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GradeEditRequest extends Model
{
    //
    protected $table = 'grade_edit_requests';
    protected $fillable = [
        'grade_id',
        'requested_by',
        'new_grade',
        'reason',
        'status',
    ];

    public function grade() {
        return $this->belongsTo(Grades::class, 'grade_id', 'id');
    }
    
}
