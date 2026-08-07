import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Rocket } from 'lucide-react';

interface ComingSoonService {
    name: string;
    tagline: string;
    path: string;
}

export default function ComingSoon({ service }: { service: ComingSoonService }) {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title={service.name}>{seoTags({ title: service.name, description: service.tagline, path: service.path })}</Head>

            <section className="mx-auto max-w-3xl px-4 pt-10 pb-20 text-center sm:px-6 sm:pt-14 sm:pb-28 lg:px-8">
                <span className="bg-brand-navy/5 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                    <Rocket className="text-brand-gold h-8 w-8" />
                </span>

                <p className="text-brand-gold mt-6 text-sm font-semibold tracking-wide uppercase">Coming Soon</p>
                <h1 className="text-brand-navy mt-3 text-3xl font-bold sm:text-4xl">{service.name}</h1>
                <p className="mt-3 text-base text-gray-500">{service.tagline}</p>

                <h2 className="text-brand-navy mt-8 text-2xl font-bold sm:text-3xl">We're Getting This Ready</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                    {service.name} isn't available to book on our website just yet, but it's on the way. In the meantime, our team is happy to help
                    you directly &mdash; reach out on WhatsApp and we'll take care of the rest.
                </p>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/services"
                        className="text-brand-navy hover:text-brand-gold flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Browse Our Other Services
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
}
