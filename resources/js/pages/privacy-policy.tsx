import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import PrivacyPolicyHeroSection from '@/pages/privacy-policy/hero-section';
import PolicyContent from '@/pages/privacy-policy/policy-content';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Privacy Policy">
                {seoTags({
                    title: 'Privacy Policy',
                    description:
                        'Read how Nooria Travels collects, uses, and protects your personal information when you use our website and travel services.',
                    path: '/privacy-policy',
                })}
            </Head>

            <PrivacyPolicyHeroSection />
            <PolicyContent siteSettings={siteSettings} />
        </SiteLayout>
    );
}
