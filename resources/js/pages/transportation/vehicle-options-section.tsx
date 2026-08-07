import { Armchair, Headset, ShieldCheck, Timer, Users } from 'lucide-react';

const vehicles = [
    {
        image: '/images/transport/1.jpg',
        name: 'Toyota Camry',
        category: 'Private Car',
        passengers: '2 - 4 Passengers',
        description:
            'A comfortable sedan with electrically adjustable front seats and a panoramic roof, serving Makkah, Madinah and Taif.',
    },
    {
        image: '/images/transport/2.jpg',
        name: 'Hyundai Starex',
        category: 'Family Van',
        passengers: '5 - 7 Passengers',
        description:
            "A sturdy, technology-enhanced van with ample room for bags and luggage — a popular choice for airport transfers to Makkah and Madinah, bookable in advance for Umrah and Hajj.",
    },
    {
        image: '/images/transport/3.jpg',
        name: 'GMC Yukon XL',
        category: 'Luxury SUV',
        passengers: 'Up to 7 Passengers',
        description:
            'A full-size, body-on-frame luxury SUV with maximized interior space and plenty of room for luggage, reserved for VIP guests and pilgrims.',
    },
    {
        image: '/images/transport/5.jpg',
        name: 'Hiace',
        category: 'Group Van',
        passengers: '10 - 12 Passengers',
        description: 'A roomy private van with comfortable seating, well suited to large families and small groups travelling together.',
    },
    {
        image: '/images/transport/4.jpg',
        name: 'Coaster',
        category: 'Coaster',
        passengers: '15 - 25 Passengers',
        description:
            'A premium coaster with plush leather seats, extra head and legroom, and roof cargo storage, covering routes across Makkah and Madinah.',
    },
    {
        image: '/images/transport/6.jpg',
        name: 'Bus',
        category: 'Group Bus',
        passengers: 'Up to 50 Passengers',
        description: 'Spacious buses with plush leather seating and extra legroom, ideal for larger groups of 45 or more travelling together.',
    },
];

const features = [
    { icon: ShieldCheck, title: 'Clean & Well Maintained Vehicles' },
    { icon: Headset, title: 'Professional & Experienced Drivers' },
    { icon: Timer, title: 'On-Time Pickup Every Time' },
    { icon: Armchair, title: 'Comfortable & Safe Journeys' },
];

export default function TransportationVehicleOptionsSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
                <div className="flex items-center justify-center gap-3">
                    <span className="bg-brand-gold h-1.5 w-1.5 rounded-full" />
                    <span className="bg-brand-gold h-px w-16" />
                    <h2 className="text-brand-navy text-2xl font-bold sm:text-3xl">Our Vehicle Options</h2>
                    <span className="bg-brand-gold h-px w-16" />
                    <span className="bg-brand-gold h-1.5 w-1.5 rounded-full" />
                </div>
            </div>

            <div data-aos="fade-up" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.name}
                        className="group hover:border-brand-navy/20 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="bg-brand-navy/5 relative h-44 overflow-hidden">
                            <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="bg-brand-gold absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold text-white">
                                {vehicle.category}
                            </span>
                        </div>

                        <div className="p-5">
                            <p className="text-brand-navy text-base font-bold">{vehicle.name}</p>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{vehicle.description}</p>
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                                <Users className="text-brand-gold h-3.5 w-3.5" />
                                {vehicle.passengers}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div data-aos="fade-up" className="mt-10 grid gap-6 rounded-xl border border-gray-100 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <div key={feature.title} className="flex items-center gap-3">
                        <span className="bg-brand-navy/5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                            <feature.icon className="text-brand-navy h-4 w-4" />
                        </span>
                        <span className="text-brand-navy text-sm font-semibold">{feature.title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
