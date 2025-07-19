<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarSubItem extends Model
{
    //
    protected $table = 'sidebar_sub_items'; // Adjust if necessary

    protected $fillable = [
        'sidebar_section_id',
        'title',
        'route',
        'is_displayed',  // <-- Added here
    ];

    // Define inverse relationship with section
    public function section()
    {
        return $this->belongsTo(SidebarSection::class, 'sidebar_section_id');
    }
}
