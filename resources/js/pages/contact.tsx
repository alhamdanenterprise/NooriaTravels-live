import SiteLayout from '@/layouts/site-layout';
import ContactForm from '@/pages/contact/contact-form';
import ContactInfo from '@/pages/contact/contact-info';
import ContactHeroSection from '@/pages/contact/hero-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Contact() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Contact Us" />

            <ContactHeroSection />

            <section className="bg-linen py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-5">
                        <div className="lg:col-span-2">
                            <ContactInfo siteSettings={siteSettings} />
                        </div>
                        <div className="lg:col-span-3">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
