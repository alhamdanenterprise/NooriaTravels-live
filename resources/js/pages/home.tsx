import SiteLayout from '@/layouts/site-layout';
import AboutSection from '@/pages/home/about-section';
import CtaSection from '@/pages/home/cta-section';
import FeaturedPackagesSection from '@/pages/home/featured-packages-section';
import HeroSection from '@/pages/home/hero-section';
import PartnersSection from '@/pages/home/partners-section';
import ServicesSection from '@/pages/home/services-section';
import TestimonialsSection from '@/pages/home/testimonials-section';
import { type Testimonial } from '@/pages/home/types';
import WhyChooseSection from '@/pages/home/why-choose-section';
import { type UmrahPackage } from '@/pages/umrah-packages/types';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Home({ umrahPackages, testimonials }: { umrahPackages: UmrahPackage[]; testimonials: Testimonial[] }) {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="Home" />

            <HeroSection />
            <AboutSection />
            <PartnersSection />
            <ServicesSection />
            <FeaturedPackagesSection packages={umrahPackages} siteSettings={siteSettings} />

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <WhyChooseSection />
            </section>

            <TestimonialsSection testimonials={testimonials} />
            <CtaSection siteSettings={siteSettings} />
        </SiteLayout>
    );
}
