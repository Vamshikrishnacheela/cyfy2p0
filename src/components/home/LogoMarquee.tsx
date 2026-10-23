import type { LogoItem } from '../../homeContent';

// Logos are sized to a similar visual area (wide wordmarks shorter, compact marks taller), capped in height,
// so they read as a consistent set. Desktop sizes; phones scale them to 80% via --logo-scale.
const LOGO_AREA = 6000;
const LOGO_MAX_H = 52;
const SECONDS_PER_LOGO = 50 / 14;
// Only one dimension is set; the browser derives the other from the file, so the aspect ratio is exact.
function logoSize(ratio: number) {
  const w = Math.sqrt(LOGO_AREA * ratio);
  return w / ratio > LOGO_MAX_H
    ? { height: `calc(var(--logo-scale) * ${LOGO_MAX_H}px)`, width: 'auto' }
    : { width: `calc(var(--logo-scale) * ${Math.round(w)}px)`, height: 'auto' };
}

/** One copy of the logo row. The marquee renders it twice; the second copy is hidden from screen readers. */
function LogoRow({ logos, label, copy = false }: { logos: LogoItem[]; label: string; copy?: boolean }) {
  return (
    <ul className="marquee-row flex shrink-0 items-center gap-4 pr-4 md:gap-5 md:pr-5 [--logo-scale:0.8] md:[--logo-scale:1]" aria-label={copy ? undefined : label} aria-hidden={copy || undefined}>
      {logos.map(p => (
        // Each tile takes the logo's own background colour, so logos keep their original artwork in both themes
        <li
          key={p.name}
          title={copy ? undefined : p.name}
          style={{ backgroundColor: p.plate }}
          className="flex h-20 md:h-24 shrink-0 items-center justify-center rounded-xl border border-border-base px-6 md:px-8 shadow-sm shadow-black/5"
        >
          <img src={p.logo} alt={copy ? '' : `${p.name} logo`} draggable={false} style={logoSize(p.ratio)} className="block max-w-none object-contain" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Full-width single-line marquee: two identical rows slide left by one row's width, then repeat.
 * Pauses on hover and focus; with reduced motion it stops and the single row scrolls sideways (see index.css).
 */
export default function LogoMarquee({ logos, label }: { logos: LogoItem[]; label: string }) {
  return (
    <div className="marquee-viewport overflow-hidden py-2">
      {/* Duration scales with the number of logos (50s for the 14 partners), so every strip moves at a similar pace */}
      <div className="marquee-track flex w-max" style={{ animationDuration: `${(logos.length * SECONDS_PER_LOGO).toFixed(1)}s` }}>
        <LogoRow logos={logos} label={label} />
        <LogoRow logos={logos} label={label} copy />
      </div>
    </div>
  );
}
