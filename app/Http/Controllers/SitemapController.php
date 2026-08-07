<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Every public-facing route on the site, with its relative SEO priority and how often it
     * realistically changes. Kept as a plain list (rather than generated from routes/web.php)
     * since it deliberately excludes auth/settings/dashboard routes that aren't public pages.
     *
     * @var array<int, array{path: string, priority: string, changefreq: string}>
     */
    private const PAGES = [
        ['path' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
        ['path' => '/umrah-packages', 'priority' => '0.9', 'changefreq' => 'weekly'],
        ['path' => '/hotels-accommodation', 'priority' => '0.8', 'changefreq' => 'weekly'],
        ['path' => '/services', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['path' => '/about', 'priority' => '0.6', 'changefreq' => 'monthly'],
        ['path' => '/transportation', 'priority' => '0.6', 'changefreq' => 'monthly'],
        ['path' => '/contact', 'priority' => '0.6', 'changefreq' => 'monthly'],
        ['path' => '/visit-visa', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ['path' => '/air-ticketing', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ['path' => '/tours', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ['path' => '/privacy-policy', 'priority' => '0.3', 'changefreq' => 'yearly'],
        ['path' => '/terms-and-conditions', 'priority' => '0.3', 'changefreq' => 'yearly'],
    ];

    public function index(): Response
    {
        $baseUrl = rtrim(config('app.url'), '/');

        $urls = collect(self::PAGES)->map(fn (array $page) => sprintf(
            '  <url><loc>%s%s</loc><priority>%s</priority><changefreq>%s</changefreq></url>',
            $baseUrl,
            $page['path'],
            $page['priority'],
            $page['changefreq'],
        ))->implode("\n");

        $xml = <<<XML
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {$urls}
        </urlset>
        XML;

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
