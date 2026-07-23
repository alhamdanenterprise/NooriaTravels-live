import SiteLayout from '@/layouts/site-layout';
import TermsAndConditionsHeroSection from '@/pages/terms-and-conditions/hero-section';
import TermsContent from '@/pages/terms-and-conditions/terms-content';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function TermsAndConditions() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Terms and Conditions" />

            <TermsAndConditionsHeroSection />
            <TermsContent siteSettings={siteSettings} />
        </SiteLayout>
    );
}
