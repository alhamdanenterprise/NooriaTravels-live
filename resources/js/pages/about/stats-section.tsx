import { Globe2, Headset, HeartHandshake, Users, type LucideIcon } from 'lucide-react';

const stats: { icon: LucideIcon; value: string; label: string }[] = [
    { icon: Users, value: '1000+', label: 'Travelers Guided in Groups' },
    { icon: Globe2, value: '4', label: 'Regions Across the Globe' },
    { icon: Headset, value: '24/7', label: 'Customer Support' },
    { icon: HeartHandshake, value: '100%', label: 'Family-Like Commitment' },
];

export default function StatsSection() {
    return (
        <section data-aos="fade-up" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3 text-center sm:text-left">
                        <span className="bg-brand-navy/10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full sm:flex">
                            <stat.icon className="text-brand-navy h-6 w-6" />
                        </span>
                        <div>
                            <p className="text-brand-navy text-2xl font-bold">{stat.value}</p>
                            <p className="text-xs text-gray-500 sm:text-sm">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
