<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Attach hardening headers to every response.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Generated up front (before the route/view renders) so Blade can tag inline
        // scripts (Ziggy's @routes, the JSON-LD block) with a nonce that matches the
        // Content-Security-Policy header set below, instead of allowing 'unsafe-inline'.
        $nonce = base64_encode(random_bytes(16));
        View::share('cspNonce', $nonce);

        $response = $next($request);

        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

        if ($request->secure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        if ($this->shouldSendContentSecurityPolicy()) {
            $response->headers->set('Content-Security-Policy', implode('; ', [
                "default-src 'self'",
                // googletagmanager.com is also allowed by nonce alone, but listed explicitly
                // per Google's own recommended CSP for gtag.js.
                "script-src 'self' 'nonce-{$nonce}' https://www.googletagmanager.com",
                "style-src 'self' 'unsafe-inline' https://fonts.bunny.net",
                "font-src 'self' https://fonts.bunny.net",
                "img-src 'self' data: https://www.google-analytics.com",
                // EmailJS is called directly from the browser by the contact form; the
                // google-analytics.com/analytics.google.com hosts are gtag.js's own hit
                // endpoints (regional subdomains included), which nonces don't cover.
                "connect-src 'self' https://api.emailjs.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
                // GTM's <noscript> fallback loads an iframe from this host; frame-src is
                // unset otherwise, which falls back to default-src 'self' and blocks it.
                'frame-src https://www.googletagmanager.com',
                "object-src 'none'",
                "base-uri 'self'",
                "frame-ancestors 'none'",
            ]));
        }

        return $response;
    }

    /**
     * Only enforce CSP in production so local Vite dev tooling is never blocked.
     */
    private function shouldSendContentSecurityPolicy(): bool
    {
        return app()->isProduction();
    }
}
