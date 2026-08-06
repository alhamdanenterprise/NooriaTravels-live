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
        Schema::table('hotels', function (Blueprint $table) {
            // Real SQL TIME columns (stored as 24-hour "HH:MM:SS") rather than free-text —
            // the Hotel model formats these for display (see getCheckInTimeAttribute()).
            $table->time('check_in_time')->nullable()->after('room_types');
            $table->time('check_out_time')->nullable()->after('check_in_time');
            $table->boolean('is_available')->default(true)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn(['check_in_time', 'check_out_time', 'is_available']);
        });
    }
};
