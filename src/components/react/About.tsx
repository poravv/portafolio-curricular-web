import type { Profile, Project } from '@/lib/portfolio';
import Section from './ui/Section';

interface AboutProps {
  profile: Profile;
  projects: Project[];
}

/** Professional summary plus two figures derived from the data (never hand-typed numbers). */
export default function About({ profile, projects }: AboutProps) {
  const publishedCount = projects.filter((p) => p.url || ('playStore' in p && p.playStore)).length;

  const figures = [
    { value: profile.yearsOfExperience, label: 'años de experiencia', detail: `desde ${profile.careerStartYear}` },
    { value: publishedCount, label: 'proyectos publicados', detail: 'con sitio o app accesible' },
  ];

  return (
    <Section id="about" index="01" title="Sobre mí">
      <p className="max-w-2xl text-body-lg text-fg-muted">{profile.summary}</p>

      <dl className="mt-12 grid grid-cols-2 border-t border-line">
        {figures.map((figure) => (
          <div key={figure.label} className="border-b border-line py-6 pr-4 odd:border-r odd:pr-6 even:pl-6">
            <dt className="eyebrow">{figure.label}</dt>
            <dd className="mt-3 font-display text-h2 tabular-nums text-fg">{figure.value}</dd>
            <dd className="mt-1 text-body-sm text-fg-subtle">{figure.detail}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
