<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Academic_Year;
use App\Models\Section;
use App\Models\Section_Student;
use App\Models\Student_Info;
use App\Models\User;
use App\Models\Users_IDFormat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EnrollmentConfirmationController extends Controller
{
    //
    public function index(Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = Student_Info::with('users', 'personalInfo', 'guardian');
        $section = Section::all();
        $id_format = Users_IDFormat::where('user_type','student')->first();

        if ($request->has('search') && !empty($request->search)) {
            $query->whereHas('personalInfo', function($q) use ($request) {
                $q->where('first_name', 'like', "%{$request->search}%")
                ->orWhere('last_name', 'like', "%{$request->search}%")
                ->orWhere('department', 'like', "%{$request->search}%");
            });
        }
        
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('department', $request->filter)
                  ->orWhere('branch', $request->filter)
                  ->orWhere('semester', $request->filter)
                  ->orWhere('year_level', $request->filter);
            });
        }

        if ($request->filled('academic_year_id')) {
            $academic = Academic_Year::find($request->academic_year_id);

            if ($academic) {
                $query->whereBetween('created_at', [$academic->start, $academic->end]);
            }
        }
        
        $student = $query->paginate($perPage);
        return Inertia::render('Admin/EnrollmentConfirmation', 
            ['student' => $student,
            'section' => $section,
            'id_format' => $id_format,
            'filters' => $request->only(['search', 'program', 'per_page'])]);
    }

    // public function insertStudentSection(Request $request) {

    //     DB::beginTransaction();

    //     try {
    //         $items = Student_Info::where('student_id', $request->student_id)->first();
    
    //         if (!$items) {
    //             return response()->json(['error' => 'Student not found'], 404);
    //         }
    
    //         $items->update([
    //             'student_id' => $request->student_info_id,
    //         ]);
    
    //         Section_Student::create([
    //             'section_id' => $request->section_id,
    //             'student_info_id' => $request->student_info_id,
    //             'status' => "enrolled",
    //         ]);

    //         $format = Users_IDFormat::where('id_format', $request->student_info_id)->first();

    //         if ($format) {
           
    //             $currentId = $format->id_format;

    //             preg_match('/^([A-Z]+[\-\_]?)(\d+)$/', $currentId, $matches);

    //             if (count($matches) === 3) {
    //                 $prefix = $matches[1];        
    //                 $number = (int) $matches[2];   

    //                 $newNumber = $number + 1;

    //                 $formattedNumber = str_pad($newNumber, strlen($matches[2]), '0', STR_PAD_LEFT);

    //                 $newIdFormat = $prefix . $formattedNumber;

    //                 $format->update([
    //                     'id_format' => $newIdFormat,
    //                 ]);
    //             }
    //         }
    //         DB::commit();
    //         $items = Student_Info::where('users_id', $request->users_id)->first();
    //         return redirect()->route('send.email.official-enroll', ['users_id' => $items->users_id]);
    //         return redirect()->route('enrollment.final.step');
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
    //     }
    // }

    public function insertStudentSection(Request $request)
    {
        DB::beginTransaction();

        try {
            // Find the student info based on the provided student_id
            $items = Student_Info::where('student_id', $request->student_id)->first();

            // If no student info is found, return an error
            if (!$items) {
                return response()->json(['error' => 'Student not found'], 404);
            }

            // Update student_info with the new student_info_id (student_id is the same)
            $items->update([
                'student_id' => $request->student_info_id,
                'status' => 'enrolled', // Set status to "enrolled"
            ]);

            // Create a new section_student record with the provided section_id and student_info_id
            Section_Student::create([
                'section_id' => $request->section_id,
                'student_info_id' => $request->student_info_id,
                'status' => "enrolled", // Set status to "enrolled" in section_student as well
            ]);

            // Update the student ID format if needed
            $format = Users_IDFormat::where('id_format', $request->student_info_id)->first();
            if ($format) {
                $currentId = $format->id_format;

                preg_match('/^([A-Z]+[\-\_]?)(\d+)$/', $currentId, $matches);

                if (count($matches) === 3) {
                    $prefix = $matches[1];
                    $number = (int) $matches[2];

                    $newNumber = $number + 1;
                    $formattedNumber = str_pad($newNumber, strlen($matches[2]), '0', STR_PAD_LEFT);

                    $newIdFormat = $prefix . $formattedNumber;

                    // Update the ID format in Users_IDFormat
                    $format->update([
                        'id_format' => $newIdFormat,
                    ]);
                }
            }

            // Commit the transaction if everything is successful
            DB::commit();

            // Retrieve the updated student_info and redirect to a route
            $items = Student_Info::where('users_id', $request->users_id)->first();

            return redirect()->route('send.email.official-enroll', ['users_id' => $items->users_id]);

        } catch (\Exception $e) {
            // If an error occurs, rollback the transaction and return an error message
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }

}
