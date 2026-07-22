import { Compass, Landmark, Plane, Users } from 'lucide-react';

const floatingCards = [
    { icon: Landmark, label: 'Umrah Journeys', className: 'top-2 left-4 rotate-[-4deg] animate-float', delay: '0s' },
    { icon: Users, label: 'Family Travel', className: 'top-28 right-2 rotate-[3deg] animate-float', delay: '0.8s' },
    { icon: Compass, label: 'Tour Destinations', className: 'bottom-16 left-10 rotate-[2deg] animate-float', delay: '1.6s' },
];

export default function AboutHeroSection() {
    return (
        <section className="from-brand-navy to-brand-blue relative overflow-hidden bg-gradient-to-br">
            <Plane className="absolute -top-10 right-10 h-56 w-56 -rotate-45 text-white/5" strokeWidth={1} />
            <Plane className="absolute right-1/3 -bottom-16 h-40 w-40 -rotate-45 text-white/5" strokeWidth={1} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
                <div>
                    <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Who We Are</p>
                    <h1 className="mt-3 text-4xl leading-tight font-bold text-white sm:text-5xl">
                        About <span className="text-brand-gold">Nooria Travels</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
                        Your trusted travel partner for Umrah, visit visas, air tickets, hotels, transportation, accommodation, and unforgettable
                        journeys across Saudi Arabia and beyond.
                    </p>
                </div>

                <div className="relative hidden h-72 lg:block">
                    {floatingCards.map((card) => (
                        <div
                            key={card.label}
                            style={{ animationDelay: card.delay }}
                            className={`absolute flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-xl backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-white/15 ${card.className}`}
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                                <card.icon className="h-5 w-5 text-white" />
                            </span>
                            <span className="text-sm font-semibold whitespace-nowrap text-white">{card.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
