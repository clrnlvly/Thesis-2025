<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarSubItemStudent extends Model
{
    //
    protected $table = 'sidebar_sub_items_student'; // Adjust if necessary

    protected $fillable = [
        'sidebar_section_id',
        'title',
        'route',
        'is_displayed',  // <-- Added here
    ];

    // Define inverse relationship with section
    public function sectionStudent()
    {
        return $this->belongsTo(SidebarSectionStudent::class, 'sidebar_section_id');
    }
}
