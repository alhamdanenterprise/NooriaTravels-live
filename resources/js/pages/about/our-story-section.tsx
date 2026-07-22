import { Compass, Globe2, Landmark, Users, type LucideIcon } from 'lucide-react';

const highlights: { icon: LucideIcon; label: string }[] = [
    { icon: Landmark, label: 'Makkah & Madinah' },
    { icon: Globe2, label: 'Global Destinations' },
    { icon: Users, label: 'Family Groups' },
    { icon: Compass, label: 'Guided Tours' },
];

export default function OurStorySection() {
    return (
        <section data-aos="fade-up" className="bg-linen mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Our Story</p>
                    <h2 className="text-brand-navy mt-3 text-3xl font-bold">A Complete Travel Partner</h2>
                    <div className="bg-brand-gold mt-3 h-1 w-16 rounded-full" />
                    <p className="mt-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                        Nooria Travels is a well-known name in the travel industry, dedicated to serving the guests of Allah with excellence and care.
                        What began as a commitment to making spiritual and leisure journeys easier, safer, and more meaningful has grown into a
                        complete travel partner &mdash; handling everything from visa assistance and air ticketing to accommodation, transportation,
                        and guided tours, so travelers can focus on their journey.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                        We've proudly guided more than a thousand travelers in groups across the Middle East, Europe, Central Asia, and the Far East,
                        backed by a highly skilled team experienced in handling everything from cultural to adventure tours.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    {highlights.map((item, index) => (
                        <div
                            key={item.label}
                            className={`from-brand-navy to-brand-blue group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br p-6 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${index % 2 === 1 ? 'mt-6' : ''}`}
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                <item.icon className="h-7 w-7 text-white" />
                            </span>
                            <span className="text-sm font-semibold text-white">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
