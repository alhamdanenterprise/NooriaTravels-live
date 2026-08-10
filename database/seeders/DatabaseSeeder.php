<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(HotelSeeder::class);
        $this->call(UmrahPackageSeeder::class);

        // Picks up any images already saved under public/images/hotels/{slug}/.
        Artisan::call('hotels:sync-images');
    }
}
