<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return array_merge(parent::share($request), [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'siteSettings' => $this->siteSettings(),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }

    /**
     * Placeholder company/contact info shown across the public site (navbar, footer, contact page).
     * TODO: move into a database-backed Setting model once the admin panel is built.
     *
     * @return array<string, mixed>
     */
    protected function siteSettings(): array
    {
        return [
            'companyName' => 'Nooria Travels',
            'tagline' => 'Journey with Faith, Travel with Trust.',
            'phone' => '+92 336 5099416',
            'phoneAlt' => '+44 7756 980031',
            'whatsapp' => '923365099416',
            'email' => 'nooriatraveltours@gmail.com',
            'address' => '19/19-A, Dawn Plaza, Bank Road, Saddar, Rawalpindi, Pakistan',
            'officeHours' => 'Monday - Saturday, 9:00 AM - 7:00 PM',
            'social' => [
                'facebook' => 'https://www.facebook.com/people/Nooria-Travels/61592861034003/',
                'instagram' => 'https://www.instagram.com/nooriatravelntours/',
                'tiktok' => 'https://www.tiktok.com/@nooriatravelntours',
            ],
        ];
    }
}
