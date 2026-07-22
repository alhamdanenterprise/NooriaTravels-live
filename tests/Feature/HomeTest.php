<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the home page with featured packages and testimonials', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('home')
            ->has('featuredPackages')
            ->has('testimonials')
        );
});
