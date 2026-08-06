import { Building2, Crown, Diamond, Gem, LayoutGrid, Star, Users } from 'lucide-react';

export const ALL_CATEGORY = 'All';

export const categories = [
    { label: ALL_CATEGORY, icon: LayoutGrid },
    { label: 'Economy', icon: Building2 },
    { label: 'Standard', icon: Star },
    { label: 'Premium', icon: Crown },
    { label: 'VIP', icon: Diamond },
    { label: 'Family', icon: Users },
    { label: 'Group Hotels', icon: Gem },
] as const;

export default function CategoryTabs({ active, onChange }: { active: string; onChange: (category: string) => void }) {
    return (
        <div data-aos="fade-up" className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
                const isActive = active === category.label;

                return (
                    <button
                        key={category.label}
                        type="button"
                        onClick={() => onChange(category.label)}
                        className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition duration-200 ${
                            isActive
                                ? 'bg-brand-navy border-brand-navy text-white'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900'
                        }`}
                    >
                        <category.icon className="h-4 w-4" />
                        {category.label}
                    </button>
                );
            })}
        </div>
    );
}
