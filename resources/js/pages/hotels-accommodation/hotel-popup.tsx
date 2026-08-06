import GoogleLogo from '@/pages/hotels-accommodation/google-logo';
import { formatReviewCount, getAmenityIcon, highlightIcons } from '@/pages/hotels-accommodation/icons';
import { type Hotel } from '@/pages/hotels-accommodation/types';
import { whatsappLink } from '@/lib/whatsapp';
import { type SiteSettings } from '@/types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { RiMapPinFill, RiStarFill, RiWhatsappFill } from '@remixicon/react';
import { Building2, CalendarClock, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, Info, ShieldCheck, Tag, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const trustStrip = [
    { icon: Tag, title: 'Trusted by Pilgrims Worldwide', description: 'Thousands of happy guests on every journey.' },
    { icon: ShieldCheck, title: 'Safe & Reliable Stay', description: 'Hygienic rooms, 24/7 security and support.' },
    { icon: RiWhatsappFill, title: 'Dedicated Support', description: 'We are here to help you at every step.' },
];

export default function HotelPopup({ hotel, siteSettings, onClose }: { hotel: Hotel | null; siteSettings: SiteSettings; onClose: () => void }) {
    const [activePhoto, setActivePhoto] = useState(0);
    const [photoLoaded, setPhotoLoaded] = useState(false);

    const photos = hotel?.gallery && hotel.gallery.length > 0 ? hotel.gallery : Array.from<string | null>({ length: 5 }).fill(null);
    const currentPhoto = photos[activePhoto];

    // Re-arm the loading skeleton whenever the visible photo changes, including when the
    // popup is reopened on a different hotel.
    useEffect(() => {
        setPhotoLoaded(false);
    }, [currentPhoto]);

    if (!hotel) {
        return null;
    }

    const showPrevious = () => setActivePhoto((index) => (index - 1 + photos.length) % photos.length);
    const showNext = () => setActivePhoto((index) => (index + 1) % photos.length);

    return (
        <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/70" />
                <DialogPrimitive.Content
                    className="animate-in fade-in-0 zoom-in-95 fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 lg:p-8"
                    aria-describedby={undefined}
                >
                    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="from-brand-navy to-brand-blue relative overflow-hidden bg-gradient-to-br px-5 py-5 sm:px-7 sm:py-6">
                            <DialogPrimitive.Close className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 transition hover:bg-white">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </DialogPrimitive.Close>

                            <span className="bg-brand-gold inline-block rounded-md px-2.5 py-0.5 text-[11px] font-semibold text-white uppercase">
                                {hotel.city}
                            </span>

                            <DialogPrimitive.Title className="mt-2 pr-10 text-xl leading-tight font-bold text-white sm:text-2xl">
                                {hotel.name}
                            </DialogPrimitive.Title>

                            {hotel.google_data_checked_at && hotel.google_rating && (
                                <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                                    <span className="flex items-center gap-1.5 rounded-full bg-white/95 py-1 pr-2.5 pl-2 shadow-sm">
                                        <GoogleLogo className="h-3.5 w-3.5" />
                                        <span className="flex items-center gap-0.5 text-xs font-bold text-gray-800">
                                            {hotel.google_rating}
                                            <RiStarFill className="text-brand-gold h-3 w-3" />
                                        </span>
                                        {hotel.google_review_count !== null && (
                                            <span className="border-l border-gray-200 pl-1.5 text-[11px] font-medium text-gray-500">
                                                {formatReviewCount(hotel.google_review_count)} reviews
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}

                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/85">
                                <span className="flex items-center gap-1.5">
                                    <RiMapPinFill className="text-brand-gold h-3.5 w-3.5" />
                                    {hotel.city}, Saudi Arabia
                                </span>
                                {hotel.distance_landmark && (
                                    <span className="flex items-center gap-1.5">
                                        <Building2 className="h-3.5 w-3.5" />
                                        {hotel.distance_landmark}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2">
                                {/* Gallery */}
                                <div>
                                    <div className="from-brand-navy to-brand-blue relative flex h-52 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br sm:h-64">
                                        {currentPhoto ? (
                                            <>
                                                {/* Preloader sits inside the frame so the layout never shifts
                                                    when the photo swaps in. */}
                                                {!photoLoaded && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-gray-100 to-gray-200">
                                                        <span className="border-brand-navy/20 border-t-brand-navy h-7 w-7 animate-spin rounded-full border-[3px]" />
                                                        <span className="text-[11px] font-medium tracking-wide text-gray-400 uppercase">Loading</span>
                                                    </div>
                                                )}
                                                <img
                                                    src={currentPhoto}
                                                    alt={hotel.name}
                                                    onLoad={() => setPhotoLoaded(true)}
                                                    onError={() => setPhotoLoaded(true)}
                                                    className={`h-full w-full object-cover transition-opacity duration-500 ${photoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                                />
                                            </>
                                        ) : (
                                            <Building2 className="h-14 w-14 text-white/30" strokeWidth={1.5} />
                                        )}
                                        <span className="absolute top-2.5 right-2.5 rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white">
                                            {activePhoto + 1} / {photos.length}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={showPrevious}
                                            className="absolute top-1/2 left-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-white"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={showNext}
                                            className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-white"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="scrollbar-hide mt-2.5 flex gap-2 overflow-x-auto">
                                        {photos.map((photo, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setActivePhoto(index)}
                                                className={`from-brand-navy to-brand-blue flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br transition ${
                                                    index === activePhoto ? 'ring-brand-navy ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                {photo ? (
                                                    <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
                                                ) : (
                                                    <Building2 className="h-5 w-5 text-white/40" strokeWidth={1.5} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* About */}
                                <div>
                                    <h3 className="text-brand-navy text-base font-bold">About {hotel.name}</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{hotel.description}</p>
                                </div>

                                {/* Amenities */}
                                {hotel.amenities.length > 0 && (
                                    <div>
                                        <h3 className="text-brand-navy text-base font-bold">Amenities</h3>
                                        <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4">
                                            {hotel.amenities.map((amenity) => {
                                                const AmenityIcon = getAmenityIcon(amenity);

                                                return (
                                                    <span key={amenity} className="flex items-center gap-1.5 text-xs text-gray-700">
                                                        <AmenityIcon className="text-brand-navy h-3.5 w-3.5 shrink-0" />
                                                        {amenity}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                        <p className="mt-2.5 text-xs text-gray-400 italic">Room types and facilities may vary.</p>
                                    </div>
                                )}

                                {/* Hotel Highlights */}
                                <div>
                                    <h3 className="text-brand-navy text-base font-bold">Hotel Highlights</h3>
                                    <div className="mt-2.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                        {hotel.highlights.map((highlight) => {
                                            const HighlightIcon = highlightIcons[highlight.icon] ?? CheckCircle2;

                                            return (
                                                <div key={highlight.title} className="rounded-xl border border-gray-100 p-3">
                                                    <HighlightIcon className="text-brand-gold h-4 w-4" />
                                                    <p className="text-brand-navy mt-1.5 text-xs font-semibold">{highlight.title}</p>
                                                    <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{highlight.description}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Trust strip */}
                                <div className="grid gap-3 rounded-xl bg-blue-50 p-4 sm:grid-cols-3">
                                    {trustStrip.map((item) => (
                                        <div key={item.title} className="flex items-start gap-2">
                                            <item.icon className="text-brand-navy mt-0.5 h-4 w-4 shrink-0" />
                                            <div>
                                                <p className="text-brand-navy text-xs font-semibold">{item.title}</p>
                                                <p className="mt-0.5 text-[11px] text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Disclaimer */}
                                <div className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                                    <p className="text-xs leading-relaxed text-gray-500">
                                        Hotel details are provided for general guidance. Current prices, room availability and exact information
                                        must be confirmed through WhatsApp.
                                    </p>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-3 lg:col-span-1">
                                <div className="hover:border-brand-navy/20 rounded-xl border border-gray-100 p-3.5 transition hover:bg-gray-50">
                                    <p className="text-brand-navy text-xs font-bold tracking-wide uppercase">Availability</p>
                                    <p className="mt-2 text-sm text-gray-600">Contact us on WhatsApp to confirm availability.</p>
                                    <a
                                        href={whatsappLink(
                                            siteSettings.whatsapp,
                                            `Hello ${siteSettings.companyName}, I am interested in ${hotel.name} in ${hotel.city}. Please share current availability, price and package details.`,
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-brand-gold mt-3 flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-95"
                                    >
                                        <RiWhatsappFill className="h-4 w-4" />
                                        Check Availability
                                    </a>
                                </div>

                                {hotel.google_data_checked_at && hotel.google_rating && (
                                    <div className="hover:border-brand-navy/20 rounded-xl border border-gray-100 p-3.5 transition hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            <GoogleLogo className="h-4 w-4" />
                                            <p className="text-xs font-bold tracking-wide text-gray-500 uppercase">Google Rating</p>
                                        </div>

                                        <div className="mt-2.5 flex items-baseline gap-1.5">
                                            <span className="text-3xl leading-none font-bold text-gray-800">{hotel.google_rating}</span>
                                            <span className="text-sm text-gray-400">/ 5</span>
                                        </div>

                                        <div className="mt-1.5 flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <RiStarFill
                                                    key={index}
                                                    className={`h-3.5 w-3.5 ${index < Math.round(Number(hotel.google_rating)) ? 'text-brand-gold' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>

                                        {hotel.google_review_count !== null && (
                                            <p className="mt-1.5 text-xs text-gray-500">
                                                Based on{' '}
                                                <span className="font-semibold text-gray-700">{formatReviewCount(hotel.google_review_count)}+</span>{' '}
                                                Google reviews
                                            </p>
                                        )}

                                        {hotel.google_maps_url && (
                                            <a
                                                href={hotel.google_maps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-brand-navy hover:border-brand-navy/30 hover:text-brand-gold mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-1.5 text-xs font-semibold transition-colors"
                                            >
                                                <RiMapPinFill className="h-3.5 w-3.5" />
                                                View on Google Maps
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                )}

                                {hotel.distance_landmark && (
                                    <div className="hover:border-brand-navy/20 rounded-xl border border-gray-100 p-3.5 transition hover:bg-gray-50">
                                        <p className="text-brand-navy text-xs font-bold tracking-wide uppercase">Distance / Nearby</p>
                                        <p className="mt-2 flex items-start gap-2 text-sm text-gray-700">
                                            <RiMapPinFill className="text-brand-gold mt-0.5 h-4 w-4 shrink-0" />
                                            {hotel.distance_landmark}
                                        </p>
                                    </div>
                                )}

                                {(hotel.check_in_time || hotel.check_out_time) && (
                                    <div className="rounded-xl border border-gray-100 p-3.5">
                                        <p className="text-brand-navy text-xs font-bold tracking-wide uppercase">Check-in / Check-out</p>
                                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                                            <CalendarClock className="text-brand-navy h-4 w-4 shrink-0" />
                                            Check-in: {hotel.check_in_time ?? 'N/A'}
                                        </p>
                                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                                            <CalendarClock className="h-4 w-4 shrink-0 text-transparent" />
                                            Check-out: {hotel.check_out_time ?? 'N/A'}
                                        </p>
                                        <p className="mt-2 text-[11px] leading-relaxed text-gray-400 italic">
                                            Early check-in and late check-out are subject to hotel approval and availability.
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-start gap-2.5 rounded-xl bg-blue-50 p-3.5">
                                    <ShieldCheck className="text-brand-gold mt-0.5 h-4 w-4 shrink-0" />
                                    <div>
                                        <p className="text-brand-navy text-xs font-semibold">Trusted by Thousands of Pilgrims</p>
                                        <p className="mt-0.5 text-[11px] text-gray-500">Secure and reliable service by Nooria Travels</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
