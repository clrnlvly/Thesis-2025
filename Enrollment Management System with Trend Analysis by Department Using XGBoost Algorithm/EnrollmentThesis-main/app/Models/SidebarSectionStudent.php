<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarSectionStudent extends Model
{
    //
    protected $table = 'sidebar_sections_student';
    protected $fillable = [
        'title',
        'is_displayed', 
    ];

    public function subItemsStudent()
    {
        return $this->hasMany(SidebarSubItemStudent::class, 'sidebar_section_id');
    }
}
