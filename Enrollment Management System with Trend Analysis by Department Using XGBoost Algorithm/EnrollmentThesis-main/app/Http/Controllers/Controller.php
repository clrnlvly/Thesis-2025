<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Session;

// abstract class Controller
// {
//     public function __construct(Request $request)
//     {
//         // If there's an academic_year_id in the query params, store it in the session
//         if ($request->has('academic_year_id')) {
//             Session::put('selected_year', $request->query('academic_year_id'));
//         }

//         // Merge the query params with the academic_year_id from session if not present in the request
//         $request->merge([
//             'academic_year_id' => $request->query('academic_year_id') ?? session('selected_year')
//         ]);
//     }
//}

namespace App\Http\Controllers;

use App\Models\Academic_Year;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class Controller
{
    public function __construct(Request $request)
    {
        // Only set the session to the latest academic year if none exists
        if (!Session::has('selected_year')) {
            $latestAcademicYear = Academic_Year::orderBy('id', 'desc')->first();

            if ($latestAcademicYear) {
                Session::put('selected_year', $latestAcademicYear->id);
            } else {
                Session::forget('selected_year'); // 🧹 optional cleanup
            }
        }

        // Set academic_year_id in request if not already present
        $request->merge([
            'academic_year_id' => $request->query('academic_year_id') ?? session('selected_year')
        ]);
    }
}


