export default function HotelsHeroSection() {
    return (
        <section className="relative flex min-h-[420px] items-center overflow-hidden bg-white sm:min-h-[520px]">
            <img
                src="/images/hotels/banner.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[center_65%] opacity-95"
            />
            {/* Fades to #fefefe (the hotel grid section's bg-linen color) rather than pure
                white, so the two sections meet without a visible seam. */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-[#fefefe]/70 via-75% to-[#fefefe]" />

            <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
                <p data-aos="fade-up" className="text-brand-gold text-sm font-semibold tracking-wide uppercase">
                    Comfort, Convenience &amp; Trust
                </p>
                <h1 data-aos="fade-up" className="text-brand-navy mt-3 text-4xl leading-tight font-bold sm:text-5xl">
                    Hotels &amp; Accommodation
                </h1>
                <p data-aos="fade-up" className="mt-4 text-base text-gray-600 sm:text-lg">
                    Comfortable stays in Makkah and Madina, handpicked for your journey.
                </p>
            </div>
        </section>
    );
}
