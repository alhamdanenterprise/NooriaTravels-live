import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import TermsAndConditionsPageHeading from '@/pages/terms-and-conditions/page-heading';
import TermsContent from '@/pages/terms-and-conditions/terms-content';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function TermsAndConditions() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Terms and Conditions">
                {seoTags({
                    title: 'Terms and Conditions',
                    description:
                        "Review the terms and conditions governing your use of Nooria Travels' website, Umrah packages, and travel services.",
                    path: '/terms-and-conditions',
                })}
            </Head>

            <TermsAndConditionsPageHeading />
            <TermsContent siteSettings={siteSettings} />
        </SiteLayout>
    );
}
