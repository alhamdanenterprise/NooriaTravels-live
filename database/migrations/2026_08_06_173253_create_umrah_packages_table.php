<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('umrah_packages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();

            // Verbatim label (e.g. "15 Days / 14 Nights") — source formats aren't consistent
            // enough to compute reliably, so it's stored as given rather than derived.
            $table->string('duration_label');
            $table->unsignedTinyInteger('makkah_nights');
            $table->unsignedTinyInteger('madinah_nights');

            $table->string('makkah_hotel_name');
            $table->unsignedTinyInteger('makkah_hotel_stars');
            $table->string('madinah_hotel_name');
            $table->unsignedTinyInteger('madinah_hotel_stars');

            $table->string('meal_plan');

            // Verbatim "Included:" bullet list per package (transport scope wording lives
            // here too, e.g. "Private car from airport to Makkah hotel").
            $table->json('inclusions');

            $table->boolean('visa_included')->default(false);
            $table->boolean('flight_included')->default(false);

            // Array of {sharing_type, currency, price}. sharing_type is null for the flat,
            // no-tier PKR packages (6-8) instead of double/triple/quad for the SAR ones (1-5).
            $table->json('pricing');

            $table->text('notes')->nullable();

            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umrah_packages');
    }
};
