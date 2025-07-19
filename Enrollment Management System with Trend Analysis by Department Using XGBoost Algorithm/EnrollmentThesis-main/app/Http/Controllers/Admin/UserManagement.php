<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Academic_Year;
use App\Models\User;
use App\Models\Users_IDFormat;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserManagement extends Controller
{
    //
    public function index(Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = User::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('role', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%");
            });
        }
        
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('role', $request->filter) 
                ->orWhere(function($q2) use ($request) {
                    if ($request->filter === 'Verified') {
                        $q2->whereNotNull('email_verified_at'); 
                    } elseif ($request->filter === 'Not Verified') {
                        $q2->whereNull('email_verified_at');  
                    }
                });
        });
        }
   
        $user = $query->paginate($perPage);
        return Inertia::render('Admin/Usermanagement', ['user'=>$user,  
                        'filters' => $request->only(['search', 'filter', 'per_page']), 
                       ]);
    }

    public function update(Request $request) {
        $user = User::where('id', $request->id)->firstOrFail();
        $request->validate([
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
        ]);
        $user->update([
            'name' => $request->name,
            'email'  => $request->email,
            'role' => $request->role,
        ]);
    }

    public function createUser() {
        $id_format = Users_IDFormat::where('user_type','admin')->first();
        return Inertia::render('Admin/UserManagement/CreateUser', ['id_format' => $id_format]);
    }

    public function destroyUser($id) {
        User::findOrFail($id)->delete();
    }
}
