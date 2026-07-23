<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the terms and conditions page', function () {
    $this->get('/terms-and-conditions')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('terms-and-conditions'));
});
