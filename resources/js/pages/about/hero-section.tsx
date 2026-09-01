import { Award, CalendarCheck } from 'lucide-react';

const credentials = [
    { icon: Award, label: 'IATA Certified' },
    { icon: CalendarCheck, label: 'Established 2006' },
];

export default function AboutHeroSection() {
    return (
        <section className="relative flex min-h-[460px] items-center overflow-hidden bg-white sm:min-h-[560px]">
            <img
                src="/images/about/banner.webp"
                srcSet="/images/about/banner-640w.webp 640w, /images/about/banner-1024w.webp 1024w, /images/about/banner.webp 1672w"
                sizes="100vw"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[center_65%] opacity-95"
            />
            {/* Fades to #fefefe (the About page's bg-linen sections below) rather than pure
                white, so the hero meets the next section without a visible seam. */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% via-[#fefefe]/70 via-85% to-[#fefefe]" />

            <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
                <p data-aos="fade-up" className="text-brand-gold text-sm font-semibold tracking-wide uppercase">
                    Who We Are
                </p>
                <h1 data-aos="fade-up" className="text-brand-navy mt-3 text-4xl leading-tight font-bold sm:text-5xl">
                    About Nooria Travels
                </h1>
                <p data-aos="fade-up" className="mt-4 text-base text-gray-600 sm:text-lg">
                    Your trusted travel partner for Umrah, visas, tickets, and hotels across Saudi Arabia and beyond.
                </p>

                <div data-aos="fade-up" className="mt-6 flex flex-wrap justify-center gap-4">
                    {credentials.map((credential) => (
                        <span
                            key={credential.label}
                            className="text-brand-navy flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm"
                        >
                            <credential.icon className="text-brand-gold h-4 w-4" />
                            {credential.label}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
