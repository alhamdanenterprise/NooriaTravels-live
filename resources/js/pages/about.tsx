import { seoTags } from '@/components/seo-tags';
import SiteLayout from '@/layouts/site-layout';
import ChairmanMessageSection from '@/pages/about/chairman-message-section';
import AboutCtaBanner from '@/pages/about/cta-banner';
import AboutHeroSection from '@/pages/about/hero-section';
import MissionVisionSection from '@/pages/about/mission-vision-section';
import OurStorySection from '@/pages/about/our-story-section';
import TravelersVoicesSection from '@/pages/about/travelers-voices-section';
import AboutWhyChooseSection from '@/pages/about/why-choose-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function About() {
    const { siteSettings } = usePage<SharedData>().props;

    return (
        <SiteLayout siteSettings={siteSettings}>
            <Head title="About Us | Our Story & Mission">
                {seoTags({
                    title: 'About Us | Our Story & Mission',
                    description:
                        "Discover Nooria Travels' story, leadership, and mission to deliver safe, comfortable Umrah journeys and travel services with honesty and care.",
                    path: '/about',
                    image: '/images/about/banner.png',
                })}
            </Head>

            <AboutHeroSection />
            <OurStorySection />
            <ChairmanMessageSection />
            <TravelersVoicesSection />
            <MissionVisionSection />
            <AboutWhyChooseSection />
            <AboutCtaBanner siteSettings={siteSettings} />
        </SiteLayout>
    );
}
