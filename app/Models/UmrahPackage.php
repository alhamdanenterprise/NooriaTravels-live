<?php

namespace App\Models;

use Database\Factories\UmrahPackageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UmrahPackage extends Model
{
    /** @use HasFactory<UmrahPackageFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $appends = ['categories'];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'title',
        'description',
        'image',
        'duration_label',
        'makkah_nights',
        'madinah_nights',
        'makkah_hotel_name',
        'makkah_hotel_stars',
        'madinah_hotel_name',
        'madinah_hotel_stars',
        'meal_plan',
        'inclusions',
        'visa_included',
        'flight_included',
        'pricing',
        'notes',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'makkah_nights' => 'integer',
            'madinah_nights' => 'integer',
            'makkah_hotel_stars' => 'integer',
            'madinah_hotel_stars' => 'integer',
            'inclusions' => 'array',
            'visa_included' => 'boolean',
            'flight_included' => 'boolean',
            'pricing' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Listing-page filter tags, derived from hotel star ratings and flight inclusion rather
     * than a stored column — keeps the filter set (Economy/Premium/Ticket Included) always
     * consistent with the package's own real data instead of a separately maintained field.
     *
     * @return array<int, string>
     */
    public function getCategoriesAttribute(): array
    {
        $categories = [];

        if ($this->makkah_hotel_stars <= 2) {
            $categories[] = 'Economy';
        }

        if ($this->makkah_hotel_stars >= 4) {
            $categories[] = 'Premium';
        }

        if ($this->flight_included) {
            $categories[] = 'Ticket Included';
        }

        return $categories;
    }
}
