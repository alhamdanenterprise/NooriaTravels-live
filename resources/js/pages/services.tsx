import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import ServicesSection from '@/pages/home/services-section';
import ServicesHeroSection from '@/pages/services/hero-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Services() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Our Services | Umrah, Visas, Flights, Hotels & Tours">
                {seoTags({
                    title: 'Our Services | Umrah, Visas, Flights, Hotels & Tours',
                    description:
                        "Explore Nooria Travels' complete range of services — Umrah packages, Saudi visit visas, air ticketing, hotel bookings, transportation & tours.",
                    path: '/services',
                    image: '/images/services-page.png',
                })}
            </Head>

            <ServicesHeroSection />
            <ServicesSection />
        </SiteLayout>
    );
}
