<?php

namespace App\Console\Commands;

use App\Models\Hotel;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ApplyHotelCorrections extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hotels:apply-corrections';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Apply the 2026-08-04 real-time data corrections to hotels already in the database, without wiping existing rows/images.';

    /**
     * Idempotent, per-hotel field corrections. Safe to re-run — each entry sets an exact
     * final value rather than a relative change. Keyed by slug so it never touches the
     * wrong hotel even if display names change.
     *
     * @return array<string, array<string, mixed>>
     */
    private function corrections(): array
    {
        return [
            'le-meridien-makkah' => [
                'distance_landmark' => 'Approximately 100 metres from King Abdulaziz Gate',
            ],
            'al-shohada-hotel' => [
                'name' => 'Al Shohada Hotel by Palm Rich',
            ],
            'al-muna-kareem-hotel' => [
                'distance_landmark' => 'Approximately 70 metres from Al-Masjid an-Nabawi',
            ],
            'pullman-zamzam-madinah' => [
                'distance_landmark' => "Approximately 100 metres / 3 minutes' walk from Al-Masjid an-Nabawi",
                'amenities' => ['Free High-Speed Wi-Fi', 'Five Dining Venues', 'Paid Indoor Parking', 'Fitness & Spa', 'Meeting Rooms', '24-Hour Room Service', 'Wheelchair Access'],
            ],
            'pullman-zamzam-makkah' => [
                'amenities' => ['Free Wi-Fi', 'Four Dining Venues', 'Breakfast', 'Air Conditioning', 'Room Service', 'Fitness & Spa', 'Paid Parking', 'Accessible Rooms'],
            ],
            'anwar-al-madinah-movenpick' => [
                'distance_landmark' => "Central Bada'ah area, linked to a shopping mall — approximately 1 minute's walk from Al-Masjid an-Nabawi",
            ],
            'madinah-hilton' => [
                'distance_landmark' => "Steps from the northern plaza of Al-Masjid an-Nabawi — approximately 2 minutes' walk",
            ],
            'emaar-royal-hotel-medina' => [
                'distance_landmark' => "Bada'ah central area — approximately 100 metres from Al-Masjid an-Nabawi",
            ],
            'dar-al-taqwa-hotel-madinah' => [
                'distance_landmark' => "Directly beside King Fahd Gate, Al-Masjid an-Nabawi — about 15 minutes' walk to Al-Baqi",
            ],
        ];
    }

    /**
     * APPROXIMATE Google review counts, taken from the research file's "Approx. X.XK"
     * labels (e.g. "Approx. 5.6K" -> 5600). The UI always renders these rounded back to
     * "5.6K", so no false precision reaches a visitor. Covers all 16 hotels, unlike
     * corrections() which only touches the ones with data errors.
     *
     * @return array<string, int>
     */
    private function approximateReviewCounts(): array
    {
        return [
            'dorrar-aleiman-royal-hotel' => 5600,
            'emaar-grand-hotel' => 10600,
            'le-meridien-makkah' => 6200,
            'al-shohada-hotel' => 13600,
            'elaf-kinda-hotel' => 6500,
            'movenpick-hotel-residences-hajar-tower-makkah' => 54700,
            'pullman-zamzam-makkah' => 61600,
            'swissotel-al-maqam-makkah' => 59200,
            'anwar-al-madinah-movenpick' => 49100,
            'grand-millennium-al-haram-hotel' => 7500,
            'al-muna-kareem-hotel' => 3500,
            'pullman-zamzam-madinah' => 38600,
            'emaar-royal-hotel-medina' => 3600,
            'sofitel-shahd-al-madinah' => 25900,
            'madinah-hilton' => 10600,
            'dar-al-taqwa-hotel-madinah' => 11100,
        ];
    }

    /**
     * Multi-value category tags, sourced 2026-08-05 via web research (price tier, room
     * count, guest review consensus) rather than derived from google_rating alone.
     * A hotel can genuinely fit more than one tag.
     *
     * @return array<string, list<string>>
     */
    private function categories(): array
    {
        return [
            'dorrar-aleiman-royal-hotel' => ['Premium', 'Group Hotels'],
            'emaar-grand-hotel' => ['Economy', 'Family', 'Group Hotels'],
            'le-meridien-makkah' => ['Premium', 'VIP'],
            'al-shohada-hotel' => ['Standard', 'Family'],
            'elaf-kinda-hotel' => ['Premium', 'VIP'],
            'movenpick-hotel-residences-hajar-tower-makkah' => ['Premium', 'VIP'],
            'pullman-zamzam-makkah' => ['VIP', 'Group Hotels'],
            'swissotel-al-maqam-makkah' => ['VIP', 'Group Hotels'],
            'anwar-al-madinah-movenpick' => ['Standard', 'Group Hotels'],
            'grand-millennium-al-haram-hotel' => ['Standard'],
            'al-muna-kareem-hotel' => ['Economy', 'Standard'],
            'pullman-zamzam-madinah' => ['Premium', 'Group Hotels'],
            'emaar-royal-hotel-medina' => ['Standard', 'Group Hotels'],
            'sofitel-shahd-al-madinah' => ['Premium', 'VIP'],
            'madinah-hilton' => ['Premium', 'VIP'],
            'dar-al-taqwa-hotel-madinah' => ['Premium', 'Family'],
        ];
    }

    /**
     * Real, client-provided check-in/check-out times (2026-08-04), stored as 24-hour
     * "HH:MM:SS" for the TIME columns. dorrar-aleiman-royal-hotel is intentionally absent —
     * it was not included in the client's list, so its times stay null rather than guessed.
     *
     * @return array<string, array{check_in_time: string, check_out_time: string}>
     */
    private function checkInOutTimes(): array
    {
        return [
            'le-meridien-makkah' => ['check_in_time' => '15:00:00', 'check_out_time' => '12:00:00'],
            'emaar-grand-hotel' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'al-shohada-hotel' => ['check_in_time' => '16:00:00', 'check_out_time' => '13:00:00'],
            'elaf-kinda-hotel' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'movenpick-hotel-residences-hajar-tower-makkah' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'pullman-zamzam-makkah' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'swissotel-al-maqam-makkah' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'anwar-al-madinah-movenpick' => ['check_in_time' => '17:00:00', 'check_out_time' => '12:00:00'],
            'grand-millennium-al-haram-hotel' => ['check_in_time' => '16:00:00', 'check_out_time' => '14:00:00'],
            'al-muna-kareem-hotel' => ['check_in_time' => '16:00:00', 'check_out_time' => '11:00:00'],
            'pullman-zamzam-madinah' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'emaar-royal-hotel-medina' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'sofitel-shahd-al-madinah' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'madinah-hilton' => ['check_in_time' => '16:00:00', 'check_out_time' => '12:00:00'],
            'dar-al-taqwa-hotel-madinah' => ['check_in_time' => '17:00:00', 'check_out_time' => '12:30:00'],
        ];
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $missingSlugs = [];

        DB::transaction(function () use (&$missingSlugs): void {
            // google_data_checked_at comes from the research file's own "Last Checked" column,
            // giving the google_rating values real provenance so they can be displayed.
            Hotel::query()->update([
                'google_data_checked_at' => '2026-07-31',
            ]);

            foreach ($this->approximateReviewCounts() as $slug => $count) {
                Hotel::where('slug', $slug)->update(['google_review_count' => $count]);
            }

            foreach ($this->categories() as $slug => $tags) {
                Hotel::where('slug', $slug)->update(['categories' => $tags]);
            }

            foreach ($this->checkInOutTimes() as $slug => $times) {
                Hotel::where('slug', $slug)->update($times);
            }

            foreach ($this->corrections() as $slug => $fields) {
                $hotel = Hotel::where('slug', $slug)->first();

                if (! $hotel) {
                    $missingSlugs[] = $slug;

                    continue;
                }

                $hotel->update($fields);
                $this->info("Corrected {$hotel->name} ({$slug}): ".implode(', ', array_keys($fields)));
            }
        });

        if ($missingSlugs !== []) {
            $this->error('No hotel found for slug(s): '.implode(', ', $missingSlugs));

            return self::FAILURE;
        }

        return self::SUCCESS;
    }
}
