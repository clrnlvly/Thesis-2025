<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BillingTypeRequest extends FormRequest
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
            "fee_type"=> "nullable",
            "program_name"=> "nullable",
            "no_unit"=> "nullable",
            "amount"=> "nullable",
            "misellaneous_name"=> "nullable",
            "misellaneous_description" => "nullable",
            "discount_name" => "nullable",
            "discount_amount" =>"nullable",
            "total_amount" => "nullable",
        ];
    }
}
