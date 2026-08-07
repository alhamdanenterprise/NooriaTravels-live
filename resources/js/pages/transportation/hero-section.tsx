import { Car, Headset, ShieldCheck, Timer } from 'lucide-react';

const trustBadges = [
    { icon: ShieldCheck, label: 'Professional Drivers' },
    { icon: Car, label: 'Clean Vehicles' },
    { icon: Timer, label: 'On-Time Pickup' },
    { icon: Headset, label: '24/7 Support' },
];

export default function TransportationHeroSection() {
    return (
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-white sm:min-h-[620px]">
            <img
                src="/images/transport/banner.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-95"
            />
            {/* Fades to white (the page's default background) rather than a hard cut,
                so the hero meets the section below without a visible seam. */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% via-white/70 via-92% to-white" />

            <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
                <p data-aos="fade-up" className="text-brand-gold text-sm font-semibold tracking-wide uppercase">
                    Safe, Reliable &amp; Comfortable
                </p>
                <h1 data-aos="fade-up" className="text-brand-navy mt-3 text-4xl leading-tight font-bold sm:text-5xl">
                    Transportation Services in Saudi Arabia
                </h1>
                <p data-aos="fade-up" className="mt-4 text-base text-gray-600 sm:text-lg">
                    Safe, reliable and comfortable travel across every journey &mdash; from airport pickups to Makkah &amp; Madinah transfers.
                </p>

                <div data-aos="fade-up" className="mt-6 flex flex-wrap justify-center gap-3">
                    {trustBadges.map((badge) => (
                        <span
                            key={badge.label}
                            className="text-brand-navy flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm"
                        >
                            <badge.icon className="text-brand-gold h-4 w-4" />
                            {badge.label}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
