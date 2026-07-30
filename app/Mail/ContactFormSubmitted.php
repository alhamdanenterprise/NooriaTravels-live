<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  array{name: string, email: string, phone: string, subject: string, message: string}  $submission
     */
    public function __construct(public array $submission) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Contact Form Submission: '.$this->submission['subject'],
            replyTo: [$this->submission['email']],
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.contact-form-submitted',
            with: ['submission' => array_map($this->escapeMarkdown(...), $this->submission)],
        );
    }

    /**
     * Escape CommonMark special characters so submitted text can't inject
     * headings, links, images, or other formatting into the rendered email.
     */
    private function escapeMarkdown(string $value): string
    {
        return preg_replace('/([\\\\`*_{}\[\]()#+\-.!|>~])/', '\\\\$1', $value);
    }
}
