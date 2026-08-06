import SiteLayout from '@/layouts/site-layout';
import ContactForm from '@/pages/contact/contact-form';
import ContactInfo from '@/pages/contact/contact-info';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Contact() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Contact Us" />

            <div className="mx-auto max-w-3xl px-4 pt-12 pb-2 text-center sm:px-6 sm:pt-16 lg:px-8">
                <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Get In Touch</p>
                <h1 className="text-brand-navy mt-2 text-3xl font-bold sm:text-4xl">Contact Us</h1>
                <p className="mt-4 text-base text-gray-600">
                    Have a question about Umrah packages, visas, or tours? Send us a message or reach out on WhatsApp &mdash; our team is ready to
                    help you plan your journey.
                </p>
            </div>

            <section className="bg-linen py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-1">
                            <ContactInfo siteSettings={siteSettings} />
                        </div>
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
