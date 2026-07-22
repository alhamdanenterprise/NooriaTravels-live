import { Link } from '@inertiajs/react';
import { RiArrowRightLine } from '@remixicon/react';
import { Globe2, HeartHandshake, Quote, Users } from 'lucide-react';

const highlights = [
    { icon: Users, label: '1000+ Travelers Guided in Groups' },
    { icon: Globe2, label: 'Middle East, Europe, Central Asia & Far East' },
    { icon: HeartHandshake, label: 'Every Traveler Treated Like Family' },
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
                        Nooria Travels is a well-known name in the travel industry, committed to excellence in serving the guests of Allah. We've
                        proudly guided more than a thousand travelers in groups to destinations across the Middle East, Europe, Central Asia, and the
                        Far East, backed by a highly skilled team experienced in handling everything from spiritual journeys to cultural and adventure
                        tours.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                        We don't see the people we serve as customers &mdash; we see them as family, and that's the standard behind every package,
                        every booking, and every journey we plan.
                    </p>

                    <Link
                        href="/about"
                        className="bg-brand-gold group mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                    >
                        Learn More About Us
                        <RiArrowRightLine className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="from-brand-navy to-brand-blue relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 sm:p-10">
                    <Quote className="h-10 w-10 text-white/30" />
                    <p className="mt-4 text-lg font-medium text-white sm:text-xl">"We treat every traveler not just as a customer, but as family."</p>
                    <p className="text-brand-gold mt-2 text-sm font-semibold">— Nooria Travels</p>

                    <div className="mt-8 space-y-3">
                        {highlights.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 rounded-lg bg-white/10 p-3 transition duration-200 hover:translate-x-1 hover:bg-white/20"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                                    <item.icon className="h-4 w-4 text-white" />
                                </span>
                                <span className="text-sm text-white">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
