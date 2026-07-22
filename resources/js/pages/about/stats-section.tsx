import { Globe2, Headset, HeartHandshake, Users, type LucideIcon } from 'lucide-react';

const stats: { icon: LucideIcon; value: string; label: string }[] = [
    { icon: Users, value: '1000+', label: 'Travelers Guided in Groups' },
    { icon: Globe2, value: '4', label: 'Regions Across the Globe' },
    { icon: Headset, value: '24/7', label: 'Customer Support' },
    { icon: HeartHandshake, value: '100%', label: 'Family-Like Commitment' },
];

export default function StatsSection() {
    return (
        <section data-aos="fade-up" className="bg-linen mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="group flex flex-col items-center text-center">
                        <span className="from-brand-navy to-brand-blue flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110">
                            <stat.icon className="h-8 w-8 text-white" />
                        </span>
                        <p className="text-brand-navy mt-4 text-4xl font-bold sm:text-5xl">{stat.value}</p>
                        <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
