import SiteLayout from '@/layouts/site-layout';
import ServicesSection from '@/pages/home/services-section';
import ServicesHeroSection from '@/pages/services/hero-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Services() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Our Services" />

            <ServicesHeroSection />
            <ServicesSection />
        </SiteLayout>
    );
}
