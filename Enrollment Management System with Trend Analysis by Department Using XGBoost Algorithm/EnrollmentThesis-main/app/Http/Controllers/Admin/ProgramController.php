<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProgramRequest;
use App\Models\AuditTrailCurriculum;
use App\Models\Programs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = Programs::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('code', 'like', "%{$request->search}%")
                ->orWhere('name', 'like', "%{$request->search}%");
            });
        }
        
        // Filter
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('department', $request->filter)
                  ->orWhere('campus', $request->filter)
                  ->orWhere('duration', $request->filter)
                  ->orWhere('status', $request->filter);
            });
        }

        $program = $query->paginate($perPage);
        return Inertia::render('Admin/Program', ['program'=>$program,  
                        'filters' => $request->only(['search', 'filter', 'per_page']), 
                       ]);
    }

    public function store(ProgramRequest $request) {
        DB::beginTransaction();
    
        try {
            Programs::create([
                'code' => $request->code,
                'name' => $request->name,
                'status' => $request->status,
                'campus' => $request->campus,
                'duration' => $request->duration,
                'department' => $request->department,
            ]);
    
            AuditTrailCurriculum::create([
                'description' => $request->code . " has been created",
                'user' => auth()->id(),
            ]);
    
            DB::commit();
    
        } catch (\Exception $e) {
            DB::rollBack();
            
        }
    }
    
    public function storeFromExcel(Request $request)
    {
        $programs = $request->input('programs');
        $duplicates = [];
        $successCount = 0;
    
        DB::beginTransaction();
        try {
            foreach ($programs as $program) {
    
                $existingProgram = Programs::where('code', $program['code'])->first();
                if ($existingProgram) {
                    $duplicates[] = [
                        'code' => $program['code'],
                        'name' => $program['name'],
                        'error' => 'Duplicate program code',
                    ];
                    continue;
                }
    
                Programs::create([
                    'code' => $program['code'],
                    'name' => $program['name'],
                    'status' => $program['status'] ?? 'Active',
                    'campus' => $program['campus'],
                    'duration' => $program['duration'],
                    'department' => $program['department'],
                ]);

                AuditTrailCurriculum::create([
                    'description' => $program['code'] . " has been created",
                    'user' => auth()->id(),
                ]);
    
                $successCount++;
            }
    
            DB::commit();
    
            return response()->json([
                'success' => true,
                'message' => $duplicates
                    ? 'Some programs were skipped due to missing prerequisites or duplicates'
                    : 'All programs uploaded successfully',
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
    
    public function edit(ProgramRequest $request) {
        DB::beginTransaction();
        try {
            $items = Programs::where('id', $request->id)->first();
            $items->update([
                'code'=>$request->code,
                'name'=>$request->name,
                'status' => $request->status,
                'campus' => $request->campus,
                'duration' => $request->duration,
                'department' => $request->department,
            ]);

            AuditTrailCurriculum::create([
                'description' => $request->code . " has been updated",
                'user' => auth()->id(),
            ]);
    
            DB::commit();
    
        } catch (\Exception $e) {
            DB::rollBack();
        }

      
    }

    public function destroy($id) {
        $program = Programs::findOrFail($id);
    
        AuditTrailCurriculum::create([
            'description' => $program->code . " has been deleted",
            'user' => auth()->id(),
        ]);
    
        $program->delete();
    }
    
}
