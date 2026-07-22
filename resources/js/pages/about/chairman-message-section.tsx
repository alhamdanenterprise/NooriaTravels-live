import { Quote } from 'lucide-react';

export default function ChairmanMessageSection() {
    return (
        <section data-aos="fade-up" className="from-brand-navy to-brand-blue relative overflow-hidden bg-gradient-to-br py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_50%)]" />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md sm:p-12">
                    <span className="ring-brand-gold/40 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-white/25 to-white/5 text-xl font-bold text-white ring-4 backdrop-blur-sm">
                        HBA
                    </span>

                    <p className="text-brand-gold mt-6 text-sm font-semibold tracking-wide uppercase">Chairman's Message</p>
                    <Quote className="mx-auto mt-4 h-9 w-9 text-white/40" />
                    <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
                        Reflecting on the trust travelers have placed in Nooria Travels over the years, our Chairman credits the company's continuous,
                        reliable service to its "competent, dedicated and professionally experienced staff." He describes Nooria Travels as a trusted
                        and dependable brand name in the travel trade &mdash; one that treats every traveler not as a customer, but as family.
                    </p>

                    <p className="mt-6 text-sm font-semibold text-white">Hafiz Bashir Ahmad</p>
                    <p className="text-xs text-white/60">Chairman, Nooria Travels</p>
                </div>
            </div>
        </section>
    );
}
