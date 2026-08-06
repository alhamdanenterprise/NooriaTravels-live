<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AirTicketingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HotelsController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\TermsAndConditionsController;
use App\Http\Controllers\ToursController;
use App\Http\Controllers\TransportationController;
use App\Http\Controllers\UmrahPackagesController;
use App\Http\Controllers\VisitVisaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/umrah-packages', [UmrahPackagesController::class, 'index'])->name('umrah-packages');
Route::get('/hotels-accommodation', [HotelsController::class, 'index'])->name('hotels-accommodation');
Route::get('/transportation', [TransportationController::class, 'index'])->name('transportation');
Route::get('/visit-visa', [VisitVisaController::class, 'index'])->name('visit-visa');
Route::get('/air-ticketing', [AirTicketingController::class, 'index'])->name('air-ticketing');
Route::get('/tours', [ToursController::class, 'index'])->name('tours');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'index'])->name('privacy-policy');
Route::get('/terms-and-conditions', [TermsAndConditionsController::class, 'index'])->name('terms-and-conditions');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
