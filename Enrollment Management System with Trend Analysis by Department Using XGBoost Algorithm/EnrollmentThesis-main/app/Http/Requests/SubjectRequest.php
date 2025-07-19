<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubjectRequest extends FormRequest
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
        return [
            'program_code' => 'required',
            'code'  => ['required', Rule::unique('subjects','code')->whereNull('deleted_at')->ignore($this->route('id'))], 
            'name'  => ['required', Rule::unique('subjects','name')->whereNull('deleted_at')->ignore($this->route('id'))],
            'prerequisites'  => 'required',
            'period'  => 'required',
            'department' => 'required',
            'year_level'  => 'required',
            'category'  => 'required',
            'lec'  => 'required|numeric',
            'lab'  => 'required|numeric',
            'unit'  => 'required|numeric',
            'total'  => 'required|numeric',
        ];
    }
}
