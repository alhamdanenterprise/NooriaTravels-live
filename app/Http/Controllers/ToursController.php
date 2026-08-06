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
                'tagline' => 'Explore the beauty of Saudi Arabia with our tour packages.',
            ],
        ]);
    }
}
