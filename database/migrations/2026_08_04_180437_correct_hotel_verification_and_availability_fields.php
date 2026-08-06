<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            // Renamed from is_available: this site has no live inventory, so the column
            // now honestly represents "we're taking enquiries for this hotel", not real-time
            // room availability.
            $table->boolean('accepting_enquiries')->default(true)->after('is_active');

            $table->unsignedInteger('google_review_count')->nullable()->after('google_rating');
            $table->string('google_place_id')->nullable()->after('google_review_count');
            $table->timestamp('google_data_checked_at')->nullable()->after('google_place_id');
        });

        DB::statement('UPDATE hotels SET accepting_enquiries = is_available');

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn(['is_available', 'google_reviews_label']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->boolean('is_available')->default(true)->after('is_active');
            $table->string('google_reviews_label')->nullable()->after('google_rating');
        });

        DB::statement('UPDATE hotels SET is_available = accepting_enquiries');

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn(['accepting_enquiries', 'google_review_count', 'google_place_id', 'google_data_checked_at']);
        });
    }
};
