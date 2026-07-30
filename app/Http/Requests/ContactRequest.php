<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100'],
            'phone' => ['required', 'string', 'regex:/^[0-9]{6,20}$/'],
            'subject' => [
                'required',
                'string',
                'in:General Inquiry,Umrah Packages,Visit Visa,Air Ticketing,Hotels & Accommodation,Transportation,Tour Packages',
            ],
            'message' => ['required', 'string', 'max:6000', function (string $attribute, string $value, \Closure $fail): void {
                $wordCount = count(array_filter(preg_split('/\s+/u', trim($value)) ?: []));

                if ($wordCount > 500) {
                    $fail('The message may not contain more than 500 words.');
                }
            }],
            // Honeypot: real visitors never see or fill this field. Not in $request->validated() usage
            // beyond this check, so it never reaches the email.
            'website' => ['prohibited'],
        ];
    }
}
