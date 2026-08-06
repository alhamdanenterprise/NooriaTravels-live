import { LayoutGrid, PlaneTakeoff, TicketPercent, Trophy } from 'lucide-react';

export const ALL_CATEGORY = 'All Packages';

export const categories = [
    { label: ALL_CATEGORY, icon: LayoutGrid },
    { label: 'Economy', icon: TicketPercent },
    { label: 'Premium', icon: Trophy },
    { label: 'Ticket Included', icon: PlaneTakeoff },
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
