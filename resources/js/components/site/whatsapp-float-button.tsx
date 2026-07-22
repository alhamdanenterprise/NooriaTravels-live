import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import { RiWhatsappFill } from '@remixicon/react';

export default function WhatsappFloatButton({ siteSettings }: { siteSettings: SiteSettings }) {
    return (
        <a
            href={whatsappLink(siteSettings.whatsapp, `Hi ${siteSettings.companyName}, I'd like to know more about your packages.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition duration-200 hover:scale-110 hover:brightness-95"
        >
            <RiWhatsappFill className="h-7 w-7 text-white" />
        </a>
    );
}
