import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * ============================================================================
 * Tunable constants - adjust these to change the look/feel of the journey path
 * ============================================================================
 */
// Overall visibility of the line itself (0 = invisible, 1 = fully opaque).
const PATH_OPACITY = 0.55;
// Line thickness in px.
const STROKE_WIDTH = 2.5;
// SVG dash pattern "<dash> <gap>" in px - controls the dotted/dashed look.
const DASH_PATTERN = '4 7';
// Brand colors used along the gradient, in page order (hero -> testimonials).
const COLOR_HERO_START = '#FEFEFE';
const COLOR_NAVY = '#024194';
const COLOR_SKY = '#1BA2FE';
const COLOR_GOLD = '#FBBD08';
// How far the S-curve swings left/right of center at each breakpoint (px).
const AMPLITUDE_DESKTOP = 300; // >=1024px
const AMPLITUDE_TABLET = 150; // >=768px
const AMPLITUDE_SMALL = 70; // >=640px
// Below this viewport width the path is hidden entirely (stacked single-column
// cards leave no real gutter to route a line through cleanly).
const MOBILE_HIDE_BREAKPOINT = 640;
// Higher = the plane/reveal catch up to scroll position faster (snappier);
// lower = smoother/laggier trailing motion. Range ~0.05-0.3 is reasonable.
const SCROLL_SMOOTHING = 0.12;
// Small checkpoint dot radius (desktop). Scales down on smaller breakpoints.
const CHECKPOINT_RADIUS = 5;

const PLANE_PATH =
    'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z';
// Small map-pin accent shown near "Featured Packages" once the line reaches it
// (Lucide's MapPin glyph, inlined as raw path/circle data).
const MAP_PIN_PATH = 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0';

interface Anchor {
    key: string;
    x: number;
    y: number;
}

type Side = 'left' | 'right' | 'center';

// The route, in page order. `side` decides which way the curve swings at that
// checkpoint (ignored for 'hero'/'why-booking'/'cta', which use their own
// element geometry instead of an amplitude offset).
const ROUTE: { key: string; side: Side }[] = [
    { key: 'hero', side: 'right' },
    { key: 'about', side: 'right' },
    { key: 'services', side: 'left' },
    { key: 'featured-packages', side: 'right' },
    { key: 'why-booking', side: 'center' },
    { key: 'testimonials', side: 'left' },
    { key: 'cta', side: 'center' },
];

function getAmplitude(width: number): number {
    if (width >= 1024) return AMPLITUDE_DESKTOP;
    if (width >= 768) return AMPLITUDE_TABLET;
    return AMPLITUDE_SMALL;
}

/** Threads a smooth cubic-bezier curve through the given points (Catmull-Rom to Bezier). */
function buildSmoothPath(points: Anchor[]): string {
    if (points.length < 2) return '';
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
}

/**
 * Measures the live position of each `[data-journey-anchor]` element (relative
 * to `wrapper`) and turns them into route waypoints. Returns null if an anchor
 * hasn't mounted yet.
 */
function computeAnchors(wrapper: HTMLElement, amplitude: number): Anchor[] | null {
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.width / 2;
    const points: Anchor[] = [];

    for (const { key, side } of ROUTE) {
        const el = key === 'cta' ? document.querySelector(`[data-journey-anchor="cta"]`) : wrapper.querySelector(`[data-journey-anchor="${key}"]`);
        if (!el) return null;

        const rect = el.getBoundingClientRect();
        const top = rect.top - wrapperRect.top;
        const left = rect.left - wrapperRect.left;
        const right = rect.right - wrapperRect.left;

        if (key === 'hero') {
            points.push({ key, x: right - 80, y: top + 80 });
        } else if (key === 'why-booking') {
            points.push({ key, x: left + rect.width / 2, y: top + rect.height / 2 });
        } else if (key === 'cta') {
            points.push({ key, x: centerX, y: top - 24 });
        } else {
            const offset = side === 'left' ? -amplitude : side === 'right' ? amplitude : 0;
            points.push({ key, x: centerX + offset, y: top - 16 });
        }
    }

    return points;
}

/**
 * Draws an animated flight-route line through the real gaps/whitespace of the
 * wrapped homepage sections (Hero through Testimonials). It sits at a lower
 * stacking level than the page's cards (which use `relative z-10`), so opaque
 * cards naturally mask the line wherever it would cross them - it only reads
 * as visible in the actual gutters between content. Hero and the CTA band are
 * excluded from the wrap since both are solid full-bleed brand-color
 * sections; the route starts near the hero's existing plane graphic and ends
 * just above the CTA instead of drawing across those backgrounds.
 */
export default function JourneyPath({ children }: { children: ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const overlaySvgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const revealRectRef = useRef<SVGRectElement>(null);
    const planeRef = useRef<SVGGElement>(null);
    const checkpointRefs = useRef<Record<string, SVGCircleElement | null>>({});
    const gradientRef = useRef<SVGLinearGradientElement>(null);
    const mapPinRef = useRef<SVGGElement>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const svg = svgRef.current;
        const overlaySvg = overlaySvgRef.current;
        const path = pathRef.current;
        const revealRect = revealRectRef.current;
        const plane = planeRef.current;
        const gradient = gradientRef.current;
        const mapPin = mapPinRef.current;
        if (!wrapper || !svg || !overlaySvg || !path || !revealRect || !plane || !gradient || !mapPin) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let anchors: Anchor[] | null = null;
        let svgHeight = 0;
        let wrapperTopAbs = 0;
        let targetProgress = 0;
        let currentProgress = 0;
        let rafId = 0;
        let resizeTimer: ReturnType<typeof setTimeout> | null = null;

        const rebuild = () => {
            const width = window.innerWidth;
            const shouldShow = width >= MOBILE_HIDE_BREAKPOINT;
            setVisible(shouldShow);
            if (!shouldShow) return;

            const amplitude = getAmplitude(width);
            anchors = computeAnchors(wrapper, amplitude);
            if (!anchors) return;

            svgHeight = anchors[anchors.length - 1].y + 40;
            const svgWidth = wrapper.getBoundingClientRect().width;
            svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
            svg.setAttribute('height', String(svgHeight));
            overlaySvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
            overlaySvg.setAttribute('height', String(svgHeight));
            path.setAttribute('d', buildSmoothPath(anchors));
            revealRect.setAttribute('height', prefersReducedMotion ? String(svgHeight) : '0');

            const heroAnchor = anchors.find((a) => a.key === 'hero');
            const heroFraction = heroAnchor ? Math.min(0.4, (heroAnchor.y + 120) / svgHeight) : 0.15;
            const stops = gradient.querySelectorAll('stop');
            stops[1]?.setAttribute('offset', `${(heroFraction * 100).toFixed(1)}%`);

            for (const anchor of anchors) {
                const circle = checkpointRefs.current[anchor.key];
                if (circle) {
                    circle.setAttribute('cx', String(anchor.x));
                    circle.setAttribute('cy', String(anchor.y));
                }
            }

            const featuredAnchor = anchors.find((a) => a.key === 'featured-packages');
            if (featuredAnchor) {
                mapPin.setAttribute('transform', `translate(${featuredAnchor.x + 18}, ${featuredAnchor.y - 10}) scale(0.7)`);
            }

            const wrapperRect = wrapper.getBoundingClientRect();
            wrapperTopAbs = wrapperRect.top + window.scrollY;

            if (prefersReducedMotion) {
                plane.style.opacity = '0';
                mapPin.style.opacity = '0.4';
                for (const key of Object.keys(checkpointRefs.current)) {
                    const circle = checkpointRefs.current[key];
                    if (circle) circle.style.opacity = '1';
                }
            }
        };

        const updateTargetProgress = () => {
            if (!anchors) return;
            const viewportH = window.innerHeight;
            const start = wrapperTopAbs - viewportH / 2;
            const end = wrapperTopAbs + svgHeight - viewportH / 2;
            const raw = (window.scrollY - start) / (end - start);
            targetProgress = Math.min(1, Math.max(0, raw));
        };

        const render = () => {
            currentProgress += (targetProgress - currentProgress) * SCROLL_SMOOTHING;
            if (Math.abs(targetProgress - currentProgress) < 0.0008) currentProgress = targetProgress;

            revealRect.setAttribute('height', String(currentProgress * svgHeight));

            const length = path.getTotalLength();
            if (length > 0) {
                const dist = currentProgress * length;
                const point = path.getPointAtLength(dist);
                const ahead = path.getPointAtLength(Math.min(length, dist + 1));
                const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * (180 / Math.PI);
                plane.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
                plane.style.opacity = currentProgress <= 0.001 ? '0' : '1';
            }

            const revealedY = currentProgress * svgHeight;
            if (anchors) {
                for (const anchor of anchors) {
                    const circle = checkpointRefs.current[anchor.key];
                    if (circle) circle.style.opacity = revealedY >= anchor.y ? '1' : '0';
                }
                const featuredAnchor = anchors.find((a) => a.key === 'featured-packages');
                if (featuredAnchor) {
                    mapPin.style.opacity = revealedY >= featuredAnchor.y ? '0.4' : '0';
                }
            }

            rafId = requestAnimationFrame(render);
        };

        rebuild();
        updateTargetProgress();

        const onScroll = () => updateTargetProgress();
        const onResize = () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                rebuild();
                updateTargetProgress();
            }, 150);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);
        document.fonts?.ready.then(onResize);

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(wrapper);

        if (!prefersReducedMotion) {
            rafId = requestAnimationFrame(render);
        }

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('orientationchange', onResize);
            resizeObserver.disconnect();
            if (resizeTimer) clearTimeout(resizeTimer);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            {/* Layer 1: the dotted line itself, sitting BELOW the page's cards (which
                use `relative z-10`) so opaque cards mask it wherever it would cross
                them - it only reads as visible in the real gaps/whitespace. */}
            <svg ref={svgRef} className={visible ? 'pointer-events-none absolute top-0 left-0 z-0 w-full' : 'hidden'} fill="none" aria-hidden="true">
                <defs>
                    <linearGradient ref={gradientRef} id="journey-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLOR_HERO_START} />
                        <stop offset="15%" stopColor={COLOR_NAVY} />
                        <stop offset="65%" stopColor={COLOR_SKY} />
                        <stop offset="100%" stopColor={COLOR_GOLD} />
                    </linearGradient>
                    <clipPath id="journey-reveal-clip">
                        <rect ref={revealRectRef} x="0" y="0" width={6000} height="0" />
                    </clipPath>
                </defs>

                <g clipPath="url(#journey-reveal-clip)">
                    <path
                        ref={pathRef}
                        stroke="url(#journey-gradient)"
                        strokeWidth={STROKE_WIDTH}
                        strokeDasharray={DASH_PATTERN}
                        strokeLinecap="round"
                        opacity={PATH_OPACITY}
                    />
                </g>
            </svg>

            {/* Layer 2: the moving plane, checkpoints and map-pin accent - kept ABOVE
                the cards (z-20) since these are the elements guiding the eye and
                should stay visible even where the trailing line ducks behind content. */}
            <svg
                ref={overlaySvgRef}
                className={visible ? 'pointer-events-none absolute top-0 left-0 z-20 w-full' : 'hidden'}
                fill="none"
                aria-hidden="true"
            >
                {ROUTE.filter((r) => r.key !== 'hero' && r.key !== 'cta').map((r) => (
                    <circle
                        key={r.key}
                        ref={(el) => {
                            checkpointRefs.current[r.key] = el;
                        }}
                        r={CHECKPOINT_RADIUS}
                        fill={COLOR_GOLD}
                        stroke={COLOR_NAVY}
                        strokeWidth={1.5}
                        style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
                    />
                ))}

                <g ref={planeRef} style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
                    <g transform="translate(-9, -9) scale(0.75)">
                        <path d={PLANE_PATH} fill={COLOR_GOLD} stroke={COLOR_NAVY} strokeWidth={0.75} strokeLinejoin="round" />
                    </g>
                </g>

                {/* Single subtle travel-icon accent near "Featured Packages" (optional per spec, kept minimal). */}
                <g ref={mapPinRef} style={{ opacity: 0, transition: 'opacity 0.4s ease' }}>
                    <path d={MAP_PIN_PATH} fill="none" stroke={COLOR_NAVY} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" fill="none" stroke={COLOR_NAVY} strokeWidth={1.75} />
                </g>
            </svg>
            {children}
        </div>
    );
}
