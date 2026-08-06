export default function OurStorySection() {
    return (
        <section data-aos="fade-up" className="bg-linen mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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

                <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img src="/images/about-section.png" alt="Nooria Travels - guiding your journey" className="h-full w-full object-cover" />
                </div>
            </div>
        </section>
    );
}
