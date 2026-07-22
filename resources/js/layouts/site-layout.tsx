import SiteFooter from '@/components/site/site-footer';
import SiteNavbar from '@/components/site/site-navbar';
import WhatsappFloatButton from '@/components/site/whatsapp-float-button';
import { type SiteSettings } from '@/types';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { type PropsWithChildren, useEffect } from 'react';

export default function SiteLayout({ siteSettings, children }: PropsWithChildren<{ siteSettings: SiteSettings }>) {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 80 });
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <SiteNavbar siteSettings={siteSettings} />
            <main className="flex-1">{children}</main>
            <SiteFooter siteSettings={siteSettings} />
            <WhatsappFloatButton siteSettings={siteSettings} />
        </div>
    );
}
