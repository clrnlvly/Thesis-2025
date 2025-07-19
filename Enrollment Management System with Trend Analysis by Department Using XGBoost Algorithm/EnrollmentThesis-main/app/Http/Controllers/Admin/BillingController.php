<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BillingTypeRequest;
use App\Http\Requests\SHSBillingRequest;
use App\Models\Billing_Type;
use App\Models\College_Billing;
use App\Models\Other_Billing;
use App\Models\Programs;
use App\Models\SHS_Billing;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index(Request $request)
{
   
    $programs = Programs::query()
        ->when($request->has('search') && !empty($request->input('search')), function($query) use ($request) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('code', 'like', "%$search%")
                  ->orWhere('name', 'like', "%$search%");
            });
        })
        ->get();

    $subjects = Subjects::query()
        ->when($request->has('search') && !empty($request->input('search')), function($query) use ($request) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('code', 'like', "%$search%")
                  ->orWhere('name', 'like', "%$search%");
            });
        })
        ->get();


    $shsFee = SHS_Billing::query()
        ->when($request->has('search') && !empty($request->input('search')), function($query) use ($request) {
            $search = $request->input('search');
            $query->where('payment_type', 'like', "%$search%");
        })
        ->get();

    $collegeFee = College_Billing::query()
        ->when($request->has('search') && !empty($request->input('search')), function($query) use ($request) {
            $search = $request->input('search');
            $query->where('payment_type', 'like', "%$search%");
        })
        ->get();

    $otherFee = Other_Billing::query()
        ->when($request->has('search') && !empty($request->input('search')), function($query) use ($request) {
            $search = $request->input('search');
            $query->where('name', 'like', "%$search%")
                  ->orWhere('payment_type', 'like', "%$search%");
        })
        ->get();

    return Inertia::render("Admin/BillingSetup", [
        'program' => $programs,
        'subject' => $subjects,
        'shs_fee' => $shsFee,
        'college_fee' => $collegeFee,
        'other_fee' => $otherFee,
        'filters' => $request->only(['search']) // Pass search filter to frontend
    ]);
}

    public function SHSBilling() {
        $shs_fee = SHS_Billing::all();
        return Inertia::render("Admin/BillingSetup/SHSBilling", ['shs_fee' => $shs_fee]);
    }

    public function storeSHSBilling(SHSBillingRequest $request) {
        SHS_Billing::create([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'total_amount' => $request->total_amount
        ]);
    }

    public function storeCollegeBilling(Request $request) {
            College_Billing::create([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'no_unit' => $request->no_unit,
            'per_unit' => $request->per_unit,
            'total_amount' => $request->total_amount
        ]);
    }

    public function storeOtherBilling(Request $request) {
            foreach ($request->fees as $other_Billing) {
                Other_Billing::create([
                    'payment_type'=> $other_Billing['other_billing_payment_type'],
                    'name'=> $other_Billing['other_billing_name'],
                    'amount'=> $other_Billing['amount'],
                    'description'=> $other_Billing['description'],
                    ]);
            }
    }

    public function editSHSFee(Request $request) {

        $items = SHS_Billing::where('id', $request->id)->first();
        $items->update([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'total_amount' => $request->total_amount
        ]);
    }

    public function editOtherFee(Request $request) {

        $items = Other_Billing::where('id', $request->id)->first();
        $items->update([
            'payment_type'=>$request->payment_type,
            'name'=>$request->name,
            'amount'=>$request->amount,
            'description' => $request->description,
        ]);
    }

    public function editCollegeFee(Request $request) {

        $items = College_Billing::where('id', $request->id)->first();
        $items->update([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'no_unit' =>$request->no_unit,
            'per_unit' =>$request->per_unit, 
            'total_amount' => $request->total_amount
        ]);
    }

    public function destroySHSFee($id) {
        SHS_Billing::findOrFail($id)->delete();
    }

    public function destroyCollegeFee($id) {
        College_Billing::findOrFail($id)->delete();
    }
    
    public function destroyOtherFee($id) {
        Other_Billing::findOrFail($id)->delete();
    }
}