import { type FeaturedPackage } from '@/pages/home/types';
import { Link } from '@inertiajs/react';
import { Bus, Calendar, Landmark, MapPin, Star } from 'lucide-react';

export default function FeaturedPackagesSection({ packages }: { packages: FeaturedPackage[] }) {
    return (
        <section className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
                    <h2 className="text-brand-navy text-3xl font-bold">Featured Packages</h2>
                    <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />
                </div>

                <div data-aos="fade-up" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {packages.map((pkg) => {
                        const TypeIcon = pkg.type === 'Umrah Package' ? Landmark : MapPin;

                        return (
                            <div
                                key={pkg.slug}
                                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="from-brand-navy to-brand-blue relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br">
                                    <TypeIcon
                                        className="h-14 w-14 text-white/30 transition-transform duration-500 group-hover:scale-110"
                                        strokeWidth={1.5}
                                    />
                                    <span className="bg-brand-navy absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold text-white uppercase">
                                        {pkg.type}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-brand-navy font-semibold">{pkg.title}</h3>
                                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {pkg.durationDays} Days
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5" />
                                            {pkg.hotelStars} Star Hotel
                                        </span>
                                        {pkg.transportIncluded && (
                                            <span className="flex items-center gap-1">
                                                <Bus className="h-3.5 w-3.5" />
                                                Transport
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                        <p className="text-sm text-gray-500">
                                            From{' '}
                                            <span className="text-brand-navy text-base font-bold">
                                                {pkg.currency} {pkg.price.toLocaleString()}
                                            </span>
                                        </p>
                                        <Link
                                            href={`/packages/${pkg.slug}`}
                                            className="bg-brand-gold shrink-0 rounded-md px-4 py-2 text-xs font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
