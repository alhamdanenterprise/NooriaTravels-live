export interface FeaturedPackage {
    type: string;
    title: string;
    slug: string;
    durationDays: number;
    hotelStars: number;
    transportIncluded: boolean;
    price: number;
    currency: string;
}

export interface Testimonial {
    name: string;
    location: string;
    rating: number;
    review: string;
}
