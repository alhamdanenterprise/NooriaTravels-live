import { absoluteUrl } from '@/lib/seo';

interface SeoTagsProps {
    /** Page title without the " - Nooria Travels" suffix (Inertia's <Head title> already appends that for the <title> tag itself). */
    title: string;
    description: string;
    /** Root-relative path, e.g. "/about". */
    path: string;
    /** Root-relative image path used for social share previews. Defaults to the home hero banner. */
    image?: string;
}

/**
 * Returns the standard set of per-page SEO tags: canonical link, Open Graph, and Twitter Card.
 *
 * IMPORTANT: Inertia's <Head> walks its `children` and reads each child's `.type` directly as an
 * HTML tag name (it doesn't render nested React components) — so this must be a plain function
 * returning an array of real <meta>/<link> elements, spread directly into <Head>'s children,
 * e.g. `<Head title="...">{seoTags({...})}</Head>`. A component used as `<SeoTags .../>` (or a
 * Fragment) would silently produce nothing, since Head never resolves that nested element tree.
 */
export function seoTags({ title, description, path, image = '/images/hero.webp' }: SeoTagsProps) {
    const url = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);
    const fullTitle = `${title} - Nooria Travels`;

    return [
        <meta key="description" name="description" content={description} />,
        <link key="canonical" rel="canonical" href={url} />,

        <meta key="og:type" property="og:type" content="website" />,
        <meta key="og:site_name" property="og:site_name" content="Nooria Travels" />,
        <meta key="og:locale" property="og:locale" content="en_US" />,
        <meta key="og:title" property="og:title" content={fullTitle} />,
        <meta key="og:description" property="og:description" content={description} />,
        <meta key="og:url" property="og:url" content={url} />,
        <meta key="og:image" property="og:image" content={imageUrl} />,

        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
        <meta key="twitter:title" name="twitter:title" content={fullTitle} />,
        <meta key="twitter:description" name="twitter:description" content={description} />,
        <meta key="twitter:image" name="twitter:image" content={imageUrl} />,
    ];
}
