import PackageCard from '@/pages/umrah-packages/package-card';
import PackagePopup from '@/pages/umrah-packages/package-popup';
import { type UmrahPackage } from '@/pages/umrah-packages/types';
import { type SiteSettings } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';

export default function FeaturedPackagesSection({ packages, siteSettings }: { packages: UmrahPackage[]; siteSettings: SiteSettings }) {
    const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(null);

    if (packages.length === 0) {
        return null;
    }

    return (
        <section className="bg-gray-50 py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
                    <h2 className="text-brand-navy text-3xl font-bold">Featured Umrah Packages</h2>
                    <div className="bg-brand-gold mx-auto mt-3 h-1 w-16 rounded-full" />
                </div>

                <div data-aos="fade-up" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} siteSettings={siteSettings} onViewDetails={setSelectedPackage} />
                    ))}
                </div>

                <div data-aos="fade-up" className="mt-10 text-center">
                    <Link
                        href="/umrah-packages"
                        className="border-brand-navy text-brand-navy hover:bg-brand-navy inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-semibold transition duration-200 hover:text-white"
                    >
                        Load More
                        <ArrowDown className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            <PackagePopup pkg={selectedPackage} siteSettings={siteSettings} onClose={() => setSelectedPackage(null)} />
        </section>
    );
}
