<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class VerifyAdminIp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        // Log the actual user IP for debugging
        $userIp = $request->getClientIp();
        Log::info('User IP: ' . $userIp);

        // Check if the user is an admin
        if ($user && $user->role === 'super admin') {
            // Define a list of allowed IP addresses for admin
            $allowedIps = ['192.168.1.14', '127.0.0.1', '::1'];

           // If the user IP is not allowed (and not localhost), logout and redirect
           if (!in_array($userIp, $allowedIps) && $userIp !== '127.0.0.1' && $userIp !== '::1') {
            Auth::logout();
            return redirect('/')->with('error', 'Unauthorized access: Your IP is not allowed.');
        }
        }

        return $next($request);
    }
}
