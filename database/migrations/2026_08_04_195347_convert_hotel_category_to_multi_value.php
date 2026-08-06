<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * A hotel can genuinely fit more than one listing category (e.g. a large 5-star
     * property can be both VIP and Group Hotels), so `category` (single string) becomes
     * `categories` (json array). No data project has shipped yet, so this drops the old
     * column rather than migrating values — the seeder repopulates real values fresh.
     */
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->json('categories')->nullable()->after('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn('categories');
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->string('category')->nullable()->after('city');
        });
    }
};
