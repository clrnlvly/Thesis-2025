<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarSubItemProfessor extends Model
{
    //
    protected $table = 'sidebar_sub_items_professor'; // Adjust if necessary

    protected $fillable = [
        'sidebar_section_id',
        'title',
        'route',
        'is_displayed',  // <-- Added here
    ];

    // Define inverse relationship with section
    public function sectionProfessor()
    {
        return $this->belongsTo(SidebarSectionProfessor::class, 'sidebar_section_id');
    }
}
