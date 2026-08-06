<?php

use App\Models\Hotel;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the hotels & accommodation page with active hotels', function () {
    Hotel::factory()->create(['name' => 'Visible Hotel', 'is_active' => true]);
    Hotel::factory()->create(['name' => 'Hidden Hotel', 'is_active' => false]);

    $this->get('/hotels-accommodation')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('hotels-accommodation')
            ->has('hotels', 1)
            ->where('hotels.0.name', 'Visible Hotel')
        );
});

it('includes popup detail fields for each hotel, including derived highlights', function () {
    Hotel::factory()->create([
        'name' => 'Popup Test Hotel',
        'city' => 'Makkah',
        'room_types' => ['Family Suite', 'Twin'],
        'check_in_time' => '3:00 PM',
        'check_out_time' => '12:00 PM',
        'accepting_enquiries' => true,
    ]);

    $this->get('/hotels-accommodation')
        ->assertInertia(fn (Assert $page) => $page
            ->where('hotels.0.check_in_time', '3:00 PM')
            ->where('hotels.0.check_out_time', '12:00 PM')
            ->where('hotels.0.accepting_enquiries', true)
            ->has('hotels.0.highlights', 8)
            ->where('hotels.0.highlights.0.title', 'Quality Stay')
            ->where('hotels.0.highlights.2.title', 'Ideal for Families')
        );
});

it('does not expose google rating data that has not been checked', function () {
    Hotel::factory()->create([
        'name' => 'Unchecked Google Hotel',
        'google_rating' => 4.5,
        'google_review_count' => null,
        'google_data_checked_at' => null,
    ]);

    $this->get('/hotels-accommodation')
        ->assertInertia(fn (Assert $page) => $page
            ->where('hotels.0.google_data_checked_at', null)
            ->where('hotels.0.google_review_count', null)
        );
});

it('leaves check-in/check-out null by default rather than a copied placeholder', function () {
    Hotel::factory()->create(['name' => 'No Times Hotel']);

    $this->get('/hotels-accommodation')
        ->assertInertia(fn (Assert $page) => $page
            ->where('hotels.0.check_in_time', null)
            ->where('hotels.0.check_out_time', null)
        );
});

it('lets a hotel belong to more than one category at once', function () {
    Hotel::factory()->create([
        'name' => 'Multi-Category Hotel',
        'categories' => ['VIP', 'Group Hotels'],
    ]);

    $this->get('/hotels-accommodation')
        ->assertInertia(fn (Assert $page) => $page
            ->has('hotels.0.categories', 2)
            ->where('hotels.0.categories.0', 'VIP')
            ->where('hotels.0.categories.1', 'Group Hotels')
        );
});
