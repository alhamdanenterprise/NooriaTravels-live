import FlowingRoute from '@/components/site/flowing-route';
import SiteLayout from '@/layouts/site-layout';
import AboutSection from '@/pages/home/about-section';
import BookingProcessSection from '@/pages/home/booking-process-section';
import CtaSection from '@/pages/home/cta-section';
import FeaturedPackagesSection from '@/pages/home/featured-packages-section';
import HeroSection from '@/pages/home/hero-section';
import ServicesSection from '@/pages/home/services-section';
import TestimonialsSection from '@/pages/home/testimonials-section';
import { type FeaturedPackage, type Testimonial } from '@/pages/home/types';
import WhyChooseSection from '@/pages/home/why-choose-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Home({ featuredPackages, testimonials }: { featuredPackages: FeaturedPackage[]; testimonials: Testimonial[] }) {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Home" />

            <HeroSection />

            <FlowingRoute>
                <AboutSection />
                <ServicesSection />
                <FeaturedPackagesSection packages={featuredPackages} />

                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <WhyChooseSection />
                        <BookingProcessSection />
                    </div>
                </section>

                <TestimonialsSection testimonials={testimonials} />
            </FlowingRoute>

            <CtaSection siteSettings={siteSettings} />
        </SiteLayout>
    );
}
