export interface PriceTier {
    sharing_type: 'double' | 'triple' | 'quad' | null;
    currency: string;
    price: number;
}

export interface UmrahPackage {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string | null;
    duration_label: string;
    makkah_nights: number;
    madinah_nights: number;
    makkah_hotel_name: string;
    makkah_hotel_stars: number;
    madinah_hotel_name: string;
    madinah_hotel_stars: number;
    meal_plan: string;
    inclusions: string[];
    visa_included: boolean;
    flight_included: boolean;
    pricing: PriceTier[];
    notes: string | null;
    is_featured: boolean;
    categories: string[];
}
