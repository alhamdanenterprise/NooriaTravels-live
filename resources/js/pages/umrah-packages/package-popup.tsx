import { whatsappLink } from '@/lib/whatsapp';
import { type UmrahPackage } from '@/pages/umrah-packages/types';
import { type SiteSettings } from '@/types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { RiWhatsappFill } from '@remixicon/react';
import {
    Building2,
    Car,
    CheckCircle2,
    Info,
    Landmark,
    Moon,
    Plane,
    PlaneTakeoff,
    ShieldCheck,
    ShieldX,
    Star,
    Utensils,
    UtensilsCrossed,
    X,
    XCircle,
} from 'lucide-react';

const transportRule = /car|transport/i;

export default function PackagePopup({
    pkg,
    siteSettings,
    onClose,
}: {
    pkg: UmrahPackage | null;
    siteSettings: SiteSettings;
    onClose: () => void;
}) {
    if (!pkg) {
        return null;
    }

    const transportLabel = pkg.inclusions.find((item) => transportRule.test(item)) ?? 'Transport';
    const mealsIncluded = pkg.meal_plan === 'Breakfast';

    const included = [
        pkg.visa_included && { icon: ShieldCheck, label: 'Umrah visa' },
        { icon: Car, label: transportLabel },
        { icon: Building2, label: 'Hotel accommodation' },
        mealsIncluded && { icon: Utensils, label: 'Breakfast' },
        pkg.flight_included && { icon: PlaneTakeoff, label: 'Direct flight ticket' },
    ].filter((item): item is { icon: typeof ShieldCheck; label: string } => Boolean(item));

    const notIncluded = [
        !pkg.visa_included && { icon: ShieldX, label: 'Visa' },
        !mealsIncluded && { icon: UtensilsCrossed, label: 'Meals' },
        !pkg.flight_included && { icon: Plane, label: 'Air ticket' },
    ].filter((item): item is { icon: typeof ShieldX; label: string } => Boolean(item));

    const notes = [
        !mealsIncluded && 'Meals are not included.',
        !pkg.flight_included && 'Air ticket is not included.',
        'Further package details can be confirmed on WhatsApp.',
    ].filter((note): note is string => Boolean(note));

    return (
        <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/70" />
                <DialogPrimitive.Content
                    className="animate-in fade-in-0 zoom-in-95 fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 lg:p-8"
                    aria-describedby={undefined}
                >
                    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="relative overflow-hidden px-5 pt-5 sm:px-8 sm:pt-8">
                            <DialogPrimitive.Close className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </DialogPrimitive.Close>

                            <img
                                src="/images/packages/top.png"
                                alt=""
                                className="pointer-events-none absolute top-1/2 right-8 h-28 w-auto -translate-y-1/2 object-contain opacity-90 sm:h-40"
                            />

                            <span className="bg-brand-navy relative z-10 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white uppercase">
                                <Moon className="h-3.5 w-3.5" />
                                {pkg.duration_label}
                            </span>

                            <DialogPrimitive.Title className="text-brand-navy relative z-10 mt-3 max-w-[65%] text-2xl leading-tight font-bold sm:text-3xl">
                                {pkg.title}
                            </DialogPrimitive.Title>

                            <p className="relative z-10 mt-2 max-w-[65%] text-sm text-gray-600 sm:text-base">
                                {pkg.makkah_nights} Nights <span className="text-brand-blue font-semibold">Makkah</span>
                                {' | '}
                                {pkg.madinah_nights} Nights <span className="font-semibold text-green-600">Madinah</span>
                            </p>

                            <p className="relative z-10 mt-2 max-w-[70%] text-sm text-gray-500">{pkg.description}</p>
                        </div>

                        {/* Body */}
                        <div className="space-y-5 p-5 sm:p-8">
                            <div className="grid gap-4 rounded-xl border border-gray-100 p-4 sm:grid-cols-2">
                                <p className="flex items-center gap-2.5 text-sm">
                                    <Building2 className="text-brand-navy h-5 w-5 shrink-0" />
                                    <span className="font-semibold text-gray-800">{pkg.makkah_hotel_name}</span>
                                    <span className="text-brand-gold flex shrink-0 items-center gap-0.5">
                                        {Array.from({ length: pkg.makkah_hotel_stars }).map((_, index) => (
                                            <Star key={index} className="fill-brand-gold h-3.5 w-3.5" />
                                        ))}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2.5 text-sm">
                                    <Building2 className="text-brand-navy h-5 w-5 shrink-0" />
                                    <span className="font-semibold text-gray-800">{pkg.madinah_hotel_name}</span>
                                    <span className="text-brand-gold flex shrink-0 items-center gap-0.5">
                                        {Array.from({ length: pkg.madinah_hotel_stars }).map((_, index) => (
                                            <Star key={index} className="fill-brand-gold h-3.5 w-3.5" />
                                        ))}
                                    </span>
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                    <p className="flex items-center gap-1.5 text-sm font-bold text-green-700 uppercase">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Included
                                    </p>
                                    <div className="mt-3 grid grid-cols-3 gap-3">
                                        {included.map((item) => (
                                            <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-600 shadow-sm">
                                                    <item.icon className="h-4 w-4" />
                                                </span>
                                                <span className="text-xs leading-tight font-medium text-gray-700">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {notIncluded.length > 0 && (
                                    <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                                        <p className="flex items-center gap-1.5 text-sm font-bold text-red-600 uppercase">
                                            <XCircle className="h-4 w-4" />
                                            Not Included
                                        </p>
                                        <div className="mt-3 grid grid-cols-3 gap-3">
                                            {notIncluded.map((item) => (
                                                <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm">
                                                        <item.icon className="h-4 w-4" />
                                                    </span>
                                                    <span className="text-xs leading-tight font-medium text-gray-700">{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <p className="text-brand-navy text-xs font-bold tracking-wide uppercase">Stay Breakdown</p>
                                    <div className="mt-3 flex gap-6">
                                        <div className="flex items-center gap-2">
                                            <Landmark className="text-brand-blue h-5 w-5" />
                                            <div>
                                                <p className="text-brand-navy text-sm font-bold">{pkg.makkah_nights} nights</p>
                                                <p className="text-xs text-gray-500">Makkah</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Landmark className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="text-brand-navy text-sm font-bold">{pkg.madinah_nights} nights</p>
                                                <p className="text-xs text-gray-500">Madinah</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <p className="text-brand-navy text-xs font-bold tracking-wide uppercase">Price Per Person</p>
                                    {pkg.pricing.length > 1 ? (
                                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                                            {pkg.pricing.map((tier) => (
                                                <div key={tier.sharing_type} className="rounded-lg bg-white p-2 shadow-sm">
                                                    <p className="text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
                                                        {tier.sharing_type} Sharing
                                                    </p>
                                                    <p className="text-brand-navy mt-1 text-sm font-bold">
                                                        {tier.currency} {tier.price.toLocaleString()}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500">/ Per Person</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mt-3">
                                            <p className="text-brand-navy text-2xl font-bold">
                                                {pkg.pricing[0].currency} {pkg.pricing[0].price.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-gray-500">/ Per Person</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50 p-4">
                                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                                <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-gray-600">
                                    {notes.map((note) => (
                                        <li key={note}>{note}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-end gap-3 sm:flex-row">
                                <DialogPrimitive.Close className="border-brand-navy text-brand-navy hover:bg-brand-navy rounded-md border px-6 py-2.5 text-sm font-semibold transition duration-200 hover:text-white">
                                    Close
                                </DialogPrimitive.Close>
                                <a
                                    href={whatsappLink(
                                        siteSettings.whatsapp,
                                        `Hi ${siteSettings.companyName}, I'd like to know more about the ${pkg.title}.`,
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 rounded-md bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-95"
                                >
                                    <RiWhatsappFill className="h-4 w-4" />
                                    WhatsApp Inquiry
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
