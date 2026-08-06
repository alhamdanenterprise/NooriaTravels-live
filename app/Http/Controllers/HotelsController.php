<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Inertia\Inertia;
use Inertia\Response;

class HotelsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('hotels-accommodation', [
            'hotels' => Hotel::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get([
                    'id', 'name', 'slug', 'city', 'google_rating', 'google_review_count', 'google_data_checked_at',
                    'categories', 'distance_landmark', 'description', 'amenities', 'room_types',
                    'check_in_time', 'check_out_time', 'google_maps_url', 'image', 'gallery', 'accepting_enquiries',
                ]),
        ]);
    }
}
