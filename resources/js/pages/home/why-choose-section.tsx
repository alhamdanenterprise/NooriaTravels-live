import { BadgeCheck, FileCheck2, Headset, ShieldCheck, Wallet, type LucideIcon } from 'lucide-react';

const reasons: { icon: LucideIcon; title: string; description: string }[] = [
    { icon: BadgeCheck, title: 'Trusted & Experienced', description: 'Years of experience serving thousands of pilgrims.' },
    { icon: Headset, title: '24/7 Reliable Support', description: 'Our support team is always available to assist you.' },
    { icon: FileCheck2, title: 'Visa Assistance', description: 'Hassle-free visa processing with expert guidance.' },
    { icon: ShieldCheck, title: 'Comfortable Stay', description: 'Handpicked hotels near Haram with best amenities.' },
    { icon: Wallet, title: 'Affordable Packages', description: 'Competitive prices with excellent service.' },
];

export default function WhyChooseSection() {
    return (
        <div data-aos="fade-right" className="relative z-10 rounded-2xl bg-gray-50 p-8">
            <h2 className="text-brand-navy text-center text-2xl font-bold">Why Choose Us</h2>
            <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {reasons.map((reason) => (
                    <div
                        key={reason.title}
                        className="group flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="bg-brand-navy/10 group-hover:bg-brand-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300">
                            <reason.icon className="text-brand-navy h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <div>
                            <p className="text-brand-navy text-sm font-semibold">{reason.title}</p>
                            <p className="mt-1 text-xs text-gray-600">{reason.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
