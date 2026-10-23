import { PARTNERS } from '../../homeContent';
import { Reveal, SectionHeader } from './ui';
import LogoMarquee from './LogoMarquee';

export default function PartnersPlatforms() {
  return (
    // Base background between the tinted platform and customer proof sections
    <section id="partners" className="scene scene-glow py-20 md:py-28 bg-bg-base">
      <div className="shell">
        <SectionHeader
          eyebrow="Technology partners"
          title="Built on the platforms your team already trusts."
          body="Our top strategic OEM partners. We design and run each of them for you. Full list of 30+ partners on request."
        />
      </div>

      <Reveal>
        <LogoMarquee logos={PARTNERS} label="Technology partners" />
      </Reveal>
    </section>
  );
}
