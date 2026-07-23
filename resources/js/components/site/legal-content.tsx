import { cn } from '@/lib/utils';
import { type SiteSettings } from '@/types';

export interface LegalSection {
    id: string;
    title: string;
    paragraphs: string[];
    list?: string[];
}

export default function LegalContent({
    sections,
    siteSettings,
    scrollableToc = true,
}: {
    sections: LegalSection[];
    siteSettings: SiteSettings;
    scrollableToc?: boolean;
}) {
    return (
        <section className="bg-linen py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
                    <aside className="hidden lg:block">
                        <nav
                            className={cn(
                                'sticky top-24 space-y-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm',
                                scrollableToc && 'scrollbar-theme max-h-[calc(100vh-7rem)] overflow-y-auto',
                            )}
                        >
                            <p className="text-brand-navy px-2 pb-2 text-xs font-semibold tracking-wide uppercase">On This Page</p>
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="hover:bg-brand-navy/5 hover:text-brand-navy block rounded-md px-2 py-2 text-sm text-gray-600 transition-colors"
                                >
                                    {section.title}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="hover:bg-brand-navy/5 hover:text-brand-navy block rounded-md px-2 py-2 text-sm text-gray-600 transition-colors"
                            >
                                Contact Us
                            </a>
                        </nav>
                    </aside>

                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
                        {sections.map((section, index) => (
                            <div key={section.id} id={section.id} className={index === 0 ? 'scroll-mt-24' : 'mt-10 scroll-mt-24'}>
                                <h2 className="text-brand-navy text-xl font-bold">{section.title}</h2>
                                <div className="bg-brand-gold mt-2 mb-4 h-1 w-12 rounded-full" />
                                {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="mt-3 text-sm leading-relaxed text-gray-600 first:mt-0">
                                        {paragraph}
                                    </p>
                                ))}
                                {section.list && (
                                    <ul className="mt-3 space-y-2">
                                        {section.list.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-gray-600">
                                                <span className="bg-brand-gold mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        <div id="contact" className="mt-10 scroll-mt-24">
                            <h2 className="text-brand-navy text-xl font-bold">Contact Us</h2>
                            <div className="bg-brand-gold mt-2 mb-4 h-1 w-12 rounded-full" />
                            <p className="text-sm leading-relaxed text-gray-600">If you have any questions, please contact us:</p>
                            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                <li>
                                    <span className="text-brand-navy font-semibold">Phone:</span> {siteSettings.phone}
                                </li>
                                <li>
                                    <span className="text-brand-navy font-semibold">Email:</span> {siteSettings.email}
                                </li>
                                <li>
                                    <span className="text-brand-navy font-semibold">Address:</span> {siteSettings.address}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
