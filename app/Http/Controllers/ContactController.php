<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactFormSubmitted;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ContactController extends Controller
{
    /**
     * Recipient for contact form submissions.
     * TODO: move into a database-backed Setting model once the admin panel is built.
     */
    private const RECIPIENT_EMAIL = 'nooriatraveltours@gmail.com';

    public function index(): Response
    {
        return Inertia::render('contact');
    }

    public function store(ContactRequest $request): RedirectResponse
    {
        $submission = $request->safe()->only(['name', 'email', 'phone', 'subject', 'message']);

        try {
            Mail::to(self::RECIPIENT_EMAIL)->send(new ContactFormSubmitted($submission));
        } catch (Throwable $exception) {
            Log::error('Contact form email failed to send.', ['exception' => $exception->getMessage()]);

            return back()->withInput()->with(
                'error',
                'Sorry, something went wrong sending your message. Please try again or reach us directly on WhatsApp.',
            );
        }

        return back()->with('success', "Thank you for reaching out! We'll get back to you shortly.");
    }
}
