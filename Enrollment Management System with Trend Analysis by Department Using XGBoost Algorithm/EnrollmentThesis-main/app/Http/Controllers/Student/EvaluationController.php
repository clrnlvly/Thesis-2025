<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Academic_Year;
use App\Models\Evaluation;
use App\Models\Student_Info;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    //

    public function index() {
        return Inertia::render('Dashboard/Student/Evaluation');
    }

    public function indexAdmin(Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);
    
        $query = Evaluation::with(['studentInfo.personalInfo']);
    
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->whereHas('studentInfo.personalInfo', function($subQuery) use ($searchTerm) {
                    $subQuery->where('first_name', 'like', "%{$searchTerm}%")
                             ->orWhere('last_name', 'like', "%{$searchTerm}%");
                })
                ->orWhere('student_info_id', 'like', "%{$searchTerm}%");
            });
        }
        
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('clearance', $request->filter)
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
    
        $evaluations = $query->paginate($perPage);

        $transformed = $evaluations->getCollection()->map(function($eval) {
            return [
                'id' => $eval->id,
                'student_info_id' => $eval->student_info_id,
                'student_name' => $eval->studentInfo && $eval->studentInfo->personalInfo 
                    ? $eval->studentInfo->personalInfo->first_name . ' ' . $eval->studentInfo->personalInfo->last_name
                    : 'N/A',
                'semester' => $eval->semester,
                'year_level' => $eval->year_level,
                'clearance' => $eval->clearance,
                'grades_eval' => $eval->grades_eval,
                'documents' => $eval->documents,
                'payment' => $eval->payment,
                'created_at' => $eval->created_at->format('Y-m-d H:i:s'),
            ];
        });
    
        return Inertia::render('Admin/Evaluation', [
            'evaluation' => new LengthAwarePaginator(
                $transformed,
                $evaluations->total(),
                $evaluations->perPage(),
                $evaluations->currentPage(),
                [
                    'path' => Paginator::resolveCurrentPath(),
                    'pageName' => 'page',
                ]
            ),
            'filters' => $request->only(['search', 'filter', 'per_page']),
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'student_info_id' => 'required|string|max:50',
                'clearance' => 'required|string',
                'grades_eval' => 'required|string',
                'documents' => 'required|string',
                'payment' => 'required|string',
                'semester' => 'sometimes|string',
                'year_level' => 'sometimes|string',
            ]);

            Log::info('Evaluation request received:', $validated);

            $student = Student_Info::where('student_id', $validated['student_info_id'])->first();

            if (!$student) {
                Log::error('Student not found with ID: ' . $validated['student_info_id']);
                return back()->with('error', 'Student not found with ID: ' . $validated['student_info_id']);
            }

            if (!isset($validated['semester'])) {
                $validated['semester'] = $student->semester;
            }
            if (!isset($validated['year_level'])) {
                $validated['year_level'] = $student->year_level;
            }

            Log::info('Final evaluation data to save:', $validated);

            Evaluation::updateOrCreate(
                ['student_info_id' => $validated['student_info_id']],
                $validated
            );

            return back()->with('success', 'Evaluation saved successfully');

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error: ' . $e->getMessage());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('Error saving evaluation: ' . $e->getMessage());
            return back()->with('error', 'Server error: ' . $e->getMessage());
        }
    }

    public function show($student_id)
    {
        try {
            $evaluation = Evaluation::where('student_info_id', $student_id)->first();

            if (!$evaluation) {
                return back()->with('error', 'Evaluation not found');
            }

            return view('evaluation.show', compact('evaluation'));

        } catch (\Exception $e) {
            return back()->with('error', 'Server error');
        }
    }
}
