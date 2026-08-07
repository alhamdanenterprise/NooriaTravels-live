import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import CategoryTabs, { ALL_CATEGORY, categories } from '@/pages/umrah-packages/category-tabs';
import UmrahPackagesHeroSection from '@/pages/umrah-packages/hero-section';
import PackageCard from '@/pages/umrah-packages/package-card';
import PackagePopup from '@/pages/umrah-packages/package-popup';
import { type UmrahPackage } from '@/pages/umrah-packages/types';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function UmrahPackages({ packages }: { packages: UmrahPackage[] }) {
    const { siteSettings } = usePage<SharedData>().props;
    const [activeCategory, setActiveCategory] = useState<string>(categories[0].label);
    const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(null);

    const filteredPackages = useMemo(
        () => (activeCategory === ALL_CATEGORY ? packages : packages.filter((pkg) => pkg.categories.includes(activeCategory))),
        [packages, activeCategory],
    );

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Umrah Packages | Makkah & Madinah Hotels Included">
                {seoTags({
                    title: 'Umrah Packages | Makkah & Madinah Hotels Included',
                    description:
                        'Affordable Umrah packages with Makkah & Madinah hotel stays, visa, flights & transport included. Compare packages and book your pilgrimage today.',
                    path: '/umrah-packages',
                    image: '/images/packages/banner.png',
                })}
            </Head>

            <UmrahPackagesHeroSection />

            <section className="bg-linen py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

                    {filteredPackages.length > 0 ? (
                        <div data-aos="fade-up" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPackages.map((pkg) => (
                                <PackageCard key={pkg.id} pkg={pkg} siteSettings={siteSettings} onViewDetails={setSelectedPackage} />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-10 text-center text-sm text-gray-500">No packages in this category yet &mdash; check back soon.</p>
                    )}
                </div>
            </section>

            <PackagePopup pkg={selectedPackage} siteSettings={siteSettings} onClose={() => setSelectedPackage(null)} />
        </SiteLayout>
    );
}
