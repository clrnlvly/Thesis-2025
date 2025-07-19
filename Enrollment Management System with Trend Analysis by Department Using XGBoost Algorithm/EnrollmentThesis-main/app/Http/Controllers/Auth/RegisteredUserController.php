<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Admin\EmailController;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Users_IDFormat;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'custom_id' => 'required|string|unique:users',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'role' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $plainPassword = $request->password;

        $user = User::create([
            'custom_id' => $request->custom_id,
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($plainPassword),
        ]);
   
        $format = Users_IDFormat::where('id_format', $request->custom_id)->first();

        if ($format) {
    
            $currentId = $format->id_format;

           
            preg_match('/^([A-Z]+[\-\_]?)(\d+)$/', $currentId, $matches);

            if (count($matches) === 3) {
                $prefix = $matches[1];           
                $number = (int) $matches[2];    

    
                $newNumber = $number + 1;

                $formattedNumber = str_pad($newNumber, strlen($matches[2]), '0', STR_PAD_LEFT);

               
                $newIdFormat = $prefix . $formattedNumber;

                
                $format->update([
                    'id_format' => $newIdFormat,
                ]);
            }
        }   

        event(new Registered($user));

        $to = $user->email;
        $message = "Greetings " . $user->name . ",\n\n"
                . "This is your account credentials.\n\n"
                . "ID: " . $user->custom_id . "\n"
                . "Email: " . $user->email . "\n"
                . "Password: " . $plainPassword . "\n\n" 
                . "Thank you.";
        $subject = "Account Created";

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });
    
        

        return redirect()->route('admin.user.management');
    }
}
