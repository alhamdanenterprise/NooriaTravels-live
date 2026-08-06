<?php

use App\Models\UmrahPackage;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the umrah packages page with only active packages', function () {
    UmrahPackage::factory()->create(['title' => 'Visible Package', 'is_active' => true]);
    UmrahPackage::factory()->create(['title' => 'Hidden Package', 'is_active' => false]);

    $this->get('/umrah-packages')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('umrah-packages')
            ->has('packages', 1)
            ->where('packages.0.title', 'Visible Package')
        );
});

it('derives Economy for budget hotel star ratings', function () {
    UmrahPackage::factory()->create(['makkah_hotel_stars' => 2, 'flight_included' => false]);

    $this->get('/umrah-packages')
        ->assertInertia(fn (Assert $page) => $page
            ->where('packages.0.categories', ['Economy'])
        );
});

it('derives Premium for high star ratings and Ticket Included when a flight is bundled', function () {
    UmrahPackage::factory()->create(['makkah_hotel_stars' => 5, 'flight_included' => true]);

    $this->get('/umrah-packages')
        ->assertInertia(fn (Assert $page) => $page
            ->where('packages.0.categories', ['Premium', 'Ticket Included'])
        );
});
