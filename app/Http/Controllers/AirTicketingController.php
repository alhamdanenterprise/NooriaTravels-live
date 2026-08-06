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
                'tagline' => 'Domestic and international air tickets at the best prices.',
            ],
        ]);
    }
}
