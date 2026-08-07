<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AirTicketingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('coming-soon', [
            'service' => [
                'name' => 'Air Ticketing',
                'tagline' => 'Affordable domestic and international air tickets booked through Nooria Travels — best fares for Pakistan, UK, and Saudi Arabia routes.',
                'path' => '/air-ticketing',
            ],
        ]);
    }
}
