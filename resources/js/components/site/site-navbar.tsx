import SiteLogo from '@/components/site/site-logo';
import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { Link } from '@inertiajs/react';
import { RiWhatsappFill } from '@remixicon/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

const servicesMenu = [
    { label: 'Umrah Packages', href: '/umrah-packages' },
    { label: 'Visit Visa', href: '/visit-visa' },
    { label: 'Air Ticketing', href: '/air-ticketing' },
    { label: 'Hotels & Accommodation', href: '/hotels-accommodation' },
    { label: 'Transportation', href: '/transportation' },
    { label: 'Tour Packages', href: '/tours' },
];

const navLinks = [
    { label: 'Home', href: route('home') },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

const navLinkClasses =
    'after:bg-brand-gold relative rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:text-brand-gold after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]';

export default function SiteNavbar({ siteSettings }: { siteSettings: SiteSettings }) {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="bg-brand-navy sticky top-0 z-50 shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <SiteLogo companyName={siteSettings.companyName} />

                <nav className="hidden items-center gap-1 lg:flex">
                    <Link href={navLinks[0].href} className={navLinkClasses}>
                        {navLinks[0].label}
                    </Link>

                    <div
                        className="relative"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        onFocus={() => setServicesOpen(true)}
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                setServicesOpen(false);
                            }
                        }}
                    >
                        <Link
                            href="/services"
                            aria-haspopup="true"
                            aria-expanded={servicesOpen}
                            className="hover:text-brand-gold flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                        >
                            Services
                            <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                        </Link>

                        {servicesOpen && (
                            <div className="animate-in fade-in slide-in-from-top-1 absolute top-full left-0 w-64 rounded-lg bg-white p-2 shadow-xl duration-200">
                                {servicesMenu.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="hover:bg-brand-navy/5 hover:text-brand-navy block rounded-md px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:translate-x-1"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {navLinks.slice(1).map((item) => (
                        <Link key={item.href} href={item.href} className={navLinkClasses}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center lg:flex">
                    <a
                        href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like to know more about your packages.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-105 hover:brightness-95"
                    >
                        <RiWhatsappFill className="h-4 w-4" />
                        Chat on WhatsApp
                    </a>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen((open) => !open)}
                    className="hover:text-brand-gold text-white transition-colors lg:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-white/10 px-4 pb-4 lg:hidden">
                    <Link href={navLinks[0].href} className="hover:text-brand-gold block rounded-md px-2 py-2.5 text-sm font-medium text-white">
                        {navLinks[0].label}
                    </Link>
                    <details className="group">
                        <summary className="hover:text-brand-gold mt-1 flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-2.5 text-sm font-medium text-white marker:content-none">
                            Services
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="space-y-0.5 pb-1 pl-2">
                            <Link
                                href="/services"
                                className="hover:text-brand-gold block rounded-md px-2 py-2 text-sm font-semibold text-white/90 transition-all hover:translate-x-1"
                            >
                                View All Services
                            </Link>
                            {servicesMenu.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="hover:text-brand-gold block rounded-md px-2 py-2 text-sm text-white/80 transition-all hover:translate-x-1"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </details>
                    {navLinks.slice(1).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-brand-gold block rounded-md px-2 py-2.5 text-sm font-medium text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <a
                        href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like to know more about your packages.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-gold mt-3 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                    >
                        <RiWhatsappFill className="h-4 w-4" />
                        Chat on WhatsApp
                    </a>
                </div>
            )}
        </header>
    );
}
