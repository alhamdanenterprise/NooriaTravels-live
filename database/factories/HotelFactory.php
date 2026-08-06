<?php

namespace Database\Factories;

use App\Models\Hotel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Hotel>
 */
class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->company().' Hotel';

        return [
            'name' => $name,
            'slug' => str($name)->slug(),
            'city' => fake()->randomElement(['Makkah', 'Madinah']),
            'google_rating' => fake()->randomFloat(1, 3.5, 5),
            'google_review_count' => null,
            'google_place_id' => null,
            'google_data_checked_at' => null,
            'categories' => fake()->randomElements(['Economy', 'Standard', 'Premium', 'VIP', 'Family', 'Group Hotels'], fake()->numberBetween(1, 2)),
            'distance_landmark' => fake()->numberBetween(50, 800).' metres from the Haram',
            'description' => fake()->paragraph(),
            'amenities' => fake()->randomElements(['Free Wi-Fi', 'Air Conditioning', 'Restaurant', 'Room Service', '24-Hour Front Desk', 'Elevator'], 3),
            'room_types' => fake()->randomElements(['Double/Twin', 'Triple', 'Quadruple', 'Family Suite', 'Junior Suite'], 3),
            'check_in_time' => null,
            'check_out_time' => null,
            'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query='.urlencode($name),
            'image' => null,
            'gallery' => [],
            'is_featured' => fake()->boolean(30),
            'is_active' => true,
            'accepting_enquiries' => true,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }
}
