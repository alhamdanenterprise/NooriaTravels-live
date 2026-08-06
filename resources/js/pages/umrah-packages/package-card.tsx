import { whatsappLink } from '@/lib/whatsapp';
import { type UmrahPackage } from '@/pages/umrah-packages/types';
import { type SiteSettings } from '@/types';
import { RiWhatsappFill } from '@remixicon/react';
import { ArrowRight, Building2, Car, Moon, Plane, PlaneTakeoff, ShieldCheck, ShieldX, Star, Utensils, UtensilsCrossed } from 'lucide-react';

const transportRule = /car|transport/i;

export default function PackageCard({
    pkg,
    siteSettings,
    onViewDetails,
}: {
    pkg: UmrahPackage;
    siteSettings: SiteSettings;
    onViewDetails: (pkg: UmrahPackage) => void;
}) {
    const transportLabel = pkg.inclusions.find((item) => transportRule.test(item)) ?? 'Transport';

    const tags = [
        pkg.visa_included
            ? { icon: ShieldCheck, tone: 'text-green-600', label: 'Umrah Visa Included' }
            : { icon: ShieldX, tone: 'text-red-500', label: 'Visa Not Included' },
        { icon: Car, tone: 'text-gray-700', label: transportLabel },
        pkg.meal_plan === 'Meals Not Included'
            ? { icon: UtensilsCrossed, tone: 'text-red-500', label: 'Meals Not Included' }
            : { icon: Utensils, tone: 'text-gray-700', label: pkg.meal_plan },
        pkg.flight_included
            ? { icon: PlaneTakeoff, tone: 'text-green-600', label: 'Direct Flight Ticket Included' }
            : { icon: Plane, tone: 'text-red-500', label: 'Ticket Not Included' },
    ];

    return (
        <div className="group hover:border-brand-navy/40 relative flex h-full flex-col overflow-visible rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl">
            {pkg.is_featured && (
                <div
                    className="bg-brand-navy absolute top-0 right-6 z-10 flex w-12 flex-col items-center gap-1 px-1.5 pt-3 pb-3 text-center text-white shadow-md"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }}
                >
                    <Star className="fill-brand-gold text-brand-gold h-3.5 w-3.5" />
                    <span className="text-[8px] leading-tight font-bold uppercase">Premium Stay</span>
                </div>
            )}

            <div className="flex flex-1 flex-col p-6">
                <span className="bg-brand-navy inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white uppercase">
                    <Moon className="h-3.5 w-3.5" />
                    {pkg.duration_label}
                </span>

                <h3 className="text-brand-navy mt-4 text-xl font-bold">{pkg.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">
                    {pkg.makkah_nights} Nights <span className="text-brand-blue font-semibold">Makkah</span>
                    {' | '}
                    {pkg.madinah_nights} Nights <span className="font-semibold text-green-600">Madinah</span>
                </p>

                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                        <Building2 className="text-brand-navy h-4 w-4 shrink-0" />
                        <span className="font-medium">{pkg.makkah_hotel_name}</span>
                        <span className="text-brand-gold flex shrink-0 items-center gap-0.5">
                            {pkg.makkah_hotel_stars}
                            <Star className="fill-brand-gold h-3 w-3" />
                        </span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                        <Building2 className="text-brand-navy h-4 w-4 shrink-0" />
                        <span className="font-medium">{pkg.madinah_hotel_name}</span>
                        <span className="text-brand-gold flex shrink-0 items-center gap-0.5">
                            {pkg.madinah_hotel_stars}
                            <Star className="fill-brand-gold h-3 w-3" />
                        </span>
                    </p>
                </div>

                <div className={`mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 rounded-xl p-4 ${pkg.visa_included ? 'bg-green-50' : 'bg-gray-50'}`}>
                    {tags.map((tag) => (
                        <span key={tag.label} className={`flex items-center gap-1.5 text-xs font-medium ${tag.tone}`}>
                            <tag.icon className="h-3.5 w-3.5 shrink-0" />
                            <span className="leading-tight text-gray-700">{tag.label}</span>
                        </span>
                    ))}
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                    {pkg.pricing.length > 1 ? (
                        <div className="grid grid-cols-3 gap-2 text-center">
                            {pkg.pricing.map((tier) => (
                                <div key={tier.sharing_type}>
                                    <p className="text-[10px] font-semibold tracking-wide text-gray-500 uppercase">{tier.sharing_type}</p>
                                    <p className="text-brand-navy mt-1 text-base font-bold sm:text-lg">
                                        {tier.currency} {tier.price.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-gray-500">/ Per Person</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-brand-navy text-2xl font-bold">
                                {pkg.pricing[0].currency} {pkg.pricing[0].price.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">/ Per Person</p>
                        </div>
                    )}
                </div>

                {/* mt-auto pins the buttons to the card's bottom edge so every card in a row
                    lines up, regardless of how much content sits above (title/hotel name
                    length varies per package). */}
                <div className="mt-auto flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => onViewDetails(pkg)}
                        className="border-brand-navy text-brand-navy hover:bg-brand-navy flex flex-1 items-center justify-center gap-1.5 rounded-md border px-4 py-2.5 text-sm font-semibold transition duration-200 hover:text-white"
                    >
                        View Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <a
                        href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like to know more about the ${pkg.title}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-between gap-1.5 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-95"
                    >
                        <RiWhatsappFill className="h-4 w-4 shrink-0" />
                        <span>WhatsApp Inquiry</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
