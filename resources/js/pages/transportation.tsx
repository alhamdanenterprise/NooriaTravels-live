import SiteLayout from '@/layouts/site-layout';
import TransportationCtaSection from '@/pages/transportation/cta-section';
import TransportationHeroSection from '@/pages/transportation/hero-section';
import TransportationVehicleOptionsSection from '@/pages/transportation/vehicle-options-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Transportation() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Transportation" />

            <TransportationHeroSection />
            <TransportationVehicleOptionsSection />
            <TransportationCtaSection siteSettings={siteSettings} />
        </SiteLayout>
    );
}
