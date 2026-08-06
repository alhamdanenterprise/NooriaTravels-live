import SiteLogo from '@/components/site/site-logo';
import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { Link } from '@inertiajs/react';
import { RiFacebookFill, RiInstagramLine, RiTiktokFill, RiWhatsappFill } from '@remixicon/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const quickLinks = [
    { label: 'Home', href: route('home') },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
];

const serviceLinks = [
    { label: 'Umrah Packages', href: '/umrah-packages' },
    { label: 'Visit Visa', href: '/visit-visa' },
    { label: 'Air Ticketing', href: '/air-ticketing' },
    { label: 'Hotels & Accommodation', href: '/hotels-accommodation' },
    { label: 'Transportation', href: '/transportation' },
    { label: 'Tour Packages', href: '/tours' },
];

export default function SiteFooter({ siteSettings }: { siteSettings: SiteSettings }) {
    return (
        <footer className="bg-brand-navy text-white">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
                    <div>
                        <SiteLogo companyName={siteSettings.companyName} className="h-12" />
                        <p className="mt-4 text-sm text-white/70">
                            {siteSettings.companyName} is a trusted travel agency offering Umrah, visa, tickets, hotels, and tours with care,
                            comfort, and integrity.
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            {[
                                { Icon: RiFacebookFill, href: siteSettings.social.facebook },
                                { Icon: RiInstagramLine, href: siteSettings.social.instagram },
                                { Icon: RiTiktokFill, href: siteSettings.social.tiktok },
                            ].map(({ Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:bg-brand-gold flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition duration-200 hover:scale-110 hover:text-white"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-brand-gold mb-4 font-semibold">Quick Links</h3>
                        <ul className="space-y-2.5 text-sm text-white/80">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-brand-gold">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-gold mb-4 font-semibold">Our Services</h3>
                        <ul className="space-y-2.5 text-sm text-white/80">
                            {serviceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-brand-gold">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-brand-gold mb-4 font-semibold">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                                {siteSettings.phone}
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                                {siteSettings.phoneAlt}
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                                {siteSettings.email}
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                {siteSettings.address}
                            </li>
                            <li className="flex items-start gap-2">
                                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                                {siteSettings.officeHours}
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-white/15 p-5 transition duration-200 hover:border-white/30 hover:bg-white/5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/20">
                            <RiWhatsappFill className="h-5 w-5 text-[#25D366]" />
                        </div>
                        <p className="font-semibold">Chat on WhatsApp</p>
                        <p className="mt-1 text-sm text-white/70">Get instant assistance from our team.</p>
                        <a
                            href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like to know more about your packages.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 block rounded-md border border-white/30 py-2 text-center text-sm font-medium transition duration-200 hover:scale-[1.03] hover:bg-white/10"
                        >
                            Chat Now
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-white/70 sm:flex-row sm:px-6 lg:px-8">
                    <p>
                        © {new Date().getFullYear()} {siteSettings.companyName}. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link href="/privacy-policy" className="hover:text-brand-gold">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-and-conditions" className="hover:text-brand-gold">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
