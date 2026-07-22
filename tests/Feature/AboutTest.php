<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the about page', function () {
    $this->get('/about')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('about'));
});
