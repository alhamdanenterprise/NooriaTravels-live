import { Link } from '@inertiajs/react';

export default function SiteLogo({ companyName, className = 'h-10' }: { companyName: string; className?: string }) {
    return (
        <Link href={route('home')} className="flex items-center">
            <img src="/images/logo.png" alt={companyName} width={1449} height={465} className={`w-auto ${className}`} />
        </Link>
    );
}
