<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SectionRequest extends FormRequest
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
            //
            'name'  => ['required', Rule::unique('section','name')->whereNull('deleted_at')->ignore($this->route('id'))], 
            'program_code' => 'required|string',
            'semester' => 'required|string',
            'year_level' => 'required|string',
            'department' => 'required|string',
        ];
    }
}
