import { BedDouble, Headset, HeartHandshake, MapPinned, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';

const reasons: { icon: LucideIcon; title: string; description: string }[] = [
    {
        icon: Headset,
        title: 'Reliable & 24/7 Support',
        description: 'Our support team is available around the clock to assist you before, during, and after your journey.',
    },
    {
        icon: MapPinned,
        title: 'Complete Travel Management',
        description: 'From visas to transportation, we handle every detail of your trip so you can focus on the journey itself.',
    },
    {
        icon: ShieldCheck,
        title: 'Honest Guidance & Transparency',
        description: 'No hidden fees or surprises — just clear, honest advice at every step of your booking.',
    },
    {
        icon: BedDouble,
        title: 'Comfortable Accommodation',
        description: 'Handpicked hotels near Haram and beyond, chosen for comfort, convenience, and value.',
    },
    {
        icon: Sparkles,
        title: 'Smooth & Hassle-Free Booking',
        description: 'A simple, secure booking process designed to get you on your way without the stress.',
    },
    {
        icon: HeartHandshake,
        title: 'Personalized Care for Every Traveler',
        description: 'We treat every traveler as family, tailoring our guidance and support to your unique journey.',
    },
];

export default function AboutWhyChooseSection() {
    return (
        <section data-aos="fade-up" className="bg-linen py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-brand-navy text-3xl font-bold">Why Choose Us</h2>
                    <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason) => (
                        <div
                            key={reason.title}
                            className="group rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <span className="bg-brand-navy/10 group-hover:bg-brand-navy flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300">
                                <reason.icon className="text-brand-navy h-6 w-6 transition-colors duration-300 group-hover:text-white" />
                            </span>
                            <h3 className="text-brand-navy mt-4 text-lg font-semibold">{reason.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
