<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class TermsAndConditionsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('terms-and-conditions');
    }
}
