<?php

use App\Models\Hotel;
use Illuminate\Support\Facades\Artisan;

it('corrects a wrong distance_landmark without touching anything else on the row', function () {
    Hotel::factory()->create([
        'slug' => 'le-meridien-makkah',
        'name' => 'Le Méridien Makkah',
        'distance_landmark' => 'About 550 metres from Masjid al-Haram — approximately 4–7 minutes\' walk',
    ]);

    Artisan::call('hotels:apply-corrections');

    expect(Hotel::where('slug', 'le-meridien-makkah')->first()->distance_landmark)
        ->toBe('Approximately 100 metres from King Abdulaziz Gate');
});

it('renames a hotel without changing its slug', function () {
    Hotel::factory()->create([
        'slug' => 'al-shohada-hotel',
        'name' => 'Al Shohada Hotel',
    ]);

    Artisan::call('hotels:apply-corrections');

    $hotel = Hotel::where('slug', 'al-shohada-hotel')->first();

    expect($hotel->name)->toBe('Al Shohada Hotel by Palm Rich')
        ->and($hotel->slug)->toBe('al-shohada-hotel');
});

it('sets the real check-in/check-out time for a named hotel', function () {
    Hotel::factory()->create(['slug' => 'al-muna-kareem-hotel', 'check_in_time' => null, 'check_out_time' => null]);

    Artisan::call('hotels:apply-corrections');

    $hotel = Hotel::where('slug', 'al-muna-kareem-hotel')->first();

    expect($hotel->check_in_time)->toBe('4:00 PM')
        ->and($hotel->check_out_time)->toBe('11:00 AM');
});

it('leaves check_in_time/check_out_time untouched for a hotel not in the client list', function () {
    Hotel::factory()->create(['slug' => 'some-other-hotel', 'check_in_time' => '15:00:00', 'check_out_time' => '12:00:00']);

    Artisan::call('hotels:apply-corrections');

    $hotel = Hotel::where('slug', 'some-other-hotel')->first();

    expect($hotel->check_in_time)->toBe('3:00 PM')
        ->and($hotel->check_out_time)->toBe('12:00 PM');
});

it('is safe to run twice in a row (idempotent)', function () {
    Hotel::factory()->create(['slug' => 'le-meridien-makkah', 'distance_landmark' => 'wrong']);

    Artisan::call('hotels:apply-corrections');
    Artisan::call('hotels:apply-corrections');

    expect(Hotel::where('slug', 'le-meridien-makkah')->first()->distance_landmark)
        ->toBe('Approximately 100 metres from King Abdulaziz Gate');
});

it('reports failure without throwing when a corrected hotel is missing from the database', function () {
    // None of the 9 corrected slugs exist in this test's database.
    $exitCode = Artisan::call('hotels:apply-corrections');

    expect($exitCode)->toBe(1);
});
