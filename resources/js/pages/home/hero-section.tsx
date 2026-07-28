import { Link } from '@inertiajs/react';
import { RiArrowRightLine, RiSendPlaneLine } from '@remixicon/react';
import gsap from 'gsap';
import { Plane } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const scope = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('[data-hero-eyebrow]', { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' });
            gsap.from('[data-hero-heading]', { y: 24, opacity: 0, duration: 0.7, delay: 0.15, ease: 'power2.out' });
            gsap.from('[data-hero-text]', { y: 20, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power2.out' });
            gsap.from('[data-hero-cta]', { y: 20, opacity: 0, duration: 0.7, delay: 0.45, ease: 'power2.out' });
        }, scope);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={scope} className="relative overflow-hidden">
            <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="from-brand-navy/95 to-brand-blue/85 absolute inset-0 bg-gradient-to-br" />

            <Plane className="absolute -top-10 right-10 h-56 w-56 -rotate-45 text-white/5" strokeWidth={1} />
            <Plane className="absolute right-1/3 -bottom-16 h-40 w-40 -rotate-45 text-white/5" strokeWidth={1} />

            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                <div className="max-w-xl">
                    <p data-hero-eyebrow className="text-brand-gold text-sm font-semibold tracking-wide uppercase">
                        Your Trusted Partner for
                    </p>
                    <h1 data-hero-heading className="mt-3 text-4xl leading-tight font-bold text-white sm:text-5xl">
                        Umrah &amp; Saudi Travel
                    </h1>
                    <p data-hero-text className="mt-5 text-base text-white/85 sm:text-lg">
                        Nooria Travels is your one-stop solution for visa, air tickets, hotels, transportation, Umrah, and tours across Saudi Arabia.
                        We ensure a comfortable, spiritual, and memorable journey.
                    </p>
                    <div data-hero-cta className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/tours"
                            className="bg-brand-gold group flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                        >
                            View Packages
                            <RiArrowRightLine className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/contact"
                            className="group flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:bg-white/10"
                        >
                            Send Inquiry
                            <RiSendPlaneLine className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
