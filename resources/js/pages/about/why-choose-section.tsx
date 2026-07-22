import { BedDouble, Headset, MapPinned, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';

const reasons: { icon: LucideIcon; label: string }[] = [
    { icon: Headset, label: 'Reliable & 24/7 Support' },
    { icon: MapPinned, label: 'Complete Travel Management' },
    { icon: ShieldCheck, label: 'Honest Guidance & Transparency' },
    { icon: BedDouble, label: 'Comfortable Accommodation' },
    { icon: Sparkles, label: 'Smooth & Hassle-Free Booking' },
];

export default function AboutWhyChooseSection() {
    return (
        <section data-aos="fade-up" className="bg-gray-50 py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-brand-navy text-3xl font-bold">Why Choose Us</h2>
                    <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                    {reasons.map((reason) => (
                        <div
                            key={reason.label}
                            className="group flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <span className="bg-brand-navy/10 group-hover:bg-brand-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300">
                                <reason.icon className="text-brand-navy h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                            </span>
                            <span className="text-brand-navy text-sm font-semibold">{reason.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
