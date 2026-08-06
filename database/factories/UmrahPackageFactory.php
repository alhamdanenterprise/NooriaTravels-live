<?php

namespace Database\Factories;

use App\Models\UmrahPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UmrahPackage>
 */
class UmrahPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->numberBetween(7, 15).' Nights '.fake()->company().' Package';

        return [
            'slug' => str($title)->slug(),
            'title' => $title,
            'description' => fake()->sentence(),
            'image' => null,
            'duration_label' => '10 Nights',
            'makkah_nights' => 5,
            'madinah_nights' => 5,
            'makkah_hotel_name' => fake()->company().' Hotel',
            'makkah_hotel_stars' => fake()->numberBetween(2, 5),
            'madinah_hotel_name' => fake()->company().' Hotel',
            'madinah_hotel_stars' => fake()->numberBetween(2, 5),
            'meal_plan' => fake()->randomElement(['Breakfast', 'Room Only', 'Meals Not Included']),
            'inclusions' => ['Hotel accommodation', 'Private transport'],
            'visa_included' => fake()->boolean(),
            'flight_included' => false,
            'pricing' => [
                ['sharing_type' => 'double', 'currency' => 'SAR', 'price' => fake()->numberBetween(1500, 3500)],
                ['sharing_type' => 'triple', 'currency' => 'SAR', 'price' => fake()->numberBetween(1200, 2800)],
                ['sharing_type' => 'quad', 'currency' => 'SAR', 'price' => fake()->numberBetween(1000, 2200)],
            ],
            'notes' => null,
            'is_featured' => false,
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
