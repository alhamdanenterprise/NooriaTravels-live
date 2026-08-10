<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <meta name="apple-mobile-web-app-title" content="Nooria Travels">
        <link rel="manifest" href="/site.webmanifest">
        <meta name="theme-color" content="#024194">
        <meta name="google-site-verification" content="J8IanLq9YeUaYkbTlONHwDj0c35P6R6NzdzpK5dcr0Q">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=cormorant-garamond:600,700|montserrat:400,500,600,700" rel="stylesheet" />

        <script type="application/ld+json" nonce="{{ $cspNonce }}">
            @verbatim
            {
                "@context": "https://schema.org",
                "@type": "TravelAgency",
                "name": "Nooria Travels",
                "url": "https://nooriatravels.com",
                "logo": "https://nooriatravels.com/images/logo.png",
                "image": "https://nooriatravels.com/images/hero.jpg",
                "description": "Nooria Travels is a trusted travel agency offering Umrah packages, visit visas, air tickets, hotels, and transportation across Saudi Arabia.",
                "telephone": ["+92-336-5099416", "+44-7756-980031"],
                "email": "nooriatraveltours@gmail.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "19/19-A, Dawn Plaza, Bank Road, Saddar",
                    "addressLocality": "Rawalpindi",
                    "addressCountry": "PK"
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "19:00"
                },
                "sameAs": [
                    "https://www.facebook.com/people/Nooria-Travels/61592861034003/",
                    "https://www.instagram.com/nooriatravelntours/",
                    "https://www.tiktok.com/@nooriatravelntours"
                ]
            }
            @endverbatim
        </script>

        @routes(null, $cspNonce)
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
