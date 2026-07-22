import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { Quote, Star } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
    {
        name: 'Muhammad Adeel',
        location: 'Lahore, Pakistan',
        initials: 'MA',
        rating: 5,
        review: 'Nooria Travels made our Umrah journey so smooth and memorable. Everything was well organized from visa to stay.',
    },
    {
        name: 'Fatima Zahra',
        location: 'Karachi, Pakistan',
        initials: 'FZ',
        rating: 5,
        review: 'Excellent service and support throughout our trip. The hotel was very close to Haram and transport was on time.',
    },
    {
        name: 'Ahmed Khan',
        location: 'Riyadh, Saudi Arabia',
        initials: 'AK',
        rating: 5,
        review: 'Professional team, affordable packages and great hospitality. Highly recommended Nooria Travels.',
    },
    {
        name: 'Sara Malik',
        location: 'Islamabad, Pakistan',
        initials: 'SM',
        rating: 5,
        review: 'From visa processing to the return flight, every step felt effortless. It truly felt like we were traveling with family.',
    },
    {
        name: 'Imran Sheikh',
        location: 'Dubai, UAE',
        initials: 'IS',
        rating: 5,
        review: "Our group tour was flawlessly managed. The team's attention to detail and honest guidance stood out the most.",
    },
];

export default function TravelersVoicesSection() {
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        trackRef.current?.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
    };

    return (
        <section data-aos="fade-up" className="bg-linen py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                    <h2 className="text-brand-navy text-3xl font-bold">Travelers' Voices</h2>
                    <div className="bg-brand-gold mt-3 h-1 w-16 rounded-full" />
                </div>

                <div className="relative mt-12">
                    <div ref={trackRef} className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.name}
                                className="w-[300px] shrink-0 snap-start rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <Quote className="text-brand-gold/40 h-7 w-7" />
                                <p className="mt-3 text-sm text-gray-600">"{testimonial.review}"</p>
                                <div className="mt-4 flex items-center gap-1">
                                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                                        <Star key={starIndex} className="fill-brand-gold text-brand-gold h-4 w-4" />
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                    <span className="from-brand-navy to-brand-blue flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white">
                                        {testimonial.initials}
                                    </span>
                                    <div>
                                        <p className="text-brand-navy text-sm font-semibold">{testimonial.name}</p>
                                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => scroll('left')}
                            aria-label="Previous testimonials"
                            className="border-brand-navy/15 text-brand-navy hover:bg-brand-navy flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 hover:scale-110 hover:text-white"
                        >
                            <RiArrowLeftSLine className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll('right')}
                            aria-label="Next testimonials"
                            className="border-brand-navy/15 text-brand-navy hover:bg-brand-navy flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 hover:scale-110 hover:text-white"
                        >
                            <RiArrowRightSLine className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
