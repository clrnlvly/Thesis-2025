<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\ApplicationRequest;
use App\Models\Academic_Year;
use App\Models\Documents;
use App\Models\Guardian;
use App\Models\Personal_Info;
use App\Models\Programs;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminApplicationController extends Controller
{
    public function index(Request $request)
    {

        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = Student_Info::with('users', 'personalInfo', 'guardian');
        

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
        $acad_year = Academic_Year::all();
        $program = Programs::all();

        return Inertia::render('Admin/Application', [
            'student' => $student, 'acad_year' => $acad_year, 'program' => $program,
            'filters' => $request->only(['search', 'filter', 'per_page'])
        ]);
    }

    public function add() {
        $program = Programs::all();
        return Inertia::render('Admin/Admission/CreateStudent', ['program'=>$program]);
    }

    public function createStudent(ApplicationRequest $request) {
      
        DB::beginTransaction();
        try {

        $User = new User();
        $User->name = $request->first_name . ' ' . $request->last_name;
        $User->email = $request->email;
        $defaultPassword = 'WITI@123';
        $User->password = Hash::make($defaultPassword);
        $User->role = 'student';
        $User->save(); 
        
        $Student_Info = new Student_Info();
        $Student_Info->department = $request->department;
        $Student_Info->student_id = $User->id;
        $Student_Info->school_year = $request->school_year;
        $Student_Info->semester = $request->semester;
        $Student_Info->branch = $request->branch;
        $Student_Info->year_level = $request->year_level;
        $Student_Info->program = $request->program;
        $Student_Info->classified_as = $request->classified_as;
        $Student_Info->last_school_attended = $request->last_school_attended;
        $Student_Info->last_school_address = $request->last_school_address;
       
        $Student_Info->users_id = $User->id;
        $Student_Info->save();

 
        $Personal_Info = new Personal_Info();
        $Personal_Info->first_name = $request->first_name;
        $Personal_Info->last_name = $request->last_name;
        $Personal_Info->middle_name = $request->middle_name;
        $Personal_Info->address = $request->address;
        $Personal_Info->birth_date = $request->birth_date;
        $Personal_Info->birth_place = $request->birth_place;
        $Personal_Info->civil_status =$request->civil_status;
        $Personal_Info->gender = $request->gender;
        $Personal_Info->religion = $request->religion;
       
        $Personal_Info->student_info_id = $Student_Info->student_id;
        $Personal_Info->save();

    
        $Guardian = new Guardian();
        $Guardian->father_name = $request->father_name;
        $Guardian->father_occupation = $request->father_occupation;
        $Guardian->father_phone = $request->father_phone;
        $Guardian->mother_name = $request->mother_name;
        $Guardian->mother_occupation = $request->mother_occupation;
        $Guardian->mother_phone = $request->mother_phone;
        $Guardian->guardian_name = $request->guardian_name;
        $Guardian->guardian_relationship = $request->guardian_relationship;
        $Guardian->guardian_phone = $request->guardian_phone;
        
        $Guardian->student_info_id = $Student_Info->student_id;
        $Guardian->save();

         DB::commit();

         return redirect()->route("admin.application");

        } catch(\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }        
    }

    public function edit(ApplicationRequest $request) {

        DB::beginTransaction();
    
      
            $studentInfo = Student_Info::where('id', $request->id)->first();
            $studentInfo->update([
                'department' => $request->department,
                'school_year' => $request->school_year,
                'semester' => $request->semester,
                'branch' => $request->branch,
                'year_level' => $request->year_level,
                'program' => $request->program,
                'classified_as' => $request->classified_as,
                'last_school_attended' => $request->last_school_attended,
                'last_school_address' => $request->last_school_address,
                'status' => $request->status,
            ]);
    
            // Update user email
            User::where('id', $studentInfo->users_id)->update([
                'email' => $request->email
            ]);
    
            // Update personal info
            Personal_Info::where('student_info_id', $studentInfo->student_id)->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'middle_name' => $request->middle_name,
                'address' => $request->address,
                'birth_date' => $request->birth_date,
                'birth_place' => $request->birth_place,
                'civil_status' => $request->civil_status,
                'gender' => $request->gender,
                'religion' => $request->religion,
            ]);
    
            // Update guardian info
            Guardian::where('student_info_id', $studentInfo->student_id)->update([
                'father_name' => $request->father_name,
                'father_occupation' => $request->father_occupation,
                'father_phone' => $request->father_phone,
                'mother_name' => $request->mother_name,
                'mother_occupation' => $request->mother_occupation,
                'mother_phone' => $request->mother_phone,
                'guardian_name' => $request->guardian_name,
                'guardian_relationship' => $request->guardian_relationship,
                'guardian_phone' => $request->guardian_phone,
            ]);
    
            DB::commit();
   
            if(strtolower($request->status) === 'approved') {
                $existing = Documents::where('student_info_id', $studentInfo->student_id)->first();
                if(!$existing) {
                    Documents::create([
                        'student_info_id' => $studentInfo->student_id,
                    ]);
                }
                return redirect()->route('send.email', ['id' => $studentInfo]);
            } elseif(strtolower($request->status) === 'reject') {
                return redirect()->route('send.email.rejected', ['id' => $studentInfo]);
            } elseif(strtolower($request->status) === 'onhold') {
                return redirect()->route('send.email.onhold', ['id' => $studentInfo]);
            }
    
            return back()->with('success', 'Student information updated successfully');
    
            DB::rollBack();
            return back()->with('error', 'Failed to update student information: ' . $e->getMessage());
        
    }

    public function destroy($id) {
        Programs::findOrFail($id)->delete();
    }

    public function indexDocuments (Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = Student_Info::with('personalInfo', 'documents')
        ->whereHas('documents')
        ->whereIn('status', ['Approved', 'Pending', 'OnHold'])
        ->orderByRaw("FIELD(status, 'Pending', 'OnHold', 'Approved')");

        if ($request->has('search') && !empty($request->search)) {
            $query->whereHas('personalInfo', function($q) use ($request) {
                $q->where('first_name', 'like', "%{$request->search}%")
                ->orWhere('last_name', 'like', "%{$request->search}%")
                ->orWhere('student_info_id', 'like', "%{$request->search}%");
            });
        }
        
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('department', $request->filter)
                  ->orWhere('classified_as', $request->filter)
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
        return Inertia::render('Admin/Documents', ['student'=>$student,  
        'filters' => $request->only(['search', 'filter', 'per_page'])]);
    }

    public function updateDocuments(Request $request) {
        $documents = Documents::where('student_info_id', $request->student_info_id)->firstOrFail();
        $documents->update([
            'form_138A' => $request->form_138A,
            'form_137'  => $request->form_137,
            'good_moral'  => $request->good_moral,
            'psa'  => $request->psa,
            'pic_2x2'  => $request->pic_2x2,
            'ctc_transferee'  => $request->ctc_transferee,
            'grade_transferee'  => $request->grade_transferee,
            'f137_transferee'  => $request->f137_transferee,
            'status' => $request->doc_status
        ]);
    }

    public function destroyStudent($id) {
        Student_Info::findOrFail($id)->delete();
    }

    public function destroyDocuments($id) {
        Documents::findOrFail($id)->delete();
    }
}
