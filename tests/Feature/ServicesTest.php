<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the services page', function () {
    $this->get('/services')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('services'));
});
