import { Linkedin } from 'lucide-react';
import { Reveal, Eyebrow } from '../components/home/ui';
import { usePageMeta } from '../lib/usePageMeta';

interface TeamMember { name: string; title: string; image: string; linkedin: string; position?: string }

// Photos from the "CYFY TEAM" folder, resized to 800px wide (Srikar's 400x400 original is used as is).
// `position` keeps each face in frame inside the 4:5 portrait crop.
const photo = (file: string) => new URL(`../assets/team/${file}`, import.meta.url).href;
const TEAM: TeamMember[] = [
  { name: 'Rakesh Reddy', title: 'Founder & CEO', image: photo('rakesh-reddy.jpg'), linkedin: 'https://www.linkedin.com/in/rakesh-reddy-gaddam-4aa20915/', position: '48% 50%' },
  { name: 'Babu VY', title: 'Lead Techno Sales', image: photo('babu-vy.jpg'), linkedin: 'https://www.linkedin.com/in/yesu-babu-veeranki-62415b24/', position: '50% 4%' },
  { name: 'Naveen Adiraju', title: 'Director Sales – Business Development', image: photo('naveen-adiraju.jpg'), linkedin: 'https://www.linkedin.com/in/naveen-adiraju/', position: '50% 25%' },
  { name: 'Anil B', title: 'Lead Architect – Network & Security', image: photo('anil-b.jpg'), linkedin: 'https://www.linkedin.com/in/anil-kumar-bellana-5b8b96192/', position: '53% 50%' },
  { name: 'Srikar Marupaka', title: 'Senior Cyber Security Engineer', image: photo('srikar-marupaka.jpg'), linkedin: 'https://www.linkedin.com/in/srikar-marupaka-727157157/', position: '45% 50%' },
  { name: 'G Vineeth Vishesh', title: 'Senior Cyber Security Engineer', image: photo('g-vineeth-vishesh.jpg'), linkedin: 'https://www.linkedin.com/in/vineet-vishesh-66ab95281/', position: '48% 50%' },
];

export default function MeetOurTeamPage() {
  usePageMeta({
    title: 'Meet Our Team | CYFY Solutions',
    description: "Meet the people behind CYFY's cybersecurity expertise: the leadership, sales and security engineering team at CYFY Solutions Pvt. Ltd.",
  });

  return (
    <section aria-labelledby="team-title" className="scene scene-glow pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="shell">
        {/* Capped widths keep cards compact: ~20rem single column, ~17rem per card in two and three columns */}
        <div className="mx-auto max-w-[20rem] min-[480px]:max-w-[36rem] lg:max-w-[54rem]">
          <Reveal className="max-w-2xl mb-10 md:mb-12">
            <Eyebrow>Company</Eyebrow>
            <h1 id="team-title" className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08]">Meet Our Team</h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-text-muted">The People Behind CYFY's Cybersecurity Expertise</p>
          </Reveal>

          <ul className="grid min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM.map((m, i) => (
              <li key={m.name}>
                <Reveal delay={Math.min(i, 5) * 0.05} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-base bg-surface transition-colors hover:border-brand-ink/50">
                    <div className="relative aspect-[4/5] bg-surface-2">
                      <img
                        src={m.image}
                        alt={`Portrait of ${m.name}, ${m.title} at CYFY`}
                        loading={i < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: m.position }}
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-3 p-4">
                      <div>
                        <h2 className="text-base md:text-lg font-semibold leading-snug">{m.name}</h2>
                        <p className="mt-0.5 text-[13px] leading-snug text-amber-ink">{m.title}</p>
                      </div>
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${m.name}'s LinkedIn profile (opens in a new tab)`}
                        title="LinkedIn profile"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong text-text-muted transition-colors hover:border-brand-ink hover:text-brand-ink"
                      >
                        <Linkedin className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
