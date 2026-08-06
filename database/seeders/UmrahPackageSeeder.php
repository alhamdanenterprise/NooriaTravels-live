<?php

namespace Database\Seeders;

use App\Models\UmrahPackage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UmrahPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Sourced verbatim from the client's "Umrah Packages List" (8 packages, 2026-08-06).
     * Packages 1-5 are priced in SAR across three sharing tiers; packages 6-8 are priced in
     * PKR as a single flat per-person price (no sharing tiers) — `pricing` reflects both
     * shapes, with `sharing_type: null` used for the flat-price packages.
     *
     * `description` is not part of the client's source data; each is a short, factual
     * one-line summary written from the package's own facts (hotels, inclusions), the same
     * approach used for hotel descriptions elsewhere in this seeder set.
     */
    public function run(): void
    {
        collect($this->packages())->each(function (array $package, int $index): void {
            UmrahPackage::create([
                ...$package,
                'slug' => Str::slug($package['title']),
                'sort_order' => $index,
            ]);
        });
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function packages(): array
    {
        return [
            [
                'title' => '7 Nights Emaar Package',
                'description' => 'A comfortable week-long Umrah stay at the 4-star Emaar Grand Hotel in Makkah and Emaar Elite Al Madina in Madinah, with daily breakfast and private transport included.',
                'duration_label' => '7 Nights',
                'makkah_nights' => 4,
                'madinah_nights' => 3,
                'makkah_hotel_name' => 'Emaar Grand Hotel',
                'makkah_hotel_stars' => 4,
                'madinah_hotel_name' => 'Emaar Elite Al Madina Hotel',
                'madinah_hotel_stars' => 3,
                'meal_plan' => 'Breakfast',
                'inclusions' => ['Hotel accommodation', 'Breakfast', 'Private transport'],
                'visa_included' => false,
                'flight_included' => false,
                'pricing' => [
                    ['sharing_type' => 'double', 'currency' => 'SAR', 'price' => 2200],
                    ['sharing_type' => 'triple', 'currency' => 'SAR', 'price' => 1700],
                    ['sharing_type' => 'quad', 'currency' => 'SAR', 'price' => 1500],
                ],
                'is_featured' => true,
            ],
            [
                'title' => '10 Nights Emaar Package',
                'description' => 'A relaxed 10-night Umrah journey split evenly between Makkah and Madinah, staying at the 4-star Emaar Grand Hotel and Emaar Elite Al Madina, with breakfast and private car transport included.',
                'duration_label' => '10 Nights',
                'makkah_nights' => 5,
                'madinah_nights' => 5,
                'makkah_hotel_name' => 'Emaar Grand Hotel',
                'makkah_hotel_stars' => 4,
                'madinah_hotel_name' => 'Emaar Elite Al Madina Hotel',
                'madinah_hotel_stars' => 3,
                'meal_plan' => 'Breakfast',
                'inclusions' => ['Hotel accommodation', 'Breakfast', 'Private car'],
                'visa_included' => false,
                'flight_included' => false,
                'pricing' => [
                    ['sharing_type' => 'double', 'currency' => 'SAR', 'price' => 3200],
                    ['sharing_type' => 'triple', 'currency' => 'SAR', 'price' => 2400],
                    ['sharing_type' => 'quad', 'currency' => 'SAR', 'price' => 2100],
                ],
                'is_featured' => false,
            ],
            [
                'title' => '10 Nights Economy Package',
                'description' => 'A budget-friendly 10-night Umrah package with basic hotel accommodation in Makkah and Madinah and private airport transfer, ideal for travelers looking for the most affordable option.',
                'duration_label' => '10 Nights',
                'makkah_nights' => 5,
                'madinah_nights' => 5,
                'makkah_hotel_name' => 'Emaar Al Khalil',
                'makkah_hotel_stars' => 2,
                'madinah_hotel_name' => 'Emaar Taiba Hotel',
                'madinah_hotel_stars' => 1,
                'meal_plan' => 'Room Only',
                'inclusions' => ['Hotel accommodation', 'Private car from airport to hotel'],
                'visa_included' => false,
                'flight_included' => false,
                'pricing' => [
                    ['sharing_type' => 'double', 'currency' => 'SAR', 'price' => 2299],
                    ['sharing_type' => 'triple', 'currency' => 'SAR', 'price' => 1599],
                    ['sharing_type' => 'quad', 'currency' => 'SAR', 'price' => 1299],
                ],
                'is_featured' => false,
            ],
            [
                'title' => '10 Nights M Hotel–Gulnar Package',
                'description' => 'Comfortable Umrah stay with visa support and private car transfer.',
                'duration_label' => '10 Nights',
                'makkah_nights' => 5,
                'madinah_nights' => 5,
                'makkah_hotel_name' => 'M Hotel Makkah by Millennium',
                'makkah_hotel_stars' => 5,
                'madinah_hotel_name' => 'Gulnar Taiba Hotel',
                'madinah_hotel_stars' => 3,
                'meal_plan' => 'Meals Not Included',
                'inclusions' => ['Umrah visa', 'Private car from airport to Makkah hotel', 'Makkah hotel accommodation', 'Madinah hotel accommodation'],
                'visa_included' => true,
                'flight_included' => false,
                'pricing' => [
                    ['sharing_type' => 'double', 'currency' => 'SAR', 'price' => 2700],
                    ['sharing_type' => 'triple', 'currency' => 'SAR', 'price' => 2100],
                    ['sharing_type' => 'quad', 'currency' => 'SAR', 'price' => 1700],
                ],
                'is_featured' => true,
            ],
            [
                'title' => '15 Days / 14 Nights M Hotel–Gulnar Package',
                'description' => 'An extended two-week Umrah stay at the 5-star M Hotel Makkah by Millennium and Gulnar Taiba Hotel, with visa support and private airport transfer included.',
                'duration_label' => '15 Days / 14 Nights',
                'makkah_nights' => 6,
                'madinah_nights' => 8,
                'makkah_hotel_name' => 'M Hotel Makkah by Millennium',
                'makkah_hotel_stars' => 5,
                'madinah_hotel_name' => 'Gulnar Taiba Hotel',
                'madinah_hotel_stars' => 3,
                'meal_plan' => 'Meals Not Included',
                'inclusions' => ['Umrah visa', 'Private car from airport to Makkah hotel', 'Makkah hotel accommodation', 'Madinah hotel accommodation'],
                'visa_included' => true,
                'flight_included' => false,
                'pricing' => [
                    ['sharing_type' => 'double', 'currency' => 'SAR', 'price' => 3500],
                    ['sharing_type' => 'triple', 'currency' => 'SAR', 'price' => 2600],
                    ['sharing_type' => 'quad', 'currency' => 'SAR', 'price' => 2200],
                ],
                'is_featured' => false,
            ],
            [
                'title' => '15 Days / 14 Nights Emaar Breakfast Package',
                'description' => 'A two-week Umrah package with visa, breakfast, and transport included, staying at the 4-star Emaar Grand Hotel and Emaar Elite Al Madina Hotel.',
                'duration_label' => '15 Days / 14 Nights',
                'makkah_nights' => 6,
                'madinah_nights' => 8,
                'makkah_hotel_name' => 'Emaar Grand Hotel',
                'makkah_hotel_stars' => 4,
                'madinah_hotel_name' => 'Emaar Elite Al Madina Hotel',
                'madinah_hotel_stars' => 3,
                'meal_plan' => 'Breakfast',
                'inclusions' => ['Umrah visa', 'Hotel accommodation', 'Breakfast', 'Transport'],
                'visa_included' => true,
                'flight_included' => false,
                'pricing' => [
                    ['sharing_type' => null, 'currency' => 'PKR', 'price' => 299000],
                ],
                'is_featured' => false,
            ],
            [
                'title' => '15 Days / 14 Nights Economy Package',
                'description' => 'An affordable two-week Umrah package with visa and transport included, staying at budget hotels in Makkah and Madinah.',
                'duration_label' => '15 Days / 14 Nights',
                'makkah_nights' => 6,
                'madinah_nights' => 8,
                'makkah_hotel_name' => 'Emaar Al Khalil',
                'makkah_hotel_stars' => 2,
                'madinah_hotel_name' => 'Emaar Taiba Hotel',
                'madinah_hotel_stars' => 1,
                'meal_plan' => 'Room Only',
                'inclusions' => ['Umrah visa', 'Hotel accommodation', 'Transport'],
                'visa_included' => true,
                'flight_included' => false,
                'pricing' => [
                    ['sharing_type' => null, 'currency' => 'PKR', 'price' => 220000],
                ],
                'is_featured' => false,
            ],
            [
                'title' => '15 Days / 14 Nights Flight-Inclusive Package',
                'description' => 'An all-inclusive two-week Umrah package with visa, direct flight ticket, hotel accommodation, and transport — everything arranged in one package.',
                'duration_label' => '15 Days / 14 Nights',
                'makkah_nights' => 6,
                'madinah_nights' => 8,
                'makkah_hotel_name' => 'Zilal Alnuzala',
                'makkah_hotel_stars' => 2,
                'madinah_hotel_name' => 'Arjwan Rose Hotel',
                'madinah_hotel_stars' => 3,
                'meal_plan' => 'Room Only',
                'inclusions' => ['Umrah visa', 'Direct flight ticket', 'Hotel accommodation', 'Transport'],
                'visa_included' => true,
                'flight_included' => true,
                'notes' => 'Airline, departure city, baggage allowance, flight schedule and other ticket details will be discussed and confirmed through WhatsApp.',
                'pricing' => [
                    ['sharing_type' => null, 'currency' => 'PKR', 'price' => 330000],
                ],
                'is_featured' => true,
            ],
        ];
    }
}
