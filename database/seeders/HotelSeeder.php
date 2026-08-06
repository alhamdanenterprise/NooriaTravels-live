<?php

namespace Database\Seeders;

use App\Models\Hotel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Sourced from client-provided hotel research (Makkah & Madinah, checked 2026-07-31),
     * corrected 2026-08-04 against the client's real-time supplier/on-the-ground data.
     *
     * `categories` (2026-08-05) is a list, not a single value — a hotel can genuinely fit
     * more than one listing tab (e.g. large + iconic = both VIP and Group Hotels). Sourced
     * per-hotel from web research (price tier, room count, guest review consensus) rather
     * than derived from google_rating alone. See the per-hotel research notes below for
     * the reasoning behind each hotel's tags.
     *
     * `google_review_count` holds the APPROXIMATE counts from the research file's
     * "Approx. X.XK" labels (e.g. "Approx. 5.6K" -> 5600). The UI always renders these
     * rounded back to "5.6K", so no false precision is ever shown to a visitor — do not
     * present these as exact review totals anywhere.
     *
     * `check_in_time` / `check_out_time` (2026-08-04) are the client's real, per-hotel
     * times. Dorrar Aleiman Royal Hotel was not included in the client's list, so it is
     * deliberately left without these keys (nullable) rather than guessed.
     *
     * Deliberately NOT set here (nullable, left for the client to confirm):
     * - google_place_id — no verified Place IDs were supplied; inventing one would break
     *   any future Places API lookup.
     */
    public function run(): void
    {
        collect($this->hotels())->each(function (array $hotel, int $index): void {
            // Slugs are stable identifiers (they key the image folders in
            // public/images/hotels/{slug}/) — a display-name correction must never change
            // one. Only fall back to deriving from the name for hotels that don't pin a slug.
            $slug = $hotel['slug'] ?? Str::slug($hotel['name']);

            Hotel::create([
                'accepting_enquiries' => true,
                'gallery' => [],
                // The research file recorded this as its "Last Checked" date for every row —
                // real provenance for the google_rating values, so the ratings can be shown.
                'google_data_checked_at' => '2026-07-31',
                ...$hotel,
                'slug' => $slug,
                'sort_order' => $index,
            ]);
        });
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function hotels(): array
    {
        return [
            // ---------- Makkah ----------
            [
                'name' => 'Dorrar Aleiman Royal Hotel',
                'city' => 'Makkah',
                'google_rating' => 4.1,
                'google_review_count' => 5600,
                // Category note: Premium/VIP-adjacent, ~810 rooms — large-capacity upscale property near Haram.
                'categories' => ['Premium', 'Group Hotels'],
                'distance_landmark' => 'Ajyad Street, Abraj Al Safwah — near King Abdul Aziz Gate and the Haram',
                'description' => 'Polished pilgrimage hotel in the Abraj Al Safwah complex, offering family-friendly rooms and convenient access to Masjid al-Haram.',
                'amenities' => ['Free Wi-Fi', 'Air Conditioning', 'Restaurant', 'Room Service', '24-Hour Front Desk', 'Minibar (Selected Rooms)', 'Elevators'],
                'room_types' => ['Double/Twin', 'Triple', 'Quadruple', 'Family Rooms', 'Junior Suite', 'Executive Suite'],
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=DORRAR+ALEIMAN+ROYAL+HOTEL%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Emaar Grand Hotel',
                'city' => 'Makkah',
                'google_rating' => 4.1,
                'google_review_count' => 10600,
                // Category note: Widely described as budget-friendly and family-suited; ~606 rooms supports groups.
                'categories' => ['Economy', 'Family', 'Group Hotels'],
                'distance_landmark' => "Ibrahim Al Khalil Road — roughly 12–15 minutes' walk to Masjid al-Haram / Clock Towers",
                'description' => 'Large, modern high-rise hotel with approximately 606 rooms, two halal restaurants and a coffee shop.',
                'amenities' => ['Free Wi-Fi', 'Air Conditioning', 'Two Restaurants', 'Coffee Shop', 'Room Service', '24-Hour Reception', 'Elevators'],
                'room_types' => ['Double/Twin', 'Triple', 'Quadruple', 'Family Rooms', 'Suites'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Emaar+Grand+Hotel%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Le Méridien Makkah',
                'city' => 'Makkah',
                'google_rating' => 4.3,
                'google_review_count' => 6200,
                // Category note: Marriott flagship with refined rooms; not mass-scale, so Premium not Group Hotels.
                'categories' => ['Premium', 'VIP'],
                // Corrected 2026-08-04: was "About 550 metres from Masjid al-Haram" (wrong reference point/distance).
                'distance_landmark' => 'Approximately 100 metres from King Abdulaziz Gate',
                'description' => 'Upscale Marriott hotel with refined rooms and suites, Arabic/Asian dining and selected views toward the Holy Mosque.',
                'amenities' => ['Two Restaurants', 'Free Wi-Fi', '24-Hour Room Service', 'Concierge', 'Business Services', 'Air Conditioning', 'Accessible Rooms'],
                'room_types' => ['Classic King/Twin', 'Deluxe King/Twin', 'Junior Suite', 'Diplomatic Suite', 'Royal Suite'],
                'check_in_time' => '15:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Le+Meridien+Makkah%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                // Corrected 2026-08-04: was "Al Shohada Hotel". Slug pinned so the rename
                // doesn't break the al-shohada-hotel/ image folder or any existing links.
                'name' => 'Al Shohada Hotel by Palm Rich',
                'slug' => 'al-shohada-hotel',
                'city' => 'Makkah',
                'google_rating' => 4.3,
                'google_review_count' => 13600,
                // Category note: Solidly mid-range (avg ~$96/night); Quadruple/Family Suite room types.
                'categories' => ['Standard', 'Family'],
                'distance_landmark' => "Ajyad Street — approximately 10–15 minutes' walk to Masjid al-Haram",
                'description' => 'Formal hotel with traditionally styled rooms, a restaurant and a lounge, serving pilgrims and families.',
                'amenities' => ['Free Wi-Fi', 'Paid Parking', 'Air Conditioning', 'Restaurant', 'Room Service', 'Laundry', 'Wheelchair Access'],
                'room_types' => ['Double/Twin City View', 'Triple', 'Quadruple', 'Junior Suite', 'Family Suite', 'Presidential Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '13:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Al+Shohada+Hotel%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Elaf Kinda Hotel',
                'city' => 'Makkah',
                'google_rating' => 4.4,
                'google_review_count' => 6500,
                // Category note: Beside Clock Towers with selected Haram-view rooms; genuinely upscale + iconic zone.
                'categories' => ['Premium', 'VIP'],
                'distance_landmark' => "Approximately 4 minutes' walk from Masjid al-Haram and the Kaaba — beside the Clock Towers area",
                'description' => 'Sophisticated high-rise hotel with modern rooms and suites, including selected Haram-view accommodation.',
                'amenities' => ['Free Wi-Fi', 'Air Conditioning', 'Restaurant', 'Paid Breakfast', 'Airport Shuttle (Optional)', 'Business Facilities', 'Accessible Rooms'],
                'room_types' => ['Twin', 'Quadruple', 'Junior Suite (Haram View)', 'Executive Suite (Haram View)', 'Family Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Elaf+Kinda+Hotel%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Mövenpick Hotel & Residences Hajar Tower Makkah',
                'city' => 'Makkah',
                'google_rating' => 4.6,
                'google_review_count' => 54700,
                // Category note: 31-storey tower with Kaaba-view Royal Suites — textbook VIP positioning.
                'categories' => ['Premium', 'VIP'],
                'distance_landmark' => 'Inside Abraj Al Bait, directly on the Haram Court and facing King Abdul Aziz Gate',
                'description' => 'Luxury hotel and residences in the Clock Towers complex, with Holy City, Haram and Kaaba views in selected rooms.',
                'amenities' => ['Free Wi-Fi', 'Five Dining Venues', 'Room Service', 'Air Conditioning', 'Minibar', 'Shopping Access', '24-Hour Reception', 'Accessible Facilities'],
                'room_types' => ['Classic King/Twin', 'Deluxe', 'Executive', 'Family Rooms', 'Junior Suite', 'Executive Suite', 'Royal Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Movenpick+Hotel+Hajar+Tower+Makkah%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => true,
            ],
            [
                'name' => 'Pullman ZamZam Makkah',
                'city' => 'Makkah',
                'google_rating' => 4.6,
                'google_review_count' => 61600,
                // Category note: ~1,301 rooms inside Abraj Al Bait/Clock Towers — iconic location + huge capacity.
                'categories' => ['VIP', 'Group Hotels'],
                'distance_landmark' => 'Abraj Al Bait / Clock Towers, directly adjoining Masjid al-Haram and facing King Abdulaziz Gate',
                'description' => 'Large upscale hotel with about 1,301 rooms and suites, including accommodation with Kaaba views.',
                // Corrected 2026-08-04: was "Three Dining Options".
                'amenities' => ['Free Wi-Fi', 'Four Dining Venues', 'Breakfast', 'Air Conditioning', 'Room Service', 'Fitness & Spa', 'Paid Parking', 'Accessible Rooms'],
                'room_types' => ['Classic', 'Superior', 'Deluxe', 'Triple/Quadruple', 'Junior Suite', 'Executive Suite', 'Royal Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Pullman+ZamZam+Makkah%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => true,
            ],
            [
                'name' => 'Swissôtel Al Maqam Makkah',
                'city' => 'Makkah',
                'google_rating' => 4.8,
                'google_review_count' => 59200,
                // Category note: ~1,487 rooms (largest of the set), Clock Towers complex, Kaaba-view suites.
                'categories' => ['VIP', 'Group Hotels'],
                'distance_landmark' => 'Clock Towers complex, immediate vicinity of Masjid al-Haram, with direct mall/tunnel access',
                'description' => 'Premium high-rise hotel with refined rooms and suites overlooking the Holy City, Haram or Kaaba in selected categories.',
                'amenities' => ['Free Wi-Fi', 'Air Conditioning', 'Restaurants', 'Room Service', 'Direct Mall/Tunnel Access', 'Business Facilities', 'Accessible Rooms'],
                'room_types' => ['Classic', 'Premier', 'Swiss Executive', 'Residential/Family Suite', 'Presidential Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Swissotel+Al+Maqam+Makkah%2C+Makkah%2C+Saudi+Arabia',
                'is_featured' => true,
            ],

            // ---------- Madinah ----------
            [
                'name' => 'Anwar Al Madinah Mövenpick',
                'city' => 'Madinah',
                'google_rating' => 4.5,
                'google_review_count' => 49100,
                // Category note: ~1,374 rooms, but guest reviews (3/5) run below the 5-star label — real capacity, mid-tier experience.
                'categories' => ['Standard', 'Group Hotels'],
                // Corrected 2026-08-04: was "a few minutes' walk" — client confirmed ~1 minute.
                'distance_landmark' => "Central Bada'ah area, linked to a shopping mall — approximately 1 minute's walk from Al-Masjid an-Nabawi",
                'description' => 'Large upscale hotel with bright rooms and suites, several dining options and direct shopping access.',
                'amenities' => ['Free Wi-Fi', 'Restaurants', '24-Hour Room Service', 'Paid Indoor Parking', 'EV Charging', 'Buffet Breakfast', 'Air Conditioning', 'Wheelchair Access'],
                'room_types' => ['Classic', 'Superior', 'Executive', 'Family Suite', 'Executive Suite', 'Presidential Suite'],
                'check_in_time' => '17:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Anwar+Al+Madinah+Movenpick%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Grand Millennium Al Haram Hotel',
                'city' => 'Madinah',
                'google_rating' => 4.3,
                'google_review_count' => 7500,
                // Category note: Solid, unremarkable mid-range: clean and comfortable, nothing standout either way.
                'categories' => ['Standard'],
                'distance_landmark' => 'Less than 350 feet (about 107 metres) from Al Haram',
                'description' => 'Refined Muslim-friendly hotel with approximately 606 rooms, warm interiors, restaurants and a café.',
                'amenities' => ['Free Wi-Fi', 'Parking', 'Restaurants', 'Air Conditioning', 'Minibar', 'Satellite TV', 'Work Desk', 'Premium Bedding', 'Accessible Facilities'],
                'room_types' => ['Deluxe King/Twin', 'Triple', 'Quadruple', 'Executive Room', 'Junior Suite', 'Executive Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '14:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Grand+Millennium+Al+Haram+Hotel%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Al-Muna Kareem Hotel',
                'city' => 'Madinah',
                'google_rating' => 4.3,
                'google_review_count' => 3500,
                // Category note: Guest consensus is affordable-to-mid-range.
                'categories' => ['Economy', 'Standard'],
                // Corrected 2026-08-04: was "Approximately 14 minutes' walk".
                'distance_landmark' => 'Approximately 70 metres from Al-Masjid an-Nabawi',
                'description' => 'Comfortable hotel with sleek rooms and suites and a restaurant serving local and international cuisine.',
                'amenities' => ['Free Parking', 'Free Wi-Fi', 'Breakfast (Rate-Dependent)', 'Air Conditioning', 'Restaurant', 'Room Service', 'Business Centre'],
                'room_types' => ['Standard Double/Twin', 'Triple', 'Quadruple/Family Room', 'Junior Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '11:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Al+Muna+Kareem+Hotel%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Pullman Zamzam Madinah',
                'city' => 'Madinah',
                'google_rating' => 4.6,
                'google_review_count' => 38600,
                // Category note: ~834 rooms adjacent to the mosque, consistently "very good" guest scores.
                'categories' => ['Premium', 'Group Hotels'],
                // Corrected 2026-08-04: was "Approximately 250 metres / 2–5 minutes' walk".
                'distance_landmark' => "Approximately 100 metres / 3 minutes' walk from Al-Masjid an-Nabawi",
                'description' => 'Contemporary Arabian-inspired tower with roughly 834–835 rooms and suites, dining venues and a tea garden.',
                // Corrected 2026-08-04: was "Four Dining Venues".
                'amenities' => ['Free High-Speed Wi-Fi', 'Five Dining Venues', 'Paid Indoor Parking', 'Fitness & Spa', 'Meeting Rooms', '24-Hour Room Service', 'Wheelchair Access'],
                'room_types' => ['Classic', 'Superior', 'Deluxe King/Twin', 'Junior Suite', 'Executive Suite', 'Royal Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Pullman+Zamzam+Madinah%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Emaar Royal Hotel Medina',
                'city' => 'Madinah',
                'google_rating' => 4.3,
                'google_review_count' => 3600,
                // Category note: ~481 rooms; mixed review signal (3\u2605 Tripadvisor vs "wonderful" elsewhere) \u2014 solid mid-tier capacity, not luxury.
                'categories' => ['Standard', 'Group Hotels'],
                // Corrected 2026-08-04: was "approximately 5–8 minutes' walk".
                'distance_landmark' => "Bada'ah central area — approximately 100 metres from Al-Masjid an-Nabawi",
                'description' => 'Large central pilgrimage hotel with modern accommodation and convenient access to the mosque.',
                'amenities' => ['Free Parking', 'Free Wi-Fi', 'Air Conditioning', 'Breakfast Options', 'Restaurant', '24-Hour Front Desk'],
                'room_types' => ['Twin', 'Triple', 'Quadruple', 'Family Rooms', 'Suites'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Emaar+Royal+Hotel+Medina%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Sofitel Shahd Al Madinah',
                'city' => 'Madinah',
                'google_rating' => 4.7,
                'google_review_count' => 25900,
                // Category note: Ranked #1 of 259 hotels in Medina \u2014 the clearest VIP case in the set.
                'categories' => ['Premium', 'VIP'],
                'distance_landmark' => "Northern side of Al-Masjid an-Nabawi — roughly 3–5 minutes' walk, convenient for the women's gates",
                'description' => 'Luxury Sofitel hotel with elegant rooms and suites, premium dining and a central location.',
                'amenities' => ['Free Wi-Fi', 'Paid Parking', 'Air Conditioning', 'Fitness Facilities', 'Restaurant', 'Room Service', 'Laundry', 'Business Centre', 'Smoke-Free Rooms', 'Accessible Rooms'],
                'room_types' => ['Superior', 'Luxury', 'Club Millésime', 'Prestige Suite', 'Opera Suite', 'Imperial Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Sofitel+Shahd+Al+Madinah%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => true,
            ],
            [
                'name' => 'Madinah Hilton',
                'city' => 'Madinah',
                'google_rating' => 4.5,
                'google_review_count' => 10600,
                // Category note: Global Hilton flagship, 2-minute walk to the mosque, consistently "very good".
                'categories' => ['Premium', 'VIP'],
                // Corrected 2026-08-04: was "typically 2–5 minutes' walk".
                'distance_landmark' => "Steps from the northern plaza of Al-Masjid an-Nabawi — approximately 2 minutes' walk",
                'description' => 'Full-service Hilton with classic rooms and suites, restaurants, lounge and meeting facilities.',
                'amenities' => ['Free Wi-Fi', 'Parking', 'Restaurants', 'Air Conditioning', 'Room Service', 'Business & Meeting Facilities', 'Accessible Rooms'],
                'room_types' => ['King/Twin Guest Room', 'Deluxe', 'Executive', 'Junior Suite', 'Presidential Suite', 'Royal Suite'],
                'check_in_time' => '16:00:00',
                'check_out_time' => '12:00:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Madinah+Hilton%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
            [
                'name' => 'Dar Al-Taqwa Hotel Madinah',
                'city' => 'Madinah',
                'google_rating' => 4.4,
                'google_review_count' => 11100,
                // Category note: Smaller at ~194 rooms but highest guest score in the set (9.0) \u2014 boutique, quieter, family-suited.
                'categories' => ['Premium', 'Family'],
                // Corrected 2026-08-04: was "Directly opposite Al-Masjid an-Nabawi / King Fahd Gate".
                'distance_landmark' => "Directly beside King Fahd Gate, Al-Masjid an-Nabawi — about 15 minutes' walk to Al-Baqi",
                'description' => 'Lavish central hotel with mosque-view rooms and suites, dining and breakfast services.',
                'amenities' => ['Free Wi-Fi', 'Air Conditioning', 'Restaurant', 'Room Service', 'Paid Breakfast', 'Paid Parking', 'Accessible Facilities'],
                'room_types' => ['Deluxe Room', 'Executive Room', 'Haram-View Room', 'Junior Suite', 'Executive Suite', 'Royal Taqwa Suite (Haram View)'],
                'check_in_time' => '17:00:00',
                'check_out_time' => '12:30:00',
                'google_maps_url' => 'https://www.google.com/maps/search/?api=1&query=Dar+Al+Taqwa+Hotel+Madinah%2C+Madinah%2C+Saudi+Arabia',
                'is_featured' => false,
            ],
        ];
    }
}
