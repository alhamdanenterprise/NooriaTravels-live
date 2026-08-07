<?php

it('serves a valid sitemap listing every public page', function () {
    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'application/xml');

    $xml = simplexml_load_string($response->getContent());

    expect($xml)->not->toBeFalse();

    $locs = collect(iterator_to_array($xml->url, false))->map(fn ($url) => (string) $url->loc)->all();

    expect($locs)->toContain(
        config('app.url').'/',
        config('app.url').'/umrah-packages',
        config('app.url').'/hotels-accommodation',
        config('app.url').'/services',
        config('app.url').'/about',
        config('app.url').'/transportation',
        config('app.url').'/contact',
        config('app.url').'/visit-visa',
        config('app.url').'/air-ticketing',
        config('app.url').'/tours',
        config('app.url').'/privacy-policy',
        config('app.url').'/terms-and-conditions',
    );
});
