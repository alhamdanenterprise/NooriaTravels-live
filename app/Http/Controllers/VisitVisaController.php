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
                'name' => 'Saudi Arabia Visit Visa',
                'tagline' => 'Fast, reliable Saudi Arabia visit visa processing for pilgrims and tourists — apply through Nooria Travels with expert guidance.',
                'path' => '/visit-visa',
            ],
        ]);
    }
}
