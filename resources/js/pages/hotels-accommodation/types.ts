export interface HotelHighlight {
    icon: string;
    title: string;
    description: string;
}

export interface Hotel {
    id: number;
    name: string;
    slug: string;
    city: string;
    google_rating: string | null;
    google_review_count: number | null;
    google_data_checked_at: string | null;
    categories: string[] | null;
    distance_landmark: string | null;
    description: string;
    amenities: string[];
    room_types: string[];
    check_in_time: string | null;
    check_out_time: string | null;
    google_maps_url: string | null;
    image: string | null;
    gallery: string[] | null;
    accepting_enquiries: boolean;
    highlights: HotelHighlight[];
}
