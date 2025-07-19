<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class PaymentVerification extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|email',
            'purpose' => 'required|string',
            'semester' => 'required|string',
            'reference' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'payment_receipt' => ['required','max:2048'],
            'year_level' => 'required|string',
            'program' => 'required|string',
            // 'status' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'payment_receipt.max' => 'The payment receipt must not be greater than 2MB.',
            'payment_receipt.mimes' => 'The payment receipt must be a file of type: jpeg, png, jpg, gif.',
            'payment_receipt.required' => 'The payment receipt field is required.',
        ];
    }
}
