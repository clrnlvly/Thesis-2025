<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\PaymentVerification;
use App\Models\Academic_Year;
use App\Models\Billing_Type;
use App\Models\College_Billing;
use App\Models\Other_Billing;
use App\Models\Payment_Details;
use App\Models\Payment_Verification;
use App\Models\Programs;
use App\Models\Student_Fees;
use App\Models\Student_Info;
use App\Models\Student_Subjects;
use App\Models\Subjects;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    // Student

    public function index() {
        $program = Programs::all();
        return Inertia::render("Public/Section/TuitionFee", ['program'=>$program]);
    }

    public function store(PaymentVerification $request)
{
    
    $user = User::where('email', $request->email)->first();

    if ($user) {
       
        $student = Student_Info::where('users_id', $user->id)->first();

        if ($student) {
           
            if ($student->status === 'pending' || $student->status === 'onhold' || $student->status === 'cancel') {
                return back()->withErrors([
                    'email' => 'This email is not associated with any student record.',
                ]);
            }

            if ($request->hasFile('payment_receipt')) {
                $path = $request->file('payment_receipt')->store('images');

                Payment_Verification::create([
                    'student_info_id' => $student->student_id,
                    'name' => $request->name,
                    'year_level' => $request->year_level,
                    'program' => $request->program,
                    'email' => $request->email,
                    'purpose' => $request->purpose,
                    'semester' => $request->semester,
                    'amount' => $request->amount,
                    'reference' => $request->reference,
                    'payment_receipt' => $path,
                    'status' => 'pending'
                ]);

                return Inertia::render('Success');
            }

        } else {
            return back()->withErrors([
                'email' => 'This email is not associated with any student record.',
            ]);
        }

    } else {
        return back()->withErrors([
            'email' => 'The provided email does not exist in our system.',
        ]);
    }
}

        // Admin

        public function paymentIndex(Request $request) 
        {
            $perPage = $request->input('per_page', session('rows_per_page', 10));
            session(['rows_per_page' => $perPage]);
        
            $query = Student_Fees::with(['studentInfo.personalInfo']);
        
            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search;
                $query->whereHas('studentInfo.personalInfo', function ($q) use ($searchTerm) {
                    $q->where('first_name', 'like', "%{$searchTerm}%")
                      ->orWhere('last_name', 'like', "%{$searchTerm}%")
                      ->orWhere('student_id', 'like', "%{$searchTerm}%");
                });
            }
        
            if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
                $query->where(function($q) use ($request) {
                    $q->where('semester', $request->filter)
                      ->orWhere('year_level', $request->filter)
                      ->orWhere('status', $request->filter);
                });
            }

            if ($request->filled('academic_year_id')) {
                $academic = Academic_Year::find($request->academic_year_id);
    
                if ($academic) {
                    $query->whereBetween('created_at', [$academic->start, $academic->end]);
                }
            }
        
            $payments = $query->paginate($perPage);
        
            $transformedPayments = $payments->getCollection()->map(function($payment) {
                return [
                    'id' => $payment->id,
                    'student_info_id' => $payment->student_info_id,
                    'student_name' => optional($payment->studentInfo->personalInfo)?->first_name . ' ' . optional($payment->studentInfo->personalInfo)?->last_name ?? 'N/A',
                    'year_level' => $payment->year_level,
                    'semester' => $payment->semester,
                    'status' => $payment->status,
                    'total_amount' => $payment->total_amount,
                    'amount_paid' => $payment->amount_paid,
                    'created_at' => $payment->created_at->format('Y-m-d H:i:s'),
                ];
            });
        
            return Inertia::render('Admin/PaymentList', [
                'payment' => new LengthAwarePaginator(
                    $transformedPayments,
                    $payments->total(),
                    $payments->perPage(),
                    $payments->currentPage(),
                    [
                        'path' => Paginator::resolveCurrentPath(),
                        'pageName' => 'page',
                    ]
                ),
                'filters' => $request->only(['search', 'filter', 'per_page'])
            ]);
        }
        

        public function indexPayment(Request $request) {
            $perPage = $request->input('per_page', session('rows_per_page', 10));
        
            session(['rows_per_page' => $perPage]);

            $query = Payment_Verification::query();

            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search; 
                $query->where(function($q) use ($searchTerm) {
                    $q->where('student_info_id', 'like', "%{$searchTerm}%")
                      ->orWhere('name', 'like', "%{$searchTerm}%")
                      ->orWhere('email', 'like', "%{$searchTerm}%")
                      ->orWhere('reference', 'like', "%{$searchTerm}%");
                });
            }
                    
            if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
                $query->where(function($q) use ($request) {
                    $q->where('semester', $request->filter)
                      ->orWhere('year_level', $request->filter)
                      ->orWhere('purpose', $request->filter);
                    });
                }

            $payment = $query->paginate($perPage);

            return Inertia::render('Admin/Payment', ['payment'=>$payment, 
            'filters' => $request->only(['search', 'filter', 'per_page'])]);
        }

        public function edit(PaymentVerification $request) 
        {
            $paymentVerification = Payment_Verification::findOrFail($request->id);
            
            $paymentVerification->update([
                'name' => $request->name,
                'year_level' => $request->year_level,
                'program' => $request->program,
                'email' => $request->email,
                'purpose' => $request->purpose,
                'semester' => $request->semester,
                'amount' => $request->amount,
                'reference' => $request->reference,
                'status' => $request->status,
            ]);

            
            if ($request->status === 'approved') {
            
                $studentFee = Student_Fees::where([
                    'student_info_id' => $paymentVerification->student_info_id,
                    'year_level' => $paymentVerification->year_level,
                    'semester' => $paymentVerification->semester
                ])->first();

                if ($studentFee) {
                
                    $updateData = [
                        'amount_paid' => $studentFee->amount_paid + $paymentVerification->amount,
                        'status' => $this->calculatePaymentStatus(
                            $studentFee->total_amount,
                            $studentFee->amount_paid + $paymentVerification->amount
                        ),
                        'payment_verification_id' => $paymentVerification->id
                    ];

                
                    $studentFee->update($updateData);
                }
            }

        }

        protected function calculatePaymentStatus($totalAmount, $amountPaid)
        {
            if ($amountPaid >= $totalAmount) {
                return 'paid';
            } elseif ($amountPaid > 0) {
                return 'partially_paid';
            }
            return 'pending';
        }

        public function showImage($filename) {
            $path = storage_path('app/private/images/' . $filename);

            if (!file_exists($path)) {
                abort(404);
            }
            return response()->file($path);
            }


        public function destroy($id) {
            Payment_Verification::findOrFail($id)->delete();
        }


        public function indexAssignFee(Request $request) {
            $perPage = $request->input('per_page', session('rows_per_page', 10));
        
            session(['rows_per_page' => $perPage]);

            $query = Student_Info::with('users','personalInfo', 'documents', 'guardian', 'paymentVerification')->whereHas('documents')
                    ->whereHas('paymentVerification');
             

            if ($request->has('search') && !empty($request->search)) {
                $query->whereHas('personalInfo', function($q) use ($request) {
                    $q->where('first_name', 'like', "%{$request->search}%")
                    ->orWhere('last_name', 'like', "%{$request->search}%")
                    ->orWhere('student_info_id', 'like', "%{$request->search}%");                    
                });
            }
                    
            if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
                $query->where(function($q) use ($request) {
                    $q->where('semester', $request->filter)
                      ->orWhere('year_level', $request->filter);
                    });
                }

            $student = $query->paginate($perPage);
            
            $college_fee = College_Billing::all();
            $subjects = Subjects::all();
            $other_fee = Other_Billing::all();
            $student_subjects = Student_Subjects::all();
           

            return Inertia::render('Admin/AssigningFee', ['student'=>$student, 
            'college_fee'=>$college_fee, 
            'subjects'=>$subjects, 
            'other_fee' => $other_fee, 
            'student_subjects' => $student_subjects,
            'filters' => $request->only(['search', 'filter', 'per_page'])]);
        }
        
        public function storePaymentDetails(Request $request)
        {
            $paymentDetails = $request->input('paymentDetails');
            
            if (empty($paymentDetails)) {
                return response()->json(['error' => 'No payment details provided'], 400);
            }

            $firstPayment = $paymentDetails[0];
            $studentInfo = Student_Info::where('student_id', $firstPayment['student_info_id'])->first();

            if (!$studentInfo) {
                Log::error('Student Info not found for student_id:', [$firstPayment['student_info_id']]);
                return response()->json(['error' => 'Student not found'], 404);
            }

            $totalFees = 0;
            $totalDiscounts = 0;

            foreach ($paymentDetails as $paymentDetail) {
                if ($paymentDetail['amount'] < 0) {
                    $totalDiscounts += abs($paymentDetail['amount']);
                } else {
                    $totalFees += $paymentDetail['amount'];
                }
            }

            $netTotal = $totalFees - $totalDiscounts;

            if ($netTotal < 0) {
                return response()->json(['error' => 'Discounts cannot exceed total fees'], 400);
            }

            foreach ($paymentDetails as $paymentDetail) {
                Payment_Details::create([
                    'student_info_id' => $paymentDetail['student_info_id'],
                    'fee_type' => $paymentDetail['fee_type'],
                    'year_level' => $studentInfo->year_level,
                    'semester' => $studentInfo->semester,
                    'fee_id' => $paymentDetail['fee_id'],
                    'amount' => $paymentDetail['amount'],
                ]);
            }

            $approvedPayments = Payment_Verification::where([
                'student_info_id' => $studentInfo->student_id,
                'year_level' => $studentInfo->year_level,
                'semester' => $studentInfo->semester,
                'status' => 'approved'
            ])->get();

            if ($approvedPayments->isEmpty()) {
                Student_Fees::updateOrCreate(
                    [
                        'student_info_id' => $studentInfo->student_id,
                        'year_level' => $studentInfo->year_level,
                        'semester' => $studentInfo->semester,
                    ],
                    [
                        'status' => 'pending',
                        'total_amount' => $netTotal,
                        'amount_paid' => 0,
                        'discounts' => $totalDiscounts,
                    ]
                );
            }

            else {
                foreach ($approvedPayments as $payment) {
                    Student_Fees::create([
                        'student_info_id' => $studentInfo->student_id,
                        'year_level' => $studentInfo->year_level,
                        'semester' => $studentInfo->semester,
                        'status' => 'partially_paid',
                        'total_amount' => $netTotal,
                        'amount_paid' => $payment->amount,
                        'discounts' => $totalDiscounts,
                        'payment_verification_id' => $payment->id, 
                    ]);
                }
            }

        }        

}

        

        

        
           

