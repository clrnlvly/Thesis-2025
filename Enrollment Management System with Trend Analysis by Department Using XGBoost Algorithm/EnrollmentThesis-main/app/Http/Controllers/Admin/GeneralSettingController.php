<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AcademicYearRequest;
use App\Models\Academic_Year;
use App\Models\Campus;
use App\Models\FAQ;
use App\Models\Users_IDFormat;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class GeneralSettingController extends Controller
{
    //
    public function index() {
        $acedemic_year = Academic_Year::all();
        $faq = FAQ::all();
        $campus = Campus::all();
        $id_format = Users_IDFormat::all();
        return Inertia::render("Admin/General", ['faq'=>$faq, 'acedemic_year'  => $acedemic_year, 'campus' => $campus, 'id_format'=>$id_format]);
    }

    public function academicYear() {
        return Inertia::render("Admin/General/AcademicYear");
    }

    public function academicYearStore(AcademicYearRequest $request) {

        $startYear = Carbon::parse($request->start)->year;
        $endYear = Carbon::parse($request->end)->year;

        $existingStartYear = Academic_Year::whereYear('start', $startYear)->exists();
        $existingEndYear = Academic_Year::whereYear('end', $endYear)->exists();

        if ($existingStartYear || $existingEndYear) {
            return redirect()->route('admin.setting.general')
                ->withErrors([
                    'start' => $existingStartYear ? 'The academic start year for ' . $startYear . ' already exists.' : '',
                    'end' => $existingEndYear ? 'The academic end year for ' . $endYear . ' already exists.' : ''
                ]);
        }
       
        Academic_Year::create([
            'start'=>$request->start,
            'end'=>$request->end,
            'status'=>$request->status,
        ]);
    }

    public function faqStore(Request $request) {
        FAQ::create([
         'question'=>$request->question,
         'answer'=>$request->answer,
        ]);
     }

     public function campusStore(Request $request) {
        Campus::create([
         'name'=>$request->name,
         'location'=>$request->location,
         'url'=>$request->url,
        ]);
     }

     public function idFormatStore(Request $request) {
        $validatedData = $request->validate([
            'prefix' => ['required'],
            'separator' => ['required'],
            'auto_inc' => ['required'],
            'user_type' => ['required'],
        ]);
       
       $id_format = $validatedData['prefix'] . $validatedData['separator'] . $validatedData['auto_inc'];

       Users_IDFormat::create([
           'user_type' => $validatedData['user_type'],
           'id_format' => $id_format,
       ]);
     }
 
    public function academicYearEdit(Request $request) {
        $year = Academic_Year::findOrFail($request->id);
        $year->update([
            'start'=>$request->start,
            'end'=>$request->end,
            'status'=>$request->status,
        ]);
    }

    public function faqEdit(Request $request) {
        $faq = FAQ::findOrFail($request->id);
        $faq->update([
            'question'=>$request->question,
            'answer'=>$request->answer
        ]);
    }

    public function campusEdit(Request $request) {
        $campus = Campus::findOrFail($request->id);
        $campus->update([
            'name'=>$request->name,
            'location'=>$request->location,
            'url'=>$request->url
        ]);
    }

    public function idFormatEdit(Request $request) {
        $format = Users_IDFormat::findOrFail($request->id);
        $format->update([
            'user_type'=>$request->user_type,
            'id_format'=>$request->prefix.$request->separator.$request->auto_inc,
        ]);
    }

    public function academicYearDestroy($id) {
        Academic_Year::findOrFail($id)->delete();
    }

    public function faqDestroy($id) {
        FAQ::findOrFail($id)->delete();
    }

    public function campusDestroy($id) {
        Campus::findOrFail($id)->delete();
    }

    public function idFormatDestroy($id) {
        Users_IDFormat::findOrFail($id)->delete();
    }

}
