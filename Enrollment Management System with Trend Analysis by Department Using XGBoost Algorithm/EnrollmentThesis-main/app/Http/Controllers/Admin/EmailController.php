<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\GreetingEmail;
use App\Models\Email_Logs;
use App\Models\Payment_Verification;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class EmailController extends Controller
{
    public function index() {
        $student = Student_Info::with('personalInfo', 'users')->paginate(10);
        return Inertia::render('Admin/Features/Email/SendEmail', ['student'=>$student]);
    }

    public function sendEmailSuccess(Request $request) {

        $email = Student_Info::findOrFail($request->id);
        $user = $email->users;

        $to = $user->email;
        $message = "Greetings,
                    We are happy to inform you that your application has been approved. You can now submit your documents to the registrar's office and pay the required tuition fee to officially enroll. For more information, you can visit our website.
                    
                    Thank you.";
        $subject = "Application Approved";

        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }

    public function sendEmailRejected(Request $request) {

        $email = Student_Info::findOrFail($request->id);
        $user = $email->users;

        $to = $user->email;
        $message = "Greetings,

                    We regret to inform you that your application has been rejected. Unfortunately, we are unable to move forward with your application at this time. If you have any questions or would like to know more about the decision, feel free to contact our office for further clarification.

                    Thank you for your interest, and we wish you the best in your future endeavors.";

                    $subject = "Application Rejected";

        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }

    public function sendEmailOnHold(Request $request) {

        $email = Student_Info::findOrFail($request->id);
        $user = $email->users;

        $to = $user->email;
        $message = "Greetings,

                    We would like to inform you that your application is currently on hold. We are still reviewing your submission and will notify you as soon as a decision is made. Please be patient during this process. If you have any questions or need further information, don't hesitate to contact us.

                    Thank you for your understanding.";

                    $subject = "Application On Hold";


        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }

    public function sendEmailOfficiallyEnrolled(Request $request) {

        $user = User::where('id', $request->users_id)->firstOrFail();

        Log::info($request->all());
    
        $to = $user->email;
        $message = "Dear " . $user->name . ",\n\n
                    Greetings from Westbridge Institute of Technology Inc.! We are excited to inform you that your enrollment has been successfully processed, and you are now officially enrolled as a student. 
        
                    You can now access your student portal to view important information, including your schedule, grades, payment status, and more. To log in, please use the following credentials:
                    
                    Email: " . $user->email . "\n
                    Password: WITI@123\n\n
        
                    Please be sure to change your password upon your first login to ensure the security of your account. 
        
                    If you have any questions or encounter any issues, don't hesitate to reach out to the administration team. We are here to support you every step of the way!
        
                    We look forward to seeing you thrive in your academic journey at Westbridge Institute of Technology Inc. and wish you all the best in your studies.\n\n
                    Thank you for choosing us as your educational partner. Welcome aboard!
        
                    Best regards,\n
                    Westbridge Institute of Technology Inc.\n
                    Enrollment Team";
        
        $subject = "Official Enrollment Confirmation";
        

        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }

    public function sendEmailPaymentVerified($id)
{
    $paymentVerification = Payment_Verification::findOrFail($id);

    $studentInfoId = $paymentVerification->student_info_id;
    Log::info("Student Info ID: " . $studentInfoId);

    $email = Student_Info::findOrFail($studentInfoId);
    Log::info("Email Info ID: " . $email);
    $user = $email->users;

        $to = $user->email;

    $message = "Greetings,

    We are pleased to inform you that your payment has been successfully verified. If you have completed all required steps, we will proceed to assign you your subjects and provide you with the tuition fee breakdown for enrollment.

    Thank you for your timely payment and cooperation.

    Best regards,
    The Registrar's Office.";

    $subject = "Payment Verified";

    Email_Logs::create([
        'users_id' => $user->id,
        'application' => 'sent'
    ]);

    Mail::raw($message, function ($mailMessage) use ($user, $subject) {
        $mailMessage->to($user->email)
                    ->subject($subject);
    });
}
    
}
