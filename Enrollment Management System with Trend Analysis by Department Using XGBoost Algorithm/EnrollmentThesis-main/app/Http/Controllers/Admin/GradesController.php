<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DisplaySetting;
use App\Models\GradeEditRequest;
use App\Models\Grades;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GradesController extends Controller
{
    public function index() {
        return Inertia::render("Admin/Excel/GradesExcel");
    }

    public function changeGradeProf()
    {
        $gradeRequests = GradeEditRequest::where('requested_by', auth()->id())->get();
    
        return Inertia::render('Professor/ChangeGradeRequest', [
            'gradeRequests' => $gradeRequests,
        ]);
    }
    

    public function changeGradeAdmin() {
        $requests = GradeEditRequest::with([
            'grade.studentInfo.personalInfo',
        ])->get();
    
        $mappedRequests = $requests->map(function ($request) {
            $studentInfo = $request->grade->studentInfo ?? null;
            $personalInfo = $studentInfo->personalInfo ?? null;
    
            $requestedByUser = \App\Models\User::find($request->requested_by);
    
            return [
                'id' => $request->id,
                'grade_id' => $request->grade_id,
                'requested_by' => $requestedByUser ? $requestedByUser->name : 'Unknown',
                'current_grade' => $request->grade->grade,
                'new_grade' => $request->new_grade,
                'reason' => $request->reason,
                'status' => $request->status,
                'student_name' => $personalInfo ? $personalInfo->first_name . ' ' . $personalInfo->last_name : 'Unknown',
                'program' => $studentInfo->program ?? 'N/A',
                'semester' => $request->grade->semester,
                'student_id' => $studentInfo->student_id ?? 'Unknown', 
                'year_level' => $studentInfo->year_level ?? 'N/A',
            ];
        });
    
        return Inertia::render("Admin/Grades/GradeChangeRequest", [
            'grades' => $mappedRequests,
        ]);
    }
    
  
    public function submittedGradeProfessor()
    {
        $userId = auth()->id();

        $grades = Grades::where('sender_id', $userId)
                    ->with(['studentInfo', 'studentInfo.personalInfo','gradeEditRequests' => function ($query) use ($userId) {
                    $query->where('requested_by', $userId)->latest();
                }])
                    ->get();

        $requestedGradeIds = GradeEditRequest::where('requested_by', $userId)
                                            ->pluck('grade_id')
                                            ->toArray();

        $mappedGrades = $grades->map(function ($grade) use ($requestedGradeIds) {
            $studentInfo = $grade->studentInfo;
            $personalInfo = $studentInfo ? $studentInfo->personalInfo : null;

            $latestEditRequest = $grade->gradeEditRequests && $grade->gradeEditRequests->count()
            ? $grade->gradeEditRequests->first()
            : null;

            return [
                'id' => $grade->id,
                'student_id' => $grade->student_info_id,
                'student_name' => $personalInfo ? $personalInfo->first_name . ' ' . $personalInfo->last_name : 'Unknown',
                'year_level' => $studentInfo ? $studentInfo->year_level : 'N/A',
                'program' => $studentInfo ? $studentInfo->program : 'N/A',
                'semester' => $grade->semester,
                'subject' => $grade->subject,
                'grade' => $grade->grade,
                'status' => $grade->status,
                'has_requested' => in_array($grade->id, $requestedGradeIds),
                'edit_status' => $latestEditRequest ? $latestEditRequest->status : null, 
            ];
        });

        return Inertia::render('Professor/SubmittedGrade', [
            'grades' => $mappedGrades,
        ]);
    }
    
    public function submittedGradeAdmin()
    {
        $grades = Grades::with([
            'studentInfo',
            'studentInfo.personalInfo'
        ])->get();

        $mappedGrades = $grades->map(function ($grade) {
            $studentInfo = $grade->studentInfo;
            $personalInfo = $studentInfo ? $studentInfo->personalInfo : null;

            return [
                'id' => $grade->id,
                'sender_id' => $grade->sender_id,
                'student_id' => $grade->student_info_id,
                'student_name' => $personalInfo
                    ? $personalInfo->first_name . ' ' . $personalInfo->last_name
                    : 'Unknown',
                'year_level' => $grade->year_level,
                'program' => $studentInfo ? $studentInfo->program : 'N/A',
                'semester' => $grade->semester,
                'subject' => $grade->subject,
                'grade' => $grade->grade,
                'status' => $grade->status,
            ];
        });

        $settings = DisplaySetting::first();

        return Inertia::render('Admin/Grades/SubmittedGrade', [
            'grades' => $mappedGrades,
            'gradeSidebarEnabled' => $settings?->grade_sidebar ?? false,
        ]);
    }


    public function storeFromExcel(Request $request)
    {
        $grades = $request->input('grades');
        $duplicates = [];
        $saved = [];
        $successCount = 0;

        DB::beginTransaction();

        try {
            foreach ($grades as $grade) {

                $student = Student_Info::where('student_id', $grade['student_info_id'])->first();

                if (!$student) {
                    $duplicates[] = [
                        'student_info_id' => $grade['student_info_id'],
                        'error' => 'Student ID not found in the database.',
                    ];
                    continue;
                }

                $existingGrade = Grades::where('student_info_id', $student->student_id)
                    ->where('subject', $grade['subject'])
                    ->first();

                if ($existingGrade) {
                    $duplicates[] = [
                        'student_info_id' => $grade['student_info_id'],
                        'subject' => $grade['subject'],
                        'error' => 'Grade for this subject already exists for this student.',
                    ];
                    continue;
                }

                Grades::create([
                    'sender_id' => auth()->id(), 
                    'student_info_id' => $student->student_id,
                    'semester' => $grade['semester'],
                    'year_level' => $grade['year_level'],
                    'subject' => $grade['subject'],
                    'grade' => $grade['grade'],
                    'status' => $grade['status'],
                ]);

                $saved[] = [
                    'student_info_id' => $grade['student_info_id'],
                    'subject' => $grade['subject'],
                ];

                $successCount++;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => $duplicates
                    ? 'Some grades were skipped due to validation errors or duplicates.'
                    : 'All grades uploaded successfully.',
                'success_count' => $successCount,
                'duplicates' => $duplicates,
                'saved' => $saved,
            ], $duplicates ? 207 : 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong during upload.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function editRequest(Request $request)
    {
        $request->validate([
            'grade_id' => 'required|exists:grades,id',
            'reason' => 'required|string',
            'new_grade' => 'required|string|max:10',
        ]);
    
        GradeEditRequest::create([
            'grade_id' => $request->grade_id,
            'reason' => $request->reason,
            'new_grade' => $request->new_grade,
            'status' => 'Pending',
            'requested_by' => auth()->id(),
        ]);
    
        return back()->with('success', 'Edit request submitted!');
    }
    

    public function updateGradeStatus(Request $request, $gradeId)
    {
        $request->validate([
            'status' => 'required|string|in:Pending,Approved,Rejected',
        ]);

        $gradeEditRequest = GradeEditRequest::findOrFail($gradeId);

        $gradeEditRequest->status = $request->status;
        $gradeEditRequest->save();

        if ($request->status === 'Approved') {
            $grade = $gradeEditRequest->grade;

            if ($grade) {
                $grade->grade = $gradeEditRequest->new_grade;
                $grade->save();
            }
        }

        return redirect()->back()->with('success', 'Grade edit request processed successfully.');
    }

    public function deleteGrades($id)
    {
        $grade = Grades::find($id);

        $grade->delete();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_info_id' => 'required|exists:student_info,student_id',
            'semester' => 'required|string|in:1st Semester,2nd Semester',
            'year_level' => 'required|string',
            'subject' => 'required|string',
            'grade' => 'required|numeric|min:0|max:100',
            'status' => 'required|string|in:Passed,Failed',
        ]);

        $validated['sender_id'] = Auth::id();

        $grade = Grades::create($validated);

        return back()->with('success', 'Grade created successfully.');
    }

    public function update(Request $request, Grades $grade)
    {
        $validated = $request->validate([
            'sender_id' => 'required|exists:users,id',
            'student_info_id' => 'required|exists:student_info,student_id',
            'semester' => 'required|string',
            'year_level' => 'required|string',
            'subject' => 'required|string',
            'grade' => 'required|numeric|min:0|max:100',
            'status' => 'nullable|string|in:Passed,Failed',
        ]);

        $grade->update($validated);

        return back()->with('success', 'Grade updated successfully.');
    }
   
}