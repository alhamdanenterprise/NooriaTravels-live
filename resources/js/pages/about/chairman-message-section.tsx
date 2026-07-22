import { Quote } from 'lucide-react';

export default function ChairmanMessageSection() {
    return (
        <section data-aos="fade-up" className="bg-gray-50 py-20">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Chairman's Message</p>
                <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />

                <Quote className="text-brand-gold/40 mx-auto mt-8 h-10 w-10" />
                <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                    Reflecting on the trust travelers have placed in Nooria Travels over the years, our Chairman credits the company's continuous,
                    reliable service to its "competent, dedicated and professionally experienced staff." He describes Nooria Travels as a trusted and
                    dependable brand name in the travel trade &mdash; one that treats every traveler not as a customer, but as family.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <span className="bg-brand-navy flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white">HBA</span>
                    <div className="text-left">
                        <p className="text-brand-navy text-sm font-semibold">Hafiz Bashir Ahmad</p>
                        <p className="text-xs text-gray-500">Chairman, Nooria Travels</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
