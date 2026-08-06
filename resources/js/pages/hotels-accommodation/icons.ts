import {
    Accessibility,
    Bell,
    Briefcase,
    Bus,
    Car,
    CheckCircle2,
    Clock,
    Coffee,
    Compass,
    Dumbbell,
    Headphones,
    type LucideIcon,
    Landmark,
    MapPin,
    Moon,
    MoveVertical,
    Shirt,
    Snowflake,
    Star,
    Tv,
    Users,
    UtensilsCrossed,
    Wifi,
    Wine,
} from 'lucide-react';

export const highlightIcons: Record<string, LucideIcon> = {
    star: Star,
    landmark: Landmark,
    users: Users,
    compass: Compass,
    utensils: UtensilsCrossed,
    headset: Headphones,
    'map-pin': MapPin,
    moon: Moon,
};

const amenityIconRules: Array<[RegExp, LucideIcon]> = [
    [/wi-?fi/i, Wifi],
    [/breakfast/i, Coffee],
    [/parking/i, Car],
    [/air condition/i, Snowflake],
    [/elevator|lift/i, MoveVertical],
    [/family/i, Users],
    [/front desk|reception/i, Clock],
    [/room service/i, Bell],
    [/restaurant|dining/i, UtensilsCrossed],
    [/business/i, Briefcase],
    [/fitness|spa|gym/i, Dumbbell],
    [/wheelchair|accessible/i, Accessibility],
    [/minibar/i, Wine],
    [/tv/i, Tv],
    [/laundry/i, Shirt],
    [/shuttle|airport/i, Bus],
];

export function getAmenityIcon(amenity: string): LucideIcon {
    return amenityIconRules.find(([pattern]) => pattern.test(amenity))?.[1] ?? CheckCircle2;
}

/**
 * Render an approximate review count compactly: 5600 -> "5.6K", 61600 -> "61.6K".
 * Stored counts are approximations from the source research, so they are always shown
 * rounded — never as an exact-looking figure like "61,600".
 */
export function formatReviewCount(count: number): string {
    if (count < 1000) {
        return String(count);
    }

    const thousands = count / 1000;

    // 61.6K, but 10K rather than 10.0K
    return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K`;
}
