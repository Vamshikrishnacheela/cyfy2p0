import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Eyebrow } from '../components/home/ui';
import { usePageMeta } from '../lib/usePageMeta';

interface EventPhoto { src: string; alt: string; portrait?: boolean }

// "CYFY 2nd Anniversary 2026": the ten photos from Cyfy_photos.zip (6240x4160 originals, resized to 1200px on the
// long side; photo 9 is portrait).
const anniversary = (n: number) => new URL(`../assets/events/cyfy-2nd-anniversary-2026-${String(n).padStart(2, '0')}.jpg`, import.meta.url).href;
const ANNIVERSARY_PHOTOS: EventPhoto[] = [
  { src: anniversary(1), alt: "Stage set up at night for Cymposium, CYFY's 2nd Annual Day" },
  { src: anniversary(2), alt: 'Speaker addressing the audience in front of the CYFY Solutions 2nd Annual Day screen' },
  { src: anniversary(3), alt: 'CYFY team on stage with the anniversary cake' },
  { src: anniversary(4), alt: 'Best Employee excellence award presented on stage' },
  { src: anniversary(5), alt: 'CYFY team group photo outdoors' },
  { src: anniversary(6), alt: 'The Zero to One Award presented on stage' },
  { src: anniversary(7), alt: 'The Growth Mindset award presented on stage' },
  { src: anniversary(8), alt: 'The Catalyst Award presented on stage' },
  { src: anniversary(9), alt: 'Speaker on stage at the CYFY 2nd Annual Day celebration', portrait: true },
  { src: anniversary(10), alt: 'Team members posing in the CYFY 2 Years Anniversary photo frame' },
];

// "CYBER DOME 2025": heading and eight carousel photos from https://www.cyfy.ai/events
// (originals 7008x4672, resized to 1200x800).
const photo = (n: number) => new URL(`../assets/events/cyber-dome-2025-${n}.jpg`, import.meta.url).href;
const CYBER_DOME_PHOTOS: EventPhoto[] = [
  { src: photo(1), alt: 'Award winner presentation on stage at Cyber Dome 2025 Data Security Summit & Awards' },
  { src: photo(2), alt: 'Award presentation in front of the Cyber Dome 2025 Data Security Summit & Awards backdrop' },
  { src: photo(3), alt: 'Speakers and guests on stage behind the Cyberdome 2025 sign' },
  { src: photo(4), alt: 'Speaker addressing the audience from the Cyber Dome 2025 podium' },
  { src: photo(5), alt: 'Delegates gathered on stage for a group photo at Cyberdome 2025' },
  { src: photo(6), alt: 'Presentation on stage during a Cyber Dome 2025 session' },
  { src: photo(7), alt: 'Panel discussion on The Future of Data Governance: AI, Automation, and Zero Trust at Cyberdome 2025' },
  { src: photo(8), alt: 'Attendees gathered for a group photo in the Cyber Dome 2025 hall' },
];

const EVENTS = [
  { id: 'cyfy-2nd-anniversary-2026', title: 'CYFY 2nd Anniversary 2026', photos: ANNIVERSARY_PHOTOS, autoplayMs: 4000, stepByPage: false },
  { id: 'cyber-dome-2025', title: 'CYBER DOME 2025', photos: CYBER_DOME_PHOTOS, autoplayMs: 4000, stepByPage: false },
];

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
 * Horizontal photo carousel that loops endlessly. The track holds copies of the photos (two screens' worth) at
 * either end, so a step of up to one full screen never runs out of photos; after landing on a copy it silently
 * resets to the matching real photo. `stepByPage` advances a whole screen of photos at a time.
 */
function PhotoCarousel({ photos, label, autoplayMs, stepByPage }: { photos: EventPhoto[]; label: string; autoplayMs: number; stepByPage: boolean }) {
  const n = photos.length;
  const perView = usePerView();
  const lead = perView * 2; // copies before (and after) the real photos
  const step = stepByPage ? perView : 1;
  const reduceMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;
  const [pos, setPos] = useState(lead); // position in the extended track (copies included)
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(!reduceMotion);
  const [paused, setPaused] = useState(false); // hover or keyboard focus
  const busy = useRef(false);
  const swipeX = useRef<number | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;
  const resetTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const wrap = (i: number) => ((i % n) + n) % n;
  const slides = Array.from({ length: n + lead * 2 }, (_, i) => photos[wrap(i - lead)]);
  const current = wrap(pos - lead);

  // Keep showing the same photo when the layout changes between 1, 2 and 3 photos per view
  const prevLead = useRef(lead);
  useEffect(() => {
    if (prevLead.current === lead) return;
    const real = wrap(pos - prevLead.current);
    prevLead.current = lead;
    setAnimate(false);
    setPos(lead + real);
  }, [lead, pos, n]);

  const move = useCallback((to: number) => {
    if (busy.current) return;
    busy.current = true;
    setAnimate(true);
    setPos(to);
    resetTimer.current = window.setTimeout(() => {
      // Landed on a copy: jump (without animating) to the real photo it duplicates
      const p = posRef.current;
      if (p >= n + lead || p < lead) {
        setAnimate(false);
        setPos(lead + wrap(p - lead));
      }
      busy.current = false;
    }, reduceMotion ? 0 : SLIDE_MS + 30);
  }, [n, lead, reduceMotion]);

  const go = useCallback((step: number) => move(pos + step), [move, pos]);

  // Re-enable the slide animation on the frame after a silent reset
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  useEffect(() => {
    if (!playing || paused) return;
    const t = window.setTimeout(() => go(step), autoplayMs);
    return () => window.clearTimeout(t);
  }, [playing, paused, go, pos, step, autoplayMs]);

  const onPointerDown = (e: PointerEvent) => { swipeX.current = e.clientX; };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? step : -step);
  };

  const ctrl = 'flex items-center justify-center rounded-full border border-border-base bg-surface/90 text-text-base shadow-md shadow-black/10 backdrop-blur-sm transition-colors hover:border-brand-ink hover:text-brand-ink';

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false); }}
      onKeyDown={e => { if (e.key === 'ArrowRight') go(step); if (e.key === 'ArrowLeft') go(-step); }}
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
              const isCopy = i < lead || i >= n + lead;
              const visible = i >= pos && i < pos + perView;
              return (
                <li
                  key={i}
                  role={isCopy ? undefined : 'group'}
                  aria-roledescription={isCopy ? undefined : 'slide'}
                  aria-label={isCopy ? undefined : `${i - lead + 1} of ${n}`}
                  aria-hidden={isCopy || !visible}
                  className="shrink-0"
                  style={{ flexBasis: `calc((100% - ${(perView - 1) * GAP_PX}px) / ${perView})` }}
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border-base bg-surface-2 shadow-lg shadow-black/10">
                    {/* Portrait photos are shown whole, centred on a blurred copy of themselves, so the frame size stays the same */}
                    {p.portrait && <img src={p.src} alt="" aria-hidden="true" draggable={false} loading={visible ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-70" />}
                    <img src={p.src} alt={isCopy ? '' : p.alt} draggable={false} loading={visible ? 'eager' : 'lazy'} className={`relative h-full w-full ${p.portrait ? 'object-contain' : 'object-cover'}`} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button type="button" onClick={() => go(-step)} aria-label={step > 1 ? 'Previous photos' : 'Previous photo'} className={`${ctrl} absolute left-2 md:-left-5 top-1/2 h-10 w-10 md:h-11 md:w-11 -translate-y-1/2`}>
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(step)} aria-label={step > 1 ? 'Next photos' : 'Next photo'} className={`${ctrl} absolute right-2 md:-right-5 top-1/2 h-10 w-10 md:h-11 md:w-11 -translate-y-1/2`}>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => setPlaying(v => !v)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className={`${ctrl} h-9 w-9`}>
          {playing ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
        </button>
        <div className="flex items-center gap-1" role="group" aria-label="Choose photo">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => move(lead + i)}
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
  usePageMeta({
    title: 'Events | CYFY Solutions',
    description: 'Photos from CYFY events, including the CYFY 2nd Anniversary 2026 and Cyber Dome 2025.',
  });

  return (
    // Same background stack as the homepage hero: theme-aware gradient, technical grid and ambient glow
    <section aria-labelledby="events-title" className="relative hero-bg overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="shell relative pt-28 md:pt-36 pb-16 md:pb-24">
        <h1 id="events-title" className="sr-only">Events</h1>
        <Eyebrow>Events</Eyebrow>
        {/* Most recent event first; every event uses the same heading and carousel styling */}
        <div className="space-y-20 md:space-y-24">
          {EVENTS.map(ev => (
            <article key={ev.id} id={ev.id} aria-labelledby={`${ev.id}-title`} className="scroll-mt-28">
              <h2 id={`${ev.id}-title`} className="text-4xl md:text-5xl font-semibold tracking-tight">{ev.title}</h2>
              <div className="mt-10 md:mt-12">
                <PhotoCarousel photos={ev.photos} label={`${ev.title} photos`} autoplayMs={ev.autoplayMs} stepByPage={ev.stepByPage} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
