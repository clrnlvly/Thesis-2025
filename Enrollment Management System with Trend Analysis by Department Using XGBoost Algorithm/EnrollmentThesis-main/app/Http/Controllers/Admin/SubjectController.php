<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubjectRequest;
use App\Models\Programs;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request) {
    
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);
        $query = Subjects::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('program_code', 'like', "%{$request->search}%")
                ->orWhere('code', 'like', "%{$request->search}%")
                ->orWhere('name', 'like', "%{$request->search}%");
            });
        }
        
        // Filter
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('department', $request->filter)
                  ->orWhere('category', $request->filter)
                  ->orWhere('period', $request->filter);
            });
        }

        $subject = $query->paginate($perPage);
        $program = Programs::all();

        return Inertia::render('Admin/Subject', ['subject'=>$subject,'program'=>$program,  
                        'filters' => $request->only(['search', 'filter', 'per_page']), 
                       ]);
    }


    public function store(Request $request) {
        Log::info($request->all());
        // DB::beginTransaction();
        // try {
            foreach ($request->sub as $subject) {
                $programCode = $subject['program_code'];
                $program = Programs::where('code', $programCode)->first();
                $program_code = $program->code;
                Subjects::create([
                    'program_code' => $program_code,
                    'code' => $subject['code'],
                    'name' => $subject['name'],
                    'prerequisites'  => $subject['prerequisites'],
                    'period'  => $subject['period'],
                    'department' => $subject['department'],
                    'year_level'  => $subject['year_level'],
                    'category'  => $subject['category'],
                    'lec'  => $subject['lec'],
                    'lab'  => $subject['lab'],
                    'unit'  => $subject['unit'],
                    'total'  => $subject['total'],
                ]);
                // DB::commit();
            }
           
        // } catch (\Exception $e) {
            // DB::rollBack();
            return redirect()->back()->with('error', 'An error occurred while saving subjects.');
        // }
    }

//     public function storeFromExcel(Request $request)
// {
//     $request->validate([
//         'subjects' => 'required|array',
//         'subjects.*.department' => 'required|string',
//         'subjects.*.program_code' => 'required|string',
//         'subjects.*.year_level' => 'required|string',
//         'subjects.*.period' => 'required|string',
//         'subjects.*.category' => 'required|string',
//         'subjects.*.name' => 'required|string',
//         'subjects.*.code' => 'required|string',
//         'subjects.*.prerequisites' => 'required|string',
//         'subjects.*.lec' => 'required|numeric',
//         'subjects.*.lab' => 'required|numeric',
//         'subjects.*.unit' => 'required|numeric',
//     ]);

//     $subjects = $request->input('subjects');
//     $duplicates = [];
//     $successCount = 0;

//     DB::beginTransaction();
//     try {
//         foreach ($subjects as $subject) {
//             // Check for existing subject in database
//             $existingSubject = Subjects::where('code', $subject['code'])
//                                     ->orWhere('name', $subject['name'])
//                                     ->first();

//             if ($existingSubject) {
//                 $duplicates[] = [
//                     'code' => $subject['code'],
//                     'name' => $subject['name'],
//                     'existing' => $existingSubject->only(['code', 'name', 'program_code'])
//                 ];
//                 continue;
//             }

//             // Create new subject
//             Subjects::create([
//                 'department' => $subject['department'],
//                 'program_code' => $subject['program_code'],
//                 'year_level' => $subject['year_level'],
//                 'period' => $subject['period'],
//                 'category' => $subject['category'],
//                 'name' => $subject['name'],
//                 'code' => $subject['code'],
//                 'prerequisites' => $subject['prerequisites'],
//                 'lec' => $subject['lec'],
//                 'lab' => $subject['lab'],
//                 'unit' => $subject['unit'],
//                 'total' => $subject['lec'] + $subject['lab']
//             ]);

//             $successCount++;
//         }

//         DB::commit();

//         return response()->json([
//             'success' => true,
//             'message' => $duplicates ? 'Some subjects were skipped due to duplicates' : 'All subjects uploaded successfully',
//             'success_count' => $successCount,
//             'duplicates' => $duplicates
//         ], $duplicates ? 207 : 200);

//     } catch (\Exception $e) {
//         DB::rollBack();
//         return response()->json([
//             'success' => false,
//             'error' => 'Database error',
//             'message' => $e->getMessage()
//         ], 500);
//     }
// }

    // Controller method to store the data

    // public function storeFromExcel(Request $request)
    // {
    //     // Extract the subjects from the request
    //     $subjects = $request->input('sub');
    
    //     foreach ($subjects as $subject) {
    //         // Find the program code by matching the program name from the excel data
    //         $program = Programs::where('name', $subject['program_name'])->first();
    
    //         if ($program) {
    //             // If the program exists, use the program code
    //             $programCode = $program->code;
    //         } else {
    //             // If the program does not exist, skip this row or handle the error
    //             // You could also log it or return an error if necessary
    //             continue;
    //         }
    
    //         // Create the subject record using the program code
    //         Subjects::create([
    //             'program_code' => $programCode,
    //             'category' => $subject['category'],
    //             'department' => $subject['department'],
    //             'year_level' => $subject['year_level'],
    //             'period' => $subject['period'],
    //             'name' => $subject['name'],
    //             'code' => $subject['code'],
    //             'prerequisites' => $subject['prerequisites'],
    //             'lec' => $subject['lec'],
    //             'lab' => $subject['lab'],
    //             'unit' => $subject['unit'],
    //         ]);
    //     }
    
    //     // Return a success message
    //     return redirect()->back()->with('message', 'Subjects have been successfully uploaded.');
    // }

    public function storeFromExcel(Request $request)
{
    Log::info($request->all());

    $subjects = $request->input('subjects');
    $duplicates = [];
    $successCount = 0;

    DB::beginTransaction();
    try {
        foreach ($subjects as $subject) {
            Log::info('Processing subject: ', $subject);

            // Lookup program by name
            $program = Programs::where('name', $subject['program_code'])->first();
            if (!$program) {
                $duplicates[] = [
                    'program_name' => $subject['program_code'],
                    'error' => 'Program not found in database',
                    'subject_code' => $subject['code'],
                ];
                continue;
            }

            $programCode = $program->code;

            // Handle prerequisites
            $prereqCode = null;
            if (!empty($subject['prerequisites']) && strtolower(trim($subject['prerequisites'])) !== 'none') {
                $prerequisiteSubject = Subjects::where('name', $subject['prerequisites'])->first();

                if ($prerequisiteSubject) {
                    $prereqCode = $prerequisiteSubject->code;
                } else {
                    $duplicates[] = [
                        'code' => $subject['code'],
                        'name' => $subject['name'],
                        'error' => "Prerequisite subject '{$subject['prerequisites']}' not found",
                    ];
                    continue;
                }
            }

            // Check for duplicate subject code
            $existingSubject = Subjects::where('code', $subject['code'])->first();
            if ($existingSubject) {
                $duplicates[] = [
                    'code' => $subject['code'],
                    'name' => $subject['name'],
                    'error' => 'Duplicate subject code',
                ];
                continue;
            }

            // Save subject
            Subjects::create([
                'program_code' => $programCode,
                'category' => $subject['category'],
                'department' => $subject['department'],
                'year_level' => $subject['year_level'],
                'period' => $subject['period'],
                'name' => $subject['name'],
                'code' => $subject['code'],
                'prerequisites' => $prereqCode, // now using code of subject
                'lec' => $subject['lec'],
                'lab' => $subject['lab'],
                'unit' => $subject['unit'],
            ]);

            $successCount++;
        }

        DB::commit();

        return response()->json([
            'success' => true,
            'message' => $duplicates
                ? 'Some subjects were skipped due to missing programs, prerequisites, or duplicates'
                : 'All subjects uploaded successfully',
            'success_count' => $successCount,
            'duplicates' => $duplicates,
        ], $duplicates ? 207 : 200);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'success' => false,
            'error' => 'Database error',
            'message' => $e->getMessage()
        ], 500);
    }
}


    public function edit(SubjectRequest $request) {

        $items = Subjects::where('id', $request->id)->first();
        $items->update([
                    'program_code' => $request->program_code,
                    'code' => $request->code,
                    'name' => $request->name,
                    'prerequisites'  => $request->prerequisites,
                    'period'  => $request->period,
                    'department' => $request->department,
                    'year_level'  => $request->year_level,
                    'category'  => $request->category,
                    'lec'  => $request->lec,
                    'lab'  => $request->lab,
                    'unit'  => $request->unit,
                    'total'  => $request->total,
        ]);
    }

    public function destroy($id) {
        Subjects::findOrFail($id)->delete();
    }
    
}
