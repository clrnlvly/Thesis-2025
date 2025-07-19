<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarSection extends Model
{
    //
    protected $table = 'sidebar_sections';
    protected $fillable = [
        'user_type',
        'title',
        'is_displayed', 
    ];

    public function subItems()
    {
        return $this->hasMany(SidebarSubItem::class, 'sidebar_section_id');
    }
}
