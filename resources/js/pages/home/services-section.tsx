import { Link } from '@inertiajs/react';
import { RiArrowRightLine } from '@remixicon/react';

const services: { title: string; description: string; href: string; image: string }[] = [
    {
        title: 'Umrah Packages',
        description: 'Comfortable Umrah packages with the best services and support.',
        href: '/umrah-packages',
        image: '/images/services/umrah-packages.jpg',
    },
    {
        title: 'Visit Visa',
        description: 'Fast and reliable visit visa services for Saudi Arabia.',
        href: '/visit-visa',
        image: '/images/services/visit-visa.jpg',
    },
    {
        title: 'Air Ticketing',
        description: 'Domestic and international air tickets at the best prices.',
        href: '/air-ticketing',
        image: '/images/services/air-ticketing.jpg',
    },
    {
        title: 'Transportation',
        description: 'Comfortable and safe transportation for your journey.',
        href: '/transportation',
        image: '/images/services/transportation.jpg',
    },
    {
        title: 'Hotels & Accommodation',
        description: 'Quality hotels in Makkah, Madina and beyond to suit your budget.',
        href: '/hotels-accommodation',
        image: '/images/services/hotels-accommodation.jpg',
    },
    {
        title: 'Tour Packages',
        description: 'Explore the beauty of Saudi Arabia with our tour packages.',
        href: '/tours',
        image: '/images/services/tour-packages.jpg',
    },
];

export default function ServicesSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
                <h2 className="text-brand-navy text-3xl font-bold">Our Services</h2>
                <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />
            </div>

            <div data-aos="fade-up" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <div
                        key={service.title}
                        className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="h-40 overflow-hidden sm:h-44">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-brand-navy text-lg font-semibold">{service.title}</h3>
                            <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                            <Link
                                href={service.href}
                                className="text-brand-blue mt-4 inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2"
                            >
                                Learn More
                                <RiArrowRightLine className="h-4 w-4 transition-all" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
