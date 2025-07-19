<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SHSBillingRequest extends FormRequest
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
            'program_code' => 'required|string',
            'year_level' => 'required|string',
            'payment_type' => 'required|string',
            'down_payment' => 'nullable',
            'prelim'  => 'nullable',
            'midterm'  => 'nullable',
            'finals'  => 'nullable',
            'total_amount' => 'nullable'
        ];
    }
}
