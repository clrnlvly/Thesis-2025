<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Academic_Year;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function createAdmin(): Response
    {
        return Inertia::render('Auth/AdminLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        $request->authenticate();
    
        if (Auth::user()->role !== 'student' && Auth::user()->role !== 'professor') {
            Auth::logout();
    
            return back()->withErrors([
                'email' => 'Admin login is not allowed on this page.',
            ]);
        }
    
        $request->session()->regenerate();
    
        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function storeAdmin(LoginRequest $request): RedirectResponse
    {
       
        $request->authenticate();
    
        if (Auth::user()->role !== 'super admin' && Auth::user()->role !== 'accounting' && Auth::user()->role !== 'registrar') {
            Auth::logout();
    
        return back()->withErrors([
            'email' => 'You must have an admin account to log in here.',
        ])
        ;}
          
        $request->session()->regenerate();

        $latestAcademicYear = Academic_Year::orderByDesc('id')->first();
    
        return redirect()->intended(route('dashboard', ['academic_year_id' => $latestAcademicYear->id]));
    }

    /**
     * Destroy an authenticated session.
     */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     Auth::guard('web')->logout();

    //     $request->session()->invalidate();

    //     $request->session()->regenerateToken();

    //     return redirect('/');
    // }
    public function destroy(Request $request): RedirectResponse
{
    // Logout the user
    Auth::guard('web')->logout();

    // Invalidate the session to clear any stored data
    $request->session()->invalidate();

    // Regenerate the CSRF token
    $request->session()->regenerateToken();

    // Clear the selected year from the session (important to reset academic year selection on next login)
    $request->session()->forget('selected_year');

    // Redirect to the homepage or login page
    return redirect('/');
}

}
