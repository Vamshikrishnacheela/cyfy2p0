import { PARTNERS } from '../../homeContent';
import { Reveal, SectionHeader } from './ui';

export default function PartnersPlatforms() {
  return (
    <section id="partners" className="scene scene-tint py-20 md:py-28 bg-surface-2">
      <div className="shell">
        <SectionHeader
          eyebrow="Technology partners"
          title="Built on the platforms your team already trusts."
          body="Our top strategic OEM partners. We design and run each of them for you. Full list of 30+ partners on request."
        />

        <Reveal>
          {/* Fixed-size tiles; each tile takes the logo's own background colour so logos keep their original artwork */}
          <ul className="flex flex-wrap justify-center gap-3" aria-label="Technology partners">
            {PARTNERS.map(p => (
              <li
                key={p.name}
                title={p.name}
                style={{ backgroundColor: p.plate }}
                className="flex h-24 md:h-28 shrink-0 basis-[calc((100%-0.75rem)/2)] sm:basis-[calc((100%-1.5rem)/3)] lg:basis-[calc((100%-3rem)/5)] xl:basis-[calc((100%-4.5rem)/7)] items-center justify-center rounded-xl border border-border-base px-5 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg hover:shadow-black/10"
              >
                <img src={p.logo} alt={`${p.name} logo`} loading="lazy" draggable={false} className="block max-h-12 md:max-h-14 w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
