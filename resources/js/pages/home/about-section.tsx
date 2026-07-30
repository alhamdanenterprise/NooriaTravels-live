import { Link } from '@inertiajs/react';
import { RiArrowRightLine } from '@remixicon/react';
import { Globe2, Landmark } from 'lucide-react';

const pillars = [
    {
        icon: Landmark,
        title: 'Spiritual Journeys',
        description: 'Dedicated, full-service support for the guests of Allah.',
    },
    {
        icon: Globe2,
        title: 'Global Exploration',
        description: 'Customized group, cultural, and adventure tours across the Middle East, Europe, Central Asia, and the Far East.',
    },
];

const stats = [
    { value: '1,000+', label: 'Travelers Guided' },
    { value: '4+', label: 'Global Regions Covered' },
    { value: '100%', label: 'Dedicated Pilgrimage & Tour Support' },
];

export default function AboutSection() {
    return (
        <section data-aos="fade-up" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Who We Are</p>
                    <h2 className="text-brand-navy mt-3 text-3xl font-bold">About Nooria Travels</h2>
                    <div className="bg-brand-gold mt-3 h-1 w-16 rounded-full" />

                    <p className="mt-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                        At Nooria Travels, we specialize in providing seamless, deeply meaningful travel experiences &mdash; whether you are
                        fulfilling a spiritual pilgrimage or exploring the world.
                    </p>

                    <div className="mt-6 space-y-4">
                        {pillars.map((pillar) => (
                            <div key={pillar.title} className="flex items-start gap-3">
                                <span className="bg-brand-navy/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                                    <pillar.icon className="text-brand-navy h-5 w-5" />
                                </span>
                                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                                    <span className="text-brand-navy font-semibold">{pillar.title}:</span> {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-gray-600 sm:text-base">
                        We don't view the people we serve as customers &mdash; we treat them as family. That standard guides every booking, package,
                        and itinerary we create.
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-linen rounded-xl border border-gray-100 p-3 text-center sm:p-4">
                                <p className="text-brand-navy text-xl font-bold sm:text-2xl">{stat.value}</p>
                                <p className="mt-1 text-[11px] leading-tight text-gray-600 sm:text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/about"
                        className="bg-brand-gold text-brand-navy group mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition duration-200 hover:scale-105 hover:brightness-95"
                    >
                        Learn More About Us
                        <RiArrowRightLine className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="relative mb-6 sm:mb-8">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
                        <img
                            src="/images/services/umrah-packages.jpg"
                            alt="Makkah - a serene spiritual destination"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-6 aspect-square w-2/5 overflow-hidden rounded-xl border-4 border-white shadow-lg sm:-bottom-8 sm:-left-8">
                        <img
                            src="/images/services/tour-packages.jpg"
                            alt="Exploring Saudi Arabia's vibrant landscapes"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
