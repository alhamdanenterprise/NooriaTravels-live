const partners: { name: string; image: string }[] = [
    { name: 'AirBlue', image: '/images/partners/airblue.jpg' },
    { name: 'Air Sial', image: '/images/partners/airsial.png' },
    { name: 'Fly Jinnah', image: '/images/partners/flyjinnah.png' },
    { name: 'PIA', image: '/images/partners/pia.jpg' },
    { name: 'Serene Air', image: '/images/partners/sereneair.png' },
    { name: 'Shaheen Air', image: '/images/partners/shaheenair.jpg' },
];

export default function PartnersSection() {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
                    <h2 className="text-brand-navy text-3xl font-bold">Our Partners</h2>
                    <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />
                    <p className="mt-3 text-sm text-gray-600">We work with leading airlines to get you where you're going.</p>
                </div>

                <div data-aos="fade-up" className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                    {partners.map((partner) => (
                        <div key={partner.name} className="flex h-16 w-40 items-center justify-center">
                            <img
                                src={partner.image}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
