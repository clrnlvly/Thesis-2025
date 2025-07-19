<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Programs extends Model
{
    //

    use SoftDeletes;
    protected $table = 'programs';
    protected $fillable = [
        'code',
        'name',
        'department',
        'campus',
        'status',
        'duration'
    ];

    public function subjects() {
        return $this->hasMany(Subjects::class, 'program_code', 'code');
    }

    public function shsBilling()
    {
        return $this->hasMany(SHS_Billing::class, 'program_code', 'code');
    }

    public function collegeBilling()
    {
        return $this->hasMany(College_Billing::class, 'program_code', 'code');
    }

}
