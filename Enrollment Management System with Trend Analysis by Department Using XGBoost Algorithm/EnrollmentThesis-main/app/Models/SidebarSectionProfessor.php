<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarSectionProfessor extends Model
{
    //
    protected $table = 'sidebar_sections_professor';
    protected $fillable = [
        'title',
        'is_displayed', 
    ];

    public function subItemsProfessor()
    {
        return $this->hasMany(SidebarSubItemProfessor::class, 'sidebar_section_id');
    }
}
