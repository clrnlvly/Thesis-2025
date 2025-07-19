<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\College_Billing;
use App\Models\Other_Billing;
use App\Models\Student_Info;
use App\Models\Student_Subjects;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CourseSelectionController extends Controller
{   
        public function index(Request $request)
        {
            $perPage = $request->input('per_page', session('rows_per_page', 10));
        
            session(['rows_per_page' => $perPage]);

            $query = Student_Info::with([
                'users',
                'personalInfo',
                'documents',
                'guardian',
                'paymentVerification'
            ])
            ->whereHas('documents')
            ->whereHas('paymentVerification');

            if ($request->has('search') && !empty($request->search)) {
                $query->whereHas('personalInfo', function($q) use ($request) {
                    $q->where('first_name', 'like', "%{$request->search}%")
                    ->orWhere('last_name', 'like', "%{$request->search}%")
                    ->orWhere('student_info_id', 'like', "%{$request->search}%");
                });
            }
                    
            if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
                $query->where(function($q) use ($request) {
                    $q->where('semester', $request->filter)
                      ->orWhere('year_level', $request->filter);
                    });
                }

            $students = $query->paginate($perPage);

            $college_fee = College_Billing::all();
            $subjects = Subjects::all();
            $other_fee = Other_Billing::all();

            return Inertia::render('Admin/AssignCourse', [
                'student' => $students,
                'college_fee' => $college_fee,
                'subjects' => $subjects,
                'other_fee' => $other_fee,
                'filters' => $request->only(['search', 'filter', 'per_page'])
            ]);
        }

    public function store(Request $request) {
    
        if (isset($request->subjects) && is_array($request->subjects)) {
           
            foreach ($request->subjects as $subjectDetail) {
                
                Student_Subjects::create([
                    'student_info_id' => $request->student_id,
                    'subject_code' => $subjectDetail['subject_code'],  
                    'status' => 'enroll',
                ]);
            }
    
            return redirect()->back()->with('success', 'Subjects saved successfully!');
        } else {
            return redirect()->back()->with('error', 'No subjects selected.');
        }
    }
    
        
}
