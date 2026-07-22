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
            'phone' => '+966 50 123 4567',
            'whatsapp' => '966501234567',
            'email' => 'info@nooriatravels.com',
            'address' => 'Office 12, Al Olaya, Riyadh, Kingdom of Saudi Arabia',
            'officeHours' => 'Mon - Sun: 24/7 Support',
            'social' => [
                'facebook' => '#',
                'instagram' => '#',
                'youtube' => '#',
            ],
        ];
    }
}
