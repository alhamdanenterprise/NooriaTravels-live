import { seoTags } from '@/components/seo-tags';
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
            <Head title="Umrah Transportation | Airport Transfers in Saudi Arabia">
                {seoTags({
                    title: 'Umrah Transportation | Airport Transfers in Saudi Arabia',
                    description:
                        'Reliable Umrah transportation across Saudi Arabia — airport pickups, Makkah & Madinah transfers, professional drivers, 24/7 support.',
                    path: '/transportation',
                    image: '/images/transport/banner.png',
                })}
            </Head>

            <TransportationHeroSection />
            <TransportationVehicleOptionsSection />
            <TransportationCtaSection siteSettings={siteSettings} />
        </SiteLayout>
    );
}
