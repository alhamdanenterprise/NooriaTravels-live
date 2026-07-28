import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { Link } from '@inertiajs/react';
import { RiCustomerService2Line, RiPhoneLine } from '@remixicon/react';

export default function CtaSection({ siteSettings }: { siteSettings: SiteSettings }) {
    return (
        <section data-aos="fade-up" data-journey-anchor="cta" className="bg-brand-blue">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
                <div className="text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-white">Ready to Plan Your Journey?</h2>
                    <p className="mt-1 text-sm text-white/90">
                        Contact {siteSettings.companyName} today and let us make your spiritual journey comfortable and memorable.
                    </p>
                </div>
                <div className="flex shrink-0 flex-wrap justify-center gap-3">
                    <a
                        href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like a free consultation.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-gold flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                    >
                        <RiCustomerService2Line className="h-4 w-4" />
                        Get Free Consultation
                    </a>
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 rounded-md border border-white/50 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:bg-white/10"
                    >
                        <RiPhoneLine className="h-4 w-4" />
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
}
