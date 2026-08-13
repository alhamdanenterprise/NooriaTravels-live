import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import PolicyContent from '@/pages/privacy-policy/policy-content';
import PrivacyPolicyPageHeading from '@/pages/privacy-policy/page-heading';
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

            <PrivacyPolicyPageHeading />
            <PolicyContent siteSettings={siteSettings} />
        </SiteLayout>
    );
}
