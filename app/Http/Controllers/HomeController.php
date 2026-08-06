<?php

namespace App\Http\Controllers;

use App\Models\UmrahPackage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home', [
            'umrahPackages' => UmrahPackage::query()
                ->where('is_active', true)
                ->where('is_featured', true)
                ->orderBy('sort_order')
                ->limit(3)
                ->get([
                    'id', 'slug', 'title', 'description', 'image', 'duration_label',
                    'makkah_nights', 'madinah_nights', 'makkah_hotel_name', 'makkah_hotel_stars',
                    'madinah_hotel_name', 'madinah_hotel_stars', 'meal_plan', 'inclusions',
                    'visa_included', 'flight_included', 'pricing', 'notes', 'is_featured',
                ]),
            'testimonials' => $this->testimonials(),
        ]);
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
