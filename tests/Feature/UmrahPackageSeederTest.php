<?php

use App\Models\UmrahPackage;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('db:seed', ['--class' => 'UmrahPackageSeeder']);
});

it('seeds exactly 8 umrah packages', function () {
    expect(UmrahPackage::count())->toBe(8);
});

it('gives every package a unique slug', function () {
    expect(UmrahPackage::pluck('slug')->unique())->toHaveCount(8);
});

it('stores tiered SAR pricing for the sharing-based packages', function () {
    $package = UmrahPackage::where('slug', '7-nights-emaar-package')->firstOrFail();

    expect($package->pricing)->toBe([
        ['sharing_type' => 'double', 'currency' => 'SAR', 'price' => 2200],
        ['sharing_type' => 'triple', 'currency' => 'SAR', 'price' => 1700],
        ['sharing_type' => 'quad', 'currency' => 'SAR', 'price' => 1500],
    ]);
});

it('stores flat PKR pricing with no sharing tier for the flight-inclusive package', function () {
    $package = UmrahPackage::where('slug', '15-days-14-nights-flight-inclusive-package')->firstOrFail();

    expect($package->pricing)->toBe([
        ['sharing_type' => null, 'currency' => 'PKR', 'price' => 330000],
    ])
        ->and($package->visa_included)->toBeTrue()
        ->and($package->flight_included)->toBeTrue()
        ->and($package->notes)->toContain('confirmed through WhatsApp');
});

it('casts inclusions as an array and booleans correctly', function () {
    $package = UmrahPackage::where('slug', '10-nights-m-hotel-gulnar-package')->firstOrFail();

    expect($package->inclusions)->toBeArray()
        ->and($package->inclusions)->toContain('Umrah visa')
        ->and($package->visa_included)->toBeTrue()
        ->and($package->flight_included)->toBeFalse()
        ->and($package->makkah_hotel_stars)->toBeInt();
});
