import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { RiShieldCheckLine, RiWhatsappFill } from '@remixicon/react';
import { Car } from 'lucide-react';

export default function TransportationCtaSection({ siteSettings }: { siteSettings: SiteSettings }) {
    return (
        <section data-aos="fade-up" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="from-brand-navy to-brand-blue relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br px-6 py-10 sm:px-10 lg:flex-row">
                <Car className="absolute -right-6 -bottom-6 h-40 w-40 text-white/10" strokeWidth={1} />

                <div className="relative text-center lg:text-left">
                    <p className="text-brand-gold text-sm font-semibold">Travel with Comfort and Peace of Mind</p>
                    <h2 className="mt-1 text-2xl font-bold text-white">Book Transportation</h2>
                </div>

                <div className="relative flex shrink-0 flex-col items-center gap-3 lg:items-end">
                    <a
                        href={whatsappLink(
                            siteSettings.whatsapp,
                            `Hi ${siteSettings.companyName}, I'd like to book transportation for my trip.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-gold flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                    >
                        <RiWhatsappFill className="h-4 w-4" />
                        Book Now
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
