import { type Testimonial } from '@/pages/home/types';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
                <h2 className="text-brand-navy text-3xl font-bold">What Our Travelers Say</h2>
                <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />
            </div>

            <div data-aos="fade-up" className="mt-12 grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.name}
                        className="relative rounded-xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <Quote className="text-brand-gold/40 h-8 w-8" />
                        <p className="mt-3 text-sm text-gray-600">"{testimonial.review}"</p>
                        <div className="mt-4 flex items-center gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                                <Star key={starIndex} className="fill-brand-gold text-brand-gold h-4 w-4" />
                            ))}
                        </div>
                        <p className="text-brand-navy mt-3 text-sm font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
