import { Car, Headset, ShieldCheck, Timer } from 'lucide-react';

const trustBadges = [
    { icon: ShieldCheck, label: 'Professional Drivers' },
    { icon: Car, label: 'Clean Vehicles' },
    { icon: Timer, label: 'On-Time Pickup' },
    { icon: Headset, label: '24/7 Support' },
];

export default function TransportationHeroSection() {
    return (
        <section className="from-brand-navy to-brand-blue relative overflow-hidden bg-gradient-to-br">
            <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
                <div data-aos="fade-up">
                    <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl">
                        Transportation Services <span className="text-brand-gold">in Saudi Arabia</span>
                    </h1>
                    <div className="bg-brand-gold mt-4 h-1 w-16 rounded-full" />
                    <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
                        Safe, reliable and comfortable travel across every journey &mdash; from airport pickups to Makkah &amp; Madinah transfers.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
                        {trustBadges.map((badge) => (
                            <div key={badge.label} className="flex max-w-[180px] items-center gap-3">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
                                    <badge.icon className="text-brand-gold h-5 w-5" />
                                </span>
                                <span className="text-sm leading-tight font-semibold text-white">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="100" className="overflow-hidden rounded-2xl shadow-2xl">
                    <img
                        src="/images/services/transportation.jpg"
                        alt="Comfortable, professionally driven transportation across Saudi Arabia"
                        className="h-full max-h-[380px] w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
