import { Plane } from 'lucide-react';

export default function AboutHeroSection() {
    return (
        <section className="from-brand-navy to-brand-blue relative overflow-hidden bg-gradient-to-br">
            <Plane className="absolute -top-10 right-10 h-56 w-56 -rotate-45 text-white/5" strokeWidth={1} />
            <Plane className="absolute right-1/3 -bottom-16 h-40 w-40 -rotate-45 text-white/5" strokeWidth={1} />

            <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Who We Are</p>
                <h1 className="mt-3 text-4xl leading-tight font-bold text-white sm:text-5xl">
                    About <span className="text-brand-gold">Nooria Travels</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
                    Your trusted travel partner for Umrah, visit visas, air tickets, hotels, transportation, accommodation, and unforgettable journeys
                    across Saudi Arabia and beyond.
                </p>
            </div>
        </section>
    );
}
