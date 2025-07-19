<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    //
    public function admissionGuide() {
        return Inertia::render('Public/Section/AdmissionGuide');
    }

    public function FAQ() {
        $FAQ = FAQ::all();
        return Inertia::render('Public/Section/FAQ', ['FAQ'=>$FAQ]);
    }

    public function shs() {
        return Inertia::render('Public/Section/SHS');
    }

    public function college() {
        return Inertia::render('Public/Section/College');
    }

    public function requirements() {
        return Inertia::render('Public/Section/Requirements');
    }

    public function tuitionDetails() {
        return Inertia::render('Public/Section/TuitionFeeDetails');
    }
}
