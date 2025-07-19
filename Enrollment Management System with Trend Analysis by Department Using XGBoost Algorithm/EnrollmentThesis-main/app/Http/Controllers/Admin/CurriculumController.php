<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Programs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CurriculumController extends Controller
{
    //
    public function index(Request $request)
    {
        $programs = Programs::query()
            ->where('code', '!=', 'general')
            ->with(['subjects' => function($query) {
                $query->orderBy('year_level')
                    ->orderBy('period');
            }])
            ->when($request->has('search'), function($query) use ($request) {
                $search = $request->input('search');
                $query->where(function($q) use ($search) {
                    $q->where('code', 'like', "%$search%")
                    ->orWhere('name', 'like', "%$search%");
                });
            })
            ->get();

        return Inertia::render('Admin/Curriculum', [
            'program' => $programs->map(function($program) {
                return [
                    'id' => $program->id,
                    'code' => $program->code,
                    'name' => $program->name,
                    'department' => $program->department,
                    'subjects' => $program->subjects->map(function($subject) {
                        return [
                            'code' => $subject->code,
                            'name' => $subject->name,
                            'unit' => $subject->unit,
                            'year_level' => $subject->year_level,
                            'period' => $subject->period,
                        ];
                    })
                ];
            })
        ]);
    }
}
