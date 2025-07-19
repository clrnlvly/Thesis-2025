<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Get the student ID from route parameters if it exists (for updates)
        $studentId = $this->route('id');
        $userId = null;
        
        // If this is an update, get the associated user ID
        if ($studentId) {
            $studentInfo = \App\Models\Student_Info::find($studentId);
            $userId = $studentInfo ? $studentInfo->users_id : null;
        }

        return [
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($userId)
            ],

            // student_info table
            'department' => 'required|string|max:50',
            'school_year' => 'required|string|max:50',
            'semester' => 'required|string|max:50',
            'branch' => 'required|string|max:50',
            'year_level' => 'required|string|max:50',
            'program' => 'required|string|max:255',
            'classified_as' => 'required|string|max:50',
            'last_school_attended' => 'nullable|string|max:50',
            'last_school_address' => 'nullable|string|max:50',
    
            // personal_info table
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'address' => 'required|string|max:255',
            'birth_date' => 'required|string|max:50',
            'birth_place' => 'required|string|max:255',
            'civil_status' => 'required|string|max:50',
            'gender' => 'required|string|max:50',
            'religion' => 'nullable|string|max:50',
    
            // guardian
            'father_name' => 'nullable|string|max:255',
            'father_occupation'  => 'nullable|string|max:255',
            'father_phone' => 'nullable|string|max:50',
            'mother_name' => 'nullable|string|max:255',
            'mother_occupation' => 'nullable|string|max:255',
            'mother_phone' => 'nullable|string|max:50',
            'guardian_name' => 'nullable|string|max:255',
            'guardian_relationship' => 'nullable|string|max:255',
            'guardian_phone' => 'nullable|string|max:50',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.unique' => 'This email is already associated with another account.',
        ];
    }
}