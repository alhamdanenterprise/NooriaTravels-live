import GoogleLogo from '@/pages/hotels-accommodation/google-logo';
import { formatReviewCount } from '@/pages/hotels-accommodation/icons';
import { type Hotel } from '@/pages/hotels-accommodation/types';
import { RiMapPinFill, RiStarFill } from '@remixicon/react';
import { Building2 } from 'lucide-react';

export default function HotelCard({ hotel, onViewDetails }: { hotel: Hotel; onViewDetails: (hotel: Hotel) => void }) {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="from-brand-navy to-brand-blue relative flex h-40 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br">
                {hotel.image ? (
                    <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
                ) : (
                    <Building2 className="h-14 w-14 text-white/30 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                )}
                <span className="bg-brand-navy absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold text-white uppercase">
                    {hotel.city}
                </span>
                {hotel.google_data_checked_at && hotel.google_rating && (
                    <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 py-1 pr-2.5 pl-2 shadow-sm backdrop-blur-sm">
                        <GoogleLogo className="h-3.5 w-3.5" />
                        <span className="flex items-center gap-0.5 text-xs font-bold text-gray-800">
                            {hotel.google_rating}
                            <RiStarFill className="text-brand-gold h-3 w-3" />
                        </span>
                        {hotel.google_review_count !== null && (
                            <span className="border-l border-gray-200 pl-1.5 text-[11px] font-medium text-gray-500">
                                {formatReviewCount(hotel.google_review_count)}
                            </span>
                        )}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-brand-navy font-semibold">{hotel.name}</h3>

                {hotel.distance_landmark && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-gray-500">
                        <RiMapPinFill className="text-brand-gold mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-2">{hotel.distance_landmark}</span>
                    </p>
                )}

                {hotel.room_types.length > 0 && (
                    <p className="mt-3 text-xs text-gray-500">
                        <span className="font-semibold text-gray-700">Room Type:</span> {hotel.room_types[0]}
                    </p>
                )}

                {hotel.amenities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {hotel.amenities.slice(0, 3).map((amenity) => (
                            <span key={amenity} className="bg-brand-navy/5 text-brand-navy rounded-full px-2.5 py-1 text-[11px] font-medium">
                                {amenity}
                            </span>
                        ))}
                    </div>
                )}

                {/* mt-auto on the wrapper pins the button to the card's bottom edge so every
                    card in a row lines up, while pt-4 keeps clear space above it when the
                    card's content is tall. */}
                <div className="mt-auto pt-4">
                    <button
                        type="button"
                        onClick={() => onViewDetails(hotel)}
                        className="bg-brand-gold w-full rounded-md px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-95"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
