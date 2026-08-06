<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\HotelFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Hotel extends Model
{
    /** @use HasFactory<HotelFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'city',
        'google_rating',
        'google_review_count',
        'google_place_id',
        'google_data_checked_at',
        'categories',
        'distance_landmark',
        'description',
        'amenities',
        'room_types',
        'check_in_time',
        'check_out_time',
        'google_maps_url',
        'image',
        'gallery',
        'is_featured',
        'is_active',
        'accepting_enquiries',
        'sort_order',
    ];

    /**
     * @var list<string>
     */
    protected $appends = ['highlights'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'google_rating' => 'decimal:1',
            'google_review_count' => 'integer',
            'google_data_checked_at' => 'datetime',
            'categories' => 'array',
            'amenities' => 'array',
            'room_types' => 'array',
            'gallery' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'accepting_enquiries' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * check_in_time/check_out_time are stored as real SQL TIME values ("15:00:00").
     * Format for display without mutating what's written to the column.
     */
    public function getCheckInTimeAttribute(?string $value): ?string
    {
        return $value ? Carbon::parse($value)->format('g:i A') : null;
    }

    public function getCheckOutTimeAttribute(?string $value): ?string
    {
        return $value ? Carbon::parse($value)->format('g:i A') : null;
    }

    /**
     * Marketing highlight cards for the hotel popup, derived from the hotel's own data
     * plus a handful of claims that hold true for every hotel Nooria Travels lists.
     *
     * @return array<int, array{icon: string, title: string, description: string}>
     */
    public function getHighlightsAttribute(): array
    {
        $roomTypes = collect($this->room_types ?? []);
        $amenities = collect($this->amenities ?? []);
        $nearMosque = str_contains($this->city ?? '', 'Makkah') ? 'Masjid al-Haram' : 'Al-Masjid an-Nabawi';

        $hasFamilyRooms = $roomTypes->contains(fn (string $type) => str_contains(Str::lower($type), 'family'));
        $diningAmenities = $amenities->filter(fn (string $amenity) => Str::contains(Str::lower($amenity), ['restaurant', 'dining', 'breakfast']));

        return [
            [
                'icon' => 'star',
                'title' => 'Quality Stay',
                'description' => 'Comfortable accommodation with attentive, pilgrim-focused service.',
            ],
            [
                'icon' => 'landmark',
                'title' => str_contains($this->city ?? '', 'Makkah') ? 'Steps from Haram' : 'Near Masjid an-Nabawi',
                'description' => $this->distance_landmark ?: "Conveniently located near {$nearMosque}.",
            ],
            [
                'icon' => 'users',
                'title' => $hasFamilyRooms ? 'Ideal for Families' : 'Comfortable Stays',
                'description' => $hasFamilyRooms
                    ? 'Spacious rooms and family-friendly facilities for a comfortable stay.'
                    : 'Well-appointed rooms designed for a restful, comfortable stay.',
            ],
            [
                'icon' => 'compass',
                'title' => 'Pilgrim Focused',
                'description' => 'Designed for pilgrims with spiritual comfort and a peaceful environment.',
            ],
            [
                'icon' => 'utensils',
                'title' => 'Dining Excellence',
                'description' => $diningAmenities->isNotEmpty()
                    ? 'Multiple restaurants offering international and local cuisines.'
                    : 'Convenient on-site dining options for every meal.',
            ],
            [
                'icon' => 'headset',
                'title' => 'Multilingual Support',
                'description' => 'Our team speaks Arabic, English, Urdu and more to assist you.',
            ],
            [
                'icon' => 'map-pin',
                'title' => 'Nearby Access',
                'description' => "Close to {$nearMosque}, local markets and key shopping areas.",
            ],
            [
                'icon' => 'moon',
                'title' => 'Spiritual Comfort',
                'description' => 'Peaceful atmosphere to help you focus on your ibadah.',
            ],
        ];
    }
}
