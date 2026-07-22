<?php

use App\Mail\ContactFormSubmitted;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the contact page', function () {
    $this->get('/contact')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('contact'));
});

it('sends an email and redirects back on a valid submission', function () {
    Mail::fake();

    $response = $this->post('/contact', [
        'name' => 'Ahmed Khan',
        'email' => 'ahmed@example.com',
        'phone' => '+966 501234567',
        'subject' => 'Umrah Packages',
        'message' => 'I would like to know more about your Umrah packages.',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Mail::assertSent(ContactFormSubmitted::class, function (ContactFormSubmitted $mail) {
        return $mail->submission['email'] === 'ahmed@example.com'
            && $mail->hasTo('info@nooriatravels.com');
    });
});

it('requires all fields to submit the contact form', function () {
    Mail::fake();

    $response = $this->post('/contact', []);

    $response->assertSessionHasErrors(['name', 'email', 'phone', 'subject', 'message']);
    Mail::assertNothingSent();
});

it('rejects a subject outside the allowed list', function () {
    Mail::fake();

    $response = $this->post('/contact', [
        'name' => 'Ahmed Khan',
        'email' => 'ahmed@example.com',
        'phone' => '+966 501234567',
        'subject' => 'Hajj Packages',
        'message' => 'I would like to know more.',
    ]);

    $response->assertSessionHasErrors(['subject']);
    Mail::assertNothingSent();
});

it('rejects a phone number with invalid characters', function () {
    Mail::fake();

    $response = $this->post('/contact', [
        'name' => 'Ahmed Khan',
        'email' => 'ahmed@example.com',
        'phone' => '<script>alert(1)</script>',
        'subject' => 'Umrah Packages',
        'message' => 'I would like to know more.',
    ]);

    $response->assertSessionHasErrors(['phone']);
    Mail::assertNothingSent();
});

it('silently drops submissions that fill the honeypot field', function () {
    Mail::fake();

    $response = $this->post('/contact', [
        'name' => 'Bot',
        'email' => 'bot@example.com',
        'phone' => '+966 501234567',
        'subject' => 'Umrah Packages',
        'message' => 'Spam message.',
        'website' => 'https://spam.example.com',
    ]);

    $response->assertSessionHasErrors(['website']);
    Mail::assertNothingSent();
});

it('rate limits repeated contact form submissions', function () {
    Mail::fake();

    $payload = [
        'name' => 'Ahmed Khan',
        'email' => 'ahmed@example.com',
        'phone' => '+966 501234567',
        'subject' => 'Umrah Packages',
        'message' => 'I would like to know more.',
    ];

    for ($i = 0; $i < 5; $i++) {
        $this->post('/contact', $payload)->assertRedirect();
    }

    $this->post('/contact', $payload)->assertStatus(429);
});
