import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { RiShieldCheckLine, RiWhatsappFill } from '@remixicon/react';
import { Landmark } from 'lucide-react';

export default function HotelsCtaSection({ siteSettings }: { siteSettings: SiteSettings }) {
    return (
        <section data-aos="fade-up" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="from-brand-navy to-brand-blue relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br px-6 py-10 sm:px-10 lg:flex-row">
                <Landmark className="absolute -left-6 -bottom-6 h-40 w-40 text-white/10" strokeWidth={1} />

                <div className="relative text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-white">Book Your Stay With Nooria Travels</h2>
                    <p className="mt-1 max-w-xl text-sm text-white/85">
                        Handpicked hotels, best prices, and 24/7 support &mdash; we ensure a comfortable and blessed stay for your spiritual
                        journey.
                    </p>
                </div>

                <div className="relative flex shrink-0 flex-col items-center gap-3 lg:items-end">
                    <a
                        href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like a free consultation about hotels.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-gold flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                    >
                        <RiWhatsappFill className="h-4 w-4" />
                        Get Free Consultation
                    </a>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                        <RiShieldCheckLine className="h-4 w-4" />
                        Trusted by Thousands of Pilgrims
                    </span>
                </div>
            </div>
        </section>
    );
}
