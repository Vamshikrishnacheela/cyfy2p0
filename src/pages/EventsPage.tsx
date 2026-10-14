import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Eyebrow } from '../components/home/ui';

// Event content from https://www.cyfy.ai/events: the "CYBER DOME 2025" heading and its eight carousel photos
// (originals 7008x4672, resized to 1200x800).
const photo = (n: number) => new URL(`../assets/events/cyber-dome-2025-${n}.jpg`, import.meta.url).href;
const PHOTOS = [
  { src: photo(1), alt: 'Award winner presentation on stage at Cyber Dome 2025 Data Security Summit & Awards' },
  { src: photo(2), alt: 'Award presentation in front of the Cyber Dome 2025 Data Security Summit & Awards backdrop' },
  { src: photo(3), alt: 'Speakers and guests on stage behind the Cyberdome 2025 sign' },
  { src: photo(4), alt: 'Speaker addressing the audience from the Cyber Dome 2025 podium' },
  { src: photo(5), alt: 'Delegates gathered on stage for a group photo at Cyberdome 2025' },
  { src: photo(6), alt: 'Presentation on stage during a Cyber Dome 2025 session' },
  { src: photo(7), alt: 'Panel discussion on The Future of Data Governance: AI, Automation, and Zero Trust at Cyberdome 2025' },
  { src: photo(8), alt: 'Attendees gathered for a group photo in the Cyber Dome 2025 hall' },
];

const AUTOPLAY_MS = 4000;
const SLIDE_MS = 700;
const GAP_PX = 16;

/** Photos visible at once: 1 on phones, 2 on tablets, 3 on desktop. */
function usePerView() {
  const get = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
  const [perView, setPerView] = useState(get);
  useEffect(() => {
    const onResize = () => setPerView(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return perView;
}

/**
 * Horizontal photo carousel that loops endlessly: the track holds copies of the last and first `perView`
 * photos at either end, and after sliding onto a copy it silently resets to the matching real photo.
 */
function PhotoCarousel() {
  const n = PHOTOS.length;
  const perView = usePerView();
  const reduceMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;
  const [pos, setPos] = useState(perView); // position in the extended track (copies included)
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(!reduceMotion);
  const [paused, setPaused] = useState(false); // hover or keyboard focus
  const busy = useRef(false);
  const swipeX = useRef<number | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  const slides = [...PHOTOS.slice(n - perView), ...PHOTOS, ...PHOTOS.slice(0, perView)];
  const current = (((pos - perView) % n) + n) % n;

  // Keep showing the same photo when the layout changes between 1, 2 and 3 photos per view
  const prevPerView = useRef(perView);
  useEffect(() => {
    if (prevPerView.current === perView) return;
    const real = (((pos - prevPerView.current) % n) + n) % n;
    prevPerView.current = perView;
    setAnimate(false);
    setPos(perView + real);
  }, [perView, pos, n]);

  const move = useCallback((to: number) => {
    if (busy.current) return;
    busy.current = true;
    setAnimate(true);
    setPos(to);
    window.setTimeout(() => {
      // Landed on a copy: jump (without animating) to the real photo it duplicates
      const p = posRef.current;
      if (p >= n + perView || p < perView) {
        setAnimate(false);
        setPos(p >= n + perView ? p - n : p + n);
      }
      busy.current = false;
    }, reduceMotion ? 0 : SLIDE_MS + 30);
  }, [n, perView, reduceMotion]);

  const go = useCallback((step: number) => move(pos + step), [move, pos]);

  // Re-enable the slide animation on the frame after a silent reset
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  useEffect(() => {
    if (!playing || paused) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [playing, paused, go, pos]);

  const onPointerDown = (e: PointerEvent) => { swipeX.current = e.clientX; };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const ctrl = 'flex items-center justify-center rounded-full border border-border-base bg-surface/90 text-text-base shadow-md shadow-black/10 backdrop-blur-sm transition-colors hover:border-brand-ink hover:text-brand-ink';

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Cyber Dome 2025 photos"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false); }}
      onKeyDown={e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}
    >
      <div className="relative">
        <div
          className="overflow-hidden rounded-2xl touch-pan-y select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { swipeX.current = null; }}
        >
          <ul
            className="flex"
            style={{
              gap: GAP_PX,
              transform: `translate3d(calc(${-pos} * (100% + ${GAP_PX}px) / ${perView}), 0, 0)`,
              transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
            }}
            aria-live={playing && !paused ? 'off' : 'polite'}
          >
            {slides.map((p, i) => {
              const isCopy = i < perView || i >= n + perView;
              const visible = i >= pos && i < pos + perView;
              return (
                <li
                  key={`${i}-${p.src}`}
                  role={isCopy ? undefined : 'group'}
                  aria-roledescription={isCopy ? undefined : 'slide'}
                  aria-label={isCopy ? undefined : `${PHOTOS.indexOf(p) + 1} of ${n}`}
                  aria-hidden={isCopy || !visible}
                  className="shrink-0"
                  style={{ flexBasis: `calc((100% - ${(perView - 1) * GAP_PX}px) / ${perView})` }}
                >
                  <div className="aspect-[3/2] overflow-hidden rounded-xl border border-border-base bg-surface-2 shadow-lg shadow-black/10">
                    <img src={p.src} alt={isCopy ? '' : p.alt} draggable={false} loading={visible ? 'eager' : 'lazy'} className="h-full w-full object-cover" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${ctrl} absolute left-2 md:-left-5 top-1/2 h-10 w-10 md:h-11 md:w-11 -translate-y-1/2`}>
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${ctrl} absolute right-2 md:-right-5 top-1/2 h-10 w-10 md:h-11 md:w-11 -translate-y-1/2`}>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => setPlaying(v => !v)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className={`${ctrl} h-9 w-9`}>
          {playing ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
        </button>
        <div className="flex items-center gap-1" role="group" aria-label="Choose photo">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => move(perView + i)}
              aria-label={`Show photo ${i + 1} of ${n}`}
              aria-current={i === current ? 'true' : undefined}
              className="group/dot flex h-6 w-6 items-center justify-center"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-brand-ink' : 'w-2 bg-border-strong group-hover/dot:bg-text-subtle'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Events | CYFY Solutions';
    return () => { document.title = prev; };
  }, []);

  return (
    // Same background stack as the homepage hero: theme-aware gradient, technical grid and ambient glow
    <section aria-labelledby="events-title" className="relative hero-bg overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="shell relative pt-28 md:pt-36 pb-16 md:pb-24">
        <Eyebrow>Events</Eyebrow>
        <h1 id="events-title" className="text-4xl md:text-5xl font-semibold tracking-tight">CYBER DOME 2025</h1>
        <div className="mt-10 md:mt-12">
          <PhotoCarousel />
        </div>
      </div>
    </section>
  );
}
