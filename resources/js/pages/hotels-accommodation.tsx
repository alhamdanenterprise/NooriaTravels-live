import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import CategoryTabs, { ALL_CATEGORY, categories } from '@/pages/hotels-accommodation/category-tabs';
import HotelsCtaSection from '@/pages/hotels-accommodation/cta-section';
import HotelsHeroSection from '@/pages/hotels-accommodation/hero-section';
import HotelCard from '@/pages/hotels-accommodation/hotel-card';
import HotelPopup from '@/pages/hotels-accommodation/hotel-popup';
import { type Hotel } from '@/pages/hotels-accommodation/types';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { RiArrowDownSLine } from '@remixicon/react';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 8;

export default function HotelsAccommodation({ hotels }: { hotels: Hotel[] }) {
    const { siteSettings } = usePage<SharedData>().props;
    const [activeCategory, setActiveCategory] = useState<string>(categories[0].label);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

    const filteredHotels = useMemo(
        () => (activeCategory === ALL_CATEGORY ? hotels : hotels.filter((hotel) => hotel.categories?.includes(activeCategory))),
        [hotels, activeCategory],
    );
    const visibleHotels = filteredHotels.slice(0, visibleCount);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setVisibleCount(PAGE_SIZE);
    };

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Hotels Near Haram | Makkah & Madinah Accommodation">
                {seoTags({
                    title: 'Hotels Near Haram | Makkah & Madinah Accommodation',
                    description:
                        'Book verified hotels minutes from Masjid al-Haram in Makkah and Madinah — real Google ratings, transparent details, easy WhatsApp booking.',
                    path: '/hotels-accommodation',
                    image: '/images/hotels/banner.webp',
                })}
            </Head>

            <HotelsHeroSection />

            <section className="bg-linen py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

                    {visibleHotels.length > 0 ? (
                        <div data-aos="fade-up" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {visibleHotels.map((hotel) => (
                                <HotelCard key={hotel.id} hotel={hotel} onViewDetails={setSelectedHotel} />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-10 text-center text-sm text-gray-500">No hotels in this category yet &mdash; check back soon.</p>
                    )}

                    {visibleCount < filteredHotels.length && (
                        <div className="mt-10 text-center">
                            <button
                                type="button"
                                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                                className="text-brand-navy hover:text-brand-gold inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                            >
                                View More Hotels
                                <RiArrowDownSLine className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <HotelsCtaSection siteSettings={siteSettings} />

            <HotelPopup hotel={selectedHotel} siteSettings={siteSettings} onClose={() => setSelectedHotel(null)} />
        </SiteLayout>
    );
}
