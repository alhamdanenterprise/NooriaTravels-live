@component('mail::message')
# New Contact Form Submission

**Name:** {{ $submission['name'] }}
**Email:** {{ $submission['email'] }}
**Phone:** {{ $submission['phone'] }}
**Subject:** {{ $submission['subject'] }}

**Message:**

{{ $submission['message'] }}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
