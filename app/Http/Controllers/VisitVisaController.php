<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class VisitVisaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('coming-soon', [
            'service' => [
                'name' => 'Visit Visa',
                'tagline' => 'Fast and reliable visit visa services for Saudi Arabia.',
            ],
        ]);
    }
}
