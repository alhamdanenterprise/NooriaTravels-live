<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactFormSubmitted;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

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

        Mail::to(self::RECIPIENT_EMAIL)->send(new ContactFormSubmitted($submission));

        return back()->with('success', "Thank you for reaching out! We'll get back to you shortly.");
    }
}
