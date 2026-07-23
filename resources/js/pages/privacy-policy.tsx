import SiteLayout from '@/layouts/site-layout';
import PrivacyPolicyHeroSection from '@/pages/privacy-policy/hero-section';
import PolicyContent from '@/pages/privacy-policy/policy-content';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Privacy Policy" />

            <PrivacyPolicyHeroSection />
            <PolicyContent siteSettings={siteSettings} />
        </SiteLayout>
    );
}
