import { Eye, Target } from 'lucide-react';

const items = [
    {
        icon: Target,
        title: 'Our Mission',
        description: 'To provide reliable, transparent, and high-quality travel services with complete care, comfort, and trust.',
    },
    {
        icon: Eye,
        title: 'Our Vision',
        description:
            'To be the most trusted travel partner for pilgrims and travelers, delivering exceptional experiences at every step of the journey.',
    },
];

export default function MissionVisionSection() {
    return (
        <section data-aos="fade-up" className="bg-linen mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-2xl border border-gray-100 bg-white/80 p-8 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <span className="bg-brand-navy mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-md">
                            <item.icon className="h-7 w-7 text-white" />
                        </span>
                        <h3 className="text-brand-navy mt-5 text-xl font-bold">{item.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
