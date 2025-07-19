<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProgramRequest extends FormRequest
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
            'code'  => ['required', Rule::unique('programs','code')->whereNull('deleted_at')->ignore($this->route('id'))], 
            'name'  => ['required', Rule::unique('programs','name')->whereNull('deleted_at')->ignore($this->route('id'))],
            'department' => 'required',
            'status' => 'required',
            'duration' => 'required',
            'campus' => 'required',
        ];
    }
}
