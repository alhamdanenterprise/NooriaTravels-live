<?php

namespace App\Console\Commands;

use App\Models\Hotel;
use Illuminate\Console\Command;

class SyncHotelImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hotels:sync-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate each hotel\'s cover image and gallery from public/images/hotels/{slug}/';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Hotel::query()->each(function (Hotel $hotel): void {
            $directory = public_path("images/hotels/{$hotel->slug}");

            if (! is_dir($directory)) {
                $this->warn("Skipped {$hotel->name}: no folder at images/hotels/{$hotel->slug}");

                return;
            }

            $files = glob($directory.'/*.{jpg,jpeg,png,webp}', GLOB_BRACE) ?: [];

            if ($files === []) {
                $this->warn("Skipped {$hotel->name}: folder exists but has no images");

                return;
            }

            natsort($files);

            $paths = collect($files)
                ->values()
                ->map(fn (string $file) => '/images/hotels/'.$hotel->slug.'/'.basename($file))
                ->all();

            $hotel->update([
                'image' => $paths[0],
                'gallery' => $paths,
            ]);

            $this->info("Updated {$hotel->name}: ".count($paths).' images');
        });
    }
}
