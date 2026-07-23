<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders the privacy policy page', function () {
    $this->get('/privacy-policy')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('privacy-policy'));
});
