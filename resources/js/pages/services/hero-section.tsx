export default function ServicesHeroSection() {
    return (
        <section className="relative overflow-hidden">
            <img src="/images/services-page.png" alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />
            <div className="absolute inset-0 bg-black/55" />

            <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-44">
                <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">What We Offer</p>
                <h1 className="mt-3 text-4xl leading-tight font-bold text-white sm:text-5xl">Our Services</h1>
                <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
                    From Umrah packages to visas, tickets, hotels, and transportation &mdash; everything you need for a comfortable journey across
                    Saudi Arabia, in one place.
                </p>
            </div>
        </section>
    );
}
