import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { RiCustomerService2Line } from '@remixicon/react';

export default function AboutCtaBanner({ siteSettings }: { siteSettings: SiteSettings }) {
    return (
        <section data-aos="fade-up" className="bg-brand-blue">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
                <div>
                    <h2 className="text-2xl font-bold text-white">Start Your Journey With Us</h2>
                    <p className="mt-1 text-sm text-white/90">We are here to make your Umrah and travel experience comfortable and memorable.</p>
                </div>
                <a
                    href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like a free consultation.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-gold flex shrink-0 items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                >
                    <RiCustomerService2Line className="h-4 w-4" />
                    Get Free Consultation
                </a>
            </div>
        </section>
    );
}
