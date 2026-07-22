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
        <section data-aos="fade-up" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-xl border border-gray-100 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <span className="bg-brand-navy mx-auto flex h-14 w-14 items-center justify-center rounded-full">
                            <item.icon className="h-6 w-6 text-white" />
                        </span>
                        <h3 className="text-brand-navy mt-5 text-xl font-bold">{item.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
