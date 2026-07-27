import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

const SVG_WIDTH = 48;
const CENTER_X = SVG_WIDTH / 2;
const AMPLITUDE = 16;
const WAVELENGTH = 520;
const SAMPLE_STEP = 24;
const GUTTER_OFFSET = 680;

const PLANE_PATH =
    'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z';

/**
 * Samples a sine wave down the given height, then threads a smooth cubic-bezier
 * curve through those points (Catmull-Rom to Bezier conversion) so the path is
 * mathematically continuous at any content height, rather than hand-drawn.
 */
function buildWavePath(height: number): string {
    if (height <= 0) {
        return '';
    }

    const points: { x: number; y: number }[] = [];
    for (let y = 0; y <= height; y += SAMPLE_STEP) {
        points.push({ x: CENTER_X + AMPLITUDE * Math.sin((2 * Math.PI * y) / WAVELENGTH), y });
    }
    if (points[points.length - 1].y !== height) {
        points.push({ x: CENTER_X + AMPLITUDE * Math.sin((2 * Math.PI * height) / WAVELENGTH), y: height });
    }
    if (points.length < 2) {
        return `M ${points[0].x} ${points[0].y}`;
    }

    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }

    return d;
}

/**
 * Wraps a run of home-page sections with an animated flight path that traces
 * down the left margin gutter, growing in as the wrapped content scrolls past,
 * with a plane icon traveling along it. Only shown at 2xl+ where the gutter
 * outside the max-w-7xl content column is wide enough to hold it without
 * ever overlapping page content.
 */
export default function FlowingRoute({ children }: { children: ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const planeRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const svg = svgRef.current;
        const path = pathRef.current;
        const plane = planeRef.current;
        if (!wrapper || !svg || !path || !plane) {
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            const rebuild = () => {
                const height = wrapper.offsetHeight;
                svg.setAttribute('viewBox', `0 0 ${SVG_WIDTH} ${height}`);
                svg.setAttribute('height', String(height));
                path.setAttribute('d', buildWavePath(height));

                ScrollTrigger.getAll()
                    .filter((trigger) => trigger.trigger === wrapper)
                    .forEach((trigger) => trigger.kill());

                if (prefersReducedMotion) {
                    gsap.set(path, { drawSVG: '100%' });
                    gsap.set(plane, { opacity: 0 });
                    return;
                }

                gsap.set(path, { drawSVG: '0%' });

                gsap.to(path, {
                    drawSVG: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 0.6,
                    },
                });

                gsap.to(plane, {
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 0.6,
                    },
                    motionPath: {
                        path,
                        align: path,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: 0,
                    },
                });
            };

            rebuild();

            const observer = new ResizeObserver(() => {
                rebuild();
                ScrollTrigger.refresh();
            });
            observer.observe(wrapper);

            return () => observer.disconnect();
        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            <svg
                ref={svgRef}
                className="pointer-events-none absolute top-0 hidden 2xl:block"
                style={{ left: `calc(50% - ${GUTTER_OFFSET}px)`, width: SVG_WIDTH }}
                width={SVG_WIDTH}
                fill="none"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="flowing-route-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#024194" />
                        <stop offset="100%" stopColor="#fbbd08" />
                    </linearGradient>
                </defs>
                <path ref={pathRef} stroke="url(#flowing-route-gradient)" strokeWidth={2} strokeLinecap="round" />
                <g ref={planeRef}>
                    <g transform="translate(-9, -9) scale(0.75)">
                        <path d={PLANE_PATH} fill="#fbbd08" stroke="#024194" strokeWidth={0.75} strokeLinejoin="round" />
                    </g>
                </g>
            </svg>
            {children}
        </div>
    );
}
