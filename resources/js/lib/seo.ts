export const SITE_URL = 'https://nooriatravels.com';

/**
 * Builds an absolute nooriatravels.com URL from a root-relative path.
 * Used for canonical links and Open Graph/Twitter image URLs, which must be absolute.
 */
export function absoluteUrl(path: string): string {
    return `${SITE_URL}${path}`;
}
