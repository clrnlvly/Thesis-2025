<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SectionRequest;
use App\Models\Programs;
use App\Models\Schedule;
use App\Models\Section;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SectionController extends Controller
{
    //
    public function index(Request $request)
    {
        $sectionQuery = Section::with('schedule');
        $program = Programs::with('subjects')->get();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $sectionQuery->where(function($query) use ($searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('semester', 'like', "%{$searchTerm}%")
                    ->orWhere('program_code', 'like', "%{$searchTerm}%")
                    ->orWhere('year_level', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->has('filter') && $request->filter !== 'All') {
            $sectionQuery->where(function($query) use ($request) {
                $query->where('semester', $request->filter)
                    ->orWhere('year_level', $request->filter);
            });
        }

        $section = $sectionQuery->get();

        return Inertia::render('Admin/Section', [
            'program' => $program,
            'section' => $section,
            'filters' => $request->only(['search', 'filter'])
        ]);
    }

    public function store(SectionRequest $request) {
        Log::info($request);
        Section::create([
            'name' => $request->name,
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'semester' => $request->semester,
        ]);
    }

    public function storeSchedule(Request $request) {
        $scheduleData = [
            'section_name' => $request->section_name,
            'subject_code' => $request->subject_code,
            'prof_name' => $request->prof_name,
        ];
    
        if ($request->monday_start && $request->monday_end) {
            $scheduleData['monday'] = $request->monday_start . ' - ' . $request->monday_end;
        }
    
        if ($request->tuesday_start && $request->tuesday_end) {
            $scheduleData['tuesday'] = $request->tuesday_start . ' - ' . $request->tuesday_end;
        }
    
        if ($request->wednesday_start && $request->wednesday_end) {
            $scheduleData['wednesday'] = $request->wednesday_start . ' - ' . $request->wednesday_end;
        }
    
        if ($request->thursday_start && $request->thursday_end) {
            $scheduleData['thursday'] = $request->thursday_start . ' - ' . $request->thursday_end;
        }
    
        if ($request->friday_start && $request->friday_end) {
            $scheduleData['friday'] = $request->friday_start . ' - ' . $request->friday_end;
        }
    
        if ($request->saturday_start && $request->saturday_end) {
            $scheduleData['saturday'] = $request->saturday_start . ' - ' . $request->saturday_end;
        }
    
        Schedule::create($scheduleData);
    }

    public function updateSection(Request $request) {

        $items = Section::where('id', $request->id)->first();
        $items->update([
            'name'=>$request->name,
            'program_code' => $request->program_code,
            'semester' => $request->semester,
            'year_level' => $request->year_level,
           
        ]);
    }

    public function editSchedule(Request $request, $id) {
        
        $schedule = Schedule::findOrFail($id);
    
        $scheduleData = [
            'prof_name' => $request->prof_name,
        ];
    
        if ($request->monday_start && $request->monday_end) {
            $scheduleData['monday'] = $request->monday_start . ' - ' . $request->monday_end;
        } else {
            $scheduleData['monday'] = null; 
        }
    
        if ($request->tuesday_start && $request->tuesday_end) {
            $scheduleData['tuesday'] = $request->tuesday_start . ' - ' . $request->tuesday_end;
        } else {
            $scheduleData['tuesday'] = null;
        }
    
        if ($request->wednesday_start && $request->wednesday_end) {
            $scheduleData['wednesday'] = $request->wednesday_start . ' - ' . $request->wednesday_end;
        } else {
            $scheduleData['wednesday'] = null;
        }
    
        if ($request->thursday_start && $request->thursday_end) {
            $scheduleData['thursday'] = $request->thursday_start . ' - ' . $request->thursday_end;
        } else {
            $scheduleData['thursday'] = null;
        }
    
        if ($request->friday_start && $request->friday_end) {
            $scheduleData['friday'] = $request->friday_start . ' - ' . $request->friday_end;
        } else {
            $scheduleData['friday'] = null;
        }
    
        if ($request->saturday_start && $request->saturday_end) {
            $scheduleData['saturday'] = $request->saturday_start . ' - ' . $request->saturday_end;
        } else {
            $scheduleData['saturday'] = null;
        }
    
        $schedule->update($scheduleData);
    }

    public function destroy($id) {
        Section::findOrFail($id)->delete();
    }
    
}
