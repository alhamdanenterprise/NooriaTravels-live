<?php

use App\Models\UmrahPackage;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the home page with featured umrah packages and testimonials', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('home')
            ->has('umrahPackages')
            ->has('testimonials')
        );
});

it('shows only featured, active umrah packages on the home page, capped at 3', function () {
    UmrahPackage::factory()->create(['title' => 'Featured One', 'is_featured' => true, 'is_active' => true, 'sort_order' => 1]);
    UmrahPackage::factory()->create(['title' => 'Featured Two', 'is_featured' => true, 'is_active' => true, 'sort_order' => 2]);
    UmrahPackage::factory()->create(['title' => 'Featured Three', 'is_featured' => true, 'is_active' => true, 'sort_order' => 3]);
    UmrahPackage::factory()->create(['title' => 'Featured Four (overflow)', 'is_featured' => true, 'is_active' => true, 'sort_order' => 4]);
    UmrahPackage::factory()->create(['title' => 'Not Featured', 'is_featured' => false, 'is_active' => true, 'sort_order' => 0]);
    UmrahPackage::factory()->create(['title' => 'Featured But Inactive', 'is_featured' => true, 'is_active' => false, 'sort_order' => 0]);

    $this->get('/')
        ->assertInertia(fn (Assert $page) => $page
            ->has('umrahPackages', 3)
            ->where('umrahPackages.0.title', 'Featured One')
            ->where('umrahPackages.1.title', 'Featured Two')
            ->where('umrahPackages.2.title', 'Featured Three')
        );
});
