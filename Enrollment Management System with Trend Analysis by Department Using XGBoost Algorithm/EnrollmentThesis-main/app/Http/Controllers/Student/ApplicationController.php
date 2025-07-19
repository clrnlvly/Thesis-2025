<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\ApplicationRequest;
use App\Models\Academic_Year;
use App\Models\Guardian;
use App\Models\Personal_Info;
use App\Models\Programs;
use App\Models\SchoolYear;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{

    public function index() {
        $program = Programs::all();
        $academic_year = Academic_Year::all();
        return Inertia::render('Public/Section/Application', 
        ['program'=>$program,'academic_year'=>$academic_year] 
    );
    }

    public function create(ApplicationRequest $request) {
        // Validate the incoming request data
      
        DB::beginTransaction();
        try {

        $User = new User();
        $User->name = $request->first_name . ' ' . $request->last_name;
        $User->email = $request->email;
        // $randomPassword = Str::password(12);
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

         return redirect()->route('200');

        } catch(\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }        
    }
}
