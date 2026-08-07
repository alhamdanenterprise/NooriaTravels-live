<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ToursController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('coming-soon', [
            'service' => [
                'name' => 'Tour Packages',
                'tagline' => 'Explore curated tour packages across Saudi Arabia with Nooria Travels — comfortable travel, trusted guidance, memorable journeys.',
                'path' => '/tours',
            ],
        ]);
    }
}
