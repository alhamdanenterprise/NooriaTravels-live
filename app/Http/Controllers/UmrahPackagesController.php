<?php

namespace App\Http\Controllers;

use App\Models\UmrahPackage;
use Inertia\Inertia;
use Inertia\Response;

class UmrahPackagesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('umrah-packages', [
            'packages' => UmrahPackage::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get([
                    'id', 'slug', 'title', 'description', 'image', 'duration_label',
                    'makkah_nights', 'madinah_nights', 'makkah_hotel_name', 'makkah_hotel_stars',
                    'madinah_hotel_name', 'madinah_hotel_stars', 'meal_plan', 'inclusions',
                    'visa_included', 'flight_included', 'pricing', 'notes', 'is_featured',
                ]),
        ]);
    }
}
