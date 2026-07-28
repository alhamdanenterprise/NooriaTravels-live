import { Link } from '@inertiajs/react';
import { RiArrowRightLine } from '@remixicon/react';
import { Bus, FileText, Hotel, Landmark, MapPin, Plane, type LucideIcon } from 'lucide-react';

const services: { icon: LucideIcon; title: string; description: string; href: string }[] = [
    {
        icon: Landmark,
        title: 'Umrah Packages',
        description: 'Comfortable Umrah packages with the best services and support.',
        href: '/umrah-packages',
    },
    {
        icon: FileText,
        title: 'Visit Visa',
        description: 'Fast and reliable visit visa services for Saudi Arabia.',
        href: '/visit-visa',
    },
    {
        icon: Plane,
        title: 'Air Ticketing',
        description: 'Domestic and international air tickets at the best prices.',
        href: '/air-ticketing',
    },
    {
        icon: Bus,
        title: 'Transportation',
        description: 'Comfortable and safe transportation for your journey.',
        href: '/transportation',
    },
    {
        icon: Hotel,
        title: 'Hotels & Accommodation',
        description: 'Quality hotels in Makkah, Madina and beyond to suit your budget.',
        href: '/hotels-accommodation',
    },
    {
        icon: MapPin,
        title: 'Tour Packages',
        description: 'Explore the beauty of Saudi Arabia with our tour packages.',
        href: '/tours',
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
                        className="group rounded-xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="bg-brand-navy/10 group-hover:bg-brand-navy flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300">
                            <service.icon className="text-brand-navy h-6 w-6 transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <h3 className="text-brand-navy mt-4 text-lg font-semibold">{service.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                        <Link
                            href={service.href}
                            className="text-brand-blue mt-4 inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2"
                        >
                            Learn More
                            <RiArrowRightLine className="h-4 w-4 transition-all" />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
