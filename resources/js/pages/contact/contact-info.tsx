import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { RiWhatsappFill } from '@remixicon/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactInfo({ siteSettings }: { siteSettings: SiteSettings }) {
    const items = [
        { icon: Phone, label: 'Phone', value: siteSettings.phone },
        { icon: Mail, label: 'Email', value: siteSettings.email },
        { icon: MapPin, label: 'Office', value: siteSettings.address },
        { icon: Clock, label: 'Support Hours', value: siteSettings.officeHours },
    ];

    return (
        <div data-aos="fade-right" className="space-y-4">
            <div>
                <p className="text-brand-gold text-sm font-semibold tracking-wide uppercase">Contact Details</p>
                <h2 className="text-brand-navy mt-2 text-2xl font-bold">We'd Love to Hear From You</h2>
            </div>

            {items.map((item) => (
                <div
                    key={item.label}
                    className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                    <span className="bg-brand-navy/10 group-hover:bg-brand-navy flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-300">
                        <item.icon className="text-brand-navy h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                    </span>
                    <div>
                        <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{item.label}</p>
                        <p className="text-brand-navy mt-0.5 text-sm font-medium">{item.value}</p>
                    </div>
                </div>
            ))}

            <div className="from-brand-navy to-brand-blue rounded-xl bg-gradient-to-br p-5 text-white shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <RiWhatsappFill className="h-5 w-5" />
                </div>
                <p className="font-semibold">Prefer WhatsApp?</p>
                <p className="mt-1 text-sm text-white/80">Chat with our team instantly for quick answers.</p>
                <a
                    href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I have a question.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-md border border-white/30 py-2 text-center text-sm font-medium transition duration-200 hover:scale-[1.02] hover:bg-white/10"
                >
                    Chat Now
                </a>
            </div>
        </div>
    );
}
