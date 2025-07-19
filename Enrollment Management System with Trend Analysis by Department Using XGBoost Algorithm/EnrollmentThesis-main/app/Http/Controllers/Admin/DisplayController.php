<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DisplaySetting;
use App\Models\Grades;
use App\Models\SidebarSection;
use App\Models\SidebarSectionStudent;
use App\Models\SidebarSectionProfessor;
use App\Models\Student_Subjects;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisplayController extends Controller
{
    public function index()
{
    $roles = ['super admin', 'accounting', 'registrar', 'student', 'professor'];

    $sidebarByRole = [];

    foreach ($roles as $role) {
        if ($role == 'student') {
            // Fetch data for students without using user_type
            $sections = SidebarSectionStudent::with('subItemsStudent')
                ->get()  // Remove where condition if no user_type column
                ->map(function ($section) {
                    return [
                        'title' => $section->title,
                        'is_displayed' => $section->is_displayed,
                        'items' => $section->subItemsStudent->map(function ($item) {
                            return [
                                'title' => $item->title,
                                'is_displayed' => $item->is_displayed,
                            ];
                        })->toArray()
                    ];
                });

            $sidebarByRole['student'] = $sections;
        } elseif ($role == 'professor') {
            // Fetch data for professors without using user_type
            $sections = SidebarSectionProfessor::with('subItemsProfessor')
                ->get()  // Remove where condition if no user_type column
                ->map(function ($section) {
                    return [
                        'title' => $section->title,
                        'is_displayed' => $section->is_displayed,
                        'items' => $section->subItemsProfessor->map(function ($item) {
                            return [
                                'title' => $item->title,
                                'is_displayed' => $item->is_displayed,
                            ];
                        })->toArray()
                    ];
                });

            $sidebarByRole['professor'] = $sections;
        } else {
            // Fetch data for other roles (admin, accounting, etc.)
            $sections = SidebarSection::with('subItems')
                ->where('user_type', $role)
                ->get()
                ->map(function ($section) {
                    return [
                        'title' => $section->title,
                        'is_displayed' => $section->is_displayed,
                        'items' => $section->subItems->map(function ($item) {
                            return [
                                'title' => $item->title,
                                'is_displayed' => $item->is_displayed,
                            ];
                        })->toArray()
                    ];
                });

            $sidebarByRole[$role] = $sections;
        }
    }

    return Inertia::render('Admin/Display', [
        'sidebarByRole' => $sidebarByRole,
    ]);
}


public function updateDisplay(Request $request)
{
    $sidebarData = $request->input('sidebar', []);

    foreach ($sidebarData as $role => $sections) {
        foreach ($sections as $sectionData) {
            // For student role, no need for the 'user_type' condition
            if ($role == 'student') {
                // Update sidebar sections and sub-items for students
                $section = SidebarSectionStudent::where('title', $sectionData['title'])->first();
            } 
            // For professor role, no need for the 'user_type' condition
            elseif ($role == 'professor') {
                // Update sidebar sections and sub-items for professors
                $section = SidebarSectionProfessor::where('title', $sectionData['title'])->first();
            } 
            // For other roles (admin, etc.), filter by 'user_type'
            else {
                // Update sidebar sections and sub-items for other roles (super admin, etc.)
                $section = SidebarSection::where('title', $sectionData['title'])
                    ->where('user_type', $role)
                    ->first();
            }

            // If section is found, update it
            if ($section) {
                $section->update([
                    'is_displayed' => $sectionData['is_displayed'],
                ]);

                // Update sub-items
                foreach ($sectionData['items'] as $itemData) {
                    if ($role == 'student') {
                        // Update sub-items for student
                        $section->subItemsStudent()
                            ->where('title', $itemData['title'])
                            ->update([
                                'is_displayed' => $itemData['is_displayed'],
                            ]);
                    } elseif ($role == 'professor') {
                        // Update sub-items for professor
                        $section->subItemsProfessor()
                            ->where('title', $itemData['title'])
                            ->update([
                                'is_displayed' => $itemData['is_displayed'],
                            ]);
                    } else {
                        // Update sub-items for other roles
                        $section->subItems()
                            ->where('title', $itemData['title'])
                            ->update([
                                'is_displayed' => $itemData['is_displayed'],
                            ]);
                    }
                }
            }
        }
    }

    return redirect()->back()->with('success', 'Sidebar display settings updated successfully.');
}

    public function toggleGradeSidebar(Request $request)
    {
        $request->validate([
            'enabled' => 'required|boolean',
        ]);

        $settings = DisplaySetting::first();

        if (!$settings) {
            $settings = DisplaySetting::create([
                'grade_sidebar' => $request->enabled,
            ]);
        } else {
            $settings->grade_sidebar = $request->enabled;
            $settings->save();
        }

        if ($request->enabled) {
            $this->syncRemarksFromGrades();
        }

    }

    public function syncRemarksFromGrades()
    {
        $grades = Grades::all();

        foreach ($grades as $grade) {
            
            $subject = Subjects::where('name', $grade->subject)->first();

            if (!$subject) {
                continue; 
            }

            Student_Subjects::where('student_info_id', $grade->student_info_id)
                ->where('subject_code', $subject->code)
                ->update(['remarks' => $grade->status]);
        }
    }

}
