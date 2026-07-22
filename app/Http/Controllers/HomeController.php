<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home', [
            'featuredPackages' => $this->featuredPackages(),
            'testimonials' => $this->testimonials(),
        ]);
    }

    /**
     * Placeholder package data for the homepage's "Featured Packages" section.
     * TODO: replace with real Package model data once the domain model is finalized.
     *
     * @return array<int, array{
     *     type: string, title: string, slug: string,
     *     durationDays: int, hotelStars: int, transportIncluded: bool,
     *     price: int, currency: string,
     * }>
     */
    private function featuredPackages(): array
    {
        return [
            [
                'type' => 'Umrah Package',
                'title' => 'Umrah Comfort Package',
                'slug' => 'umrah-comfort-package',
                'durationDays' => 7,
                'hotelStars' => 4,
                'transportIncluded' => true,
                'price' => 3999,
                'currency' => 'SAR',
            ],
            [
                'type' => 'Umrah Package',
                'title' => 'Umrah Deluxe Package',
                'slug' => 'umrah-deluxe-package',
                'durationDays' => 10,
                'hotelStars' => 5,
                'transportIncluded' => true,
                'price' => 5999,
                'currency' => 'SAR',
            ],
            [
                'type' => 'Tour Package',
                'title' => 'Al Ula Tour Package',
                'slug' => 'al-ula-tour-package',
                'durationDays' => 5,
                'hotelStars' => 4,
                'transportIncluded' => true,
                'price' => 4499,
                'currency' => 'SAR',
            ],
            [
                'type' => 'Tour Package',
                'title' => 'Red Sea Coast Tour',
                'slug' => 'red-sea-coast-tour',
                'durationDays' => 4,
                'hotelStars' => 4,
                'transportIncluded' => true,
                'price' => 3499,
                'currency' => 'SAR',
            ],
        ];
    }

    /**
     * Placeholder testimonial data for the homepage's "What Our Travelers Say" section.
     * TODO: replace with real Testimonial model data once the domain model is finalized.
     *
     * @return array<int, array{name: string, location: string, rating: int, review: string}>
     */
    private function testimonials(): array
    {
        return [
            [
                'name' => 'Muhammad Adeel',
                'location' => 'Lahore, Pakistan',
                'rating' => 5,
                'review' => 'Nooria Travels made our Umrah journey so smooth and memorable. Everything was well organized from visa to stay.',
            ],
            [
                'name' => 'Fatima Zahra',
                'location' => 'Karachi, Pakistan',
                'rating' => 5,
                'review' => 'Excellent service and support throughout our trip. The hotel was very close to Haram and transport was on time.',
            ],
            [
                'name' => 'Ahmed Khan',
                'location' => 'Riyadh, Saudi Arabia',
                'rating' => 5,
                'review' => 'Professional team, affordable packages and great hospitality. Highly recommended Nooria Travels.',
            ],
        ];
    }
}
