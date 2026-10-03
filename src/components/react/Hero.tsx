import { ArrowDown, Download } from 'lucide-react';
import { getShortName, type Certification, type Experience, type Profile } from '@/lib/portfolio';

interface HeroProps {
  profile: Profile;
  experience: Experience[];
  certifications: Certification[];
}

/** Opening section: name, role, a one-line positioning statement and a fact sheet. Static, no JS. */
export default function Hero({ profile, experience, certifications }: HeroProps) {
  const currentRoles = experience.filter((e) => e.current);
  const latestCertification = [...certifications].sort((a, b) => b.date.localeCompare(a.date))[0];

  return (
    <section id="hero" aria-labelledby="hero-title" className="pb-section-sm pt-16 md:pb-section md:pt-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <p className="eyebrow animate-rise">{profile.title}</p>

          <h1 id="hero-title" className="mt-6 font-display text-display text-fg animate-rise [animation-delay:60ms]">
            {getShortName(profile.name)}
          </h1>

          <p className="mt-8 max-w-2xl font-display text-lede text-fg-muted animate-rise [animation-delay:120ms]">
            {profile.yearsOfExperience} años construyendo software: de sistemas empresariales en Oracle a
            billeteras digitales sobre AWS.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row animate-rise [animation-delay:180ms]">
            <a href="#projects" className="btn-primary">
              Ver proyectos
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="/cv.pdf" download className="btn-secondary">
              <Download className="h-4 w-4" aria-hidden="true" />
              Descargar CV
              <span className="font-mono text-caption text-fg-subtle">PDF</span>
            </a>
          </div>
        </div>

        <dl className="self-end border-t border-line text-body-sm lg:col-span-4 animate-rise [animation-delay:240ms]">
          <div className="border-b border-line py-4">
            <dt className="eyebrow">Actualmente</dt>
            {currentRoles.map((role) => (
              <dd key={role.id} className="mt-2 text-fg">
                {role.role}
                <span className="block text-fg-muted">{role.company}</span>
              </dd>
            ))}
          </div>
          <div className="border-b border-line py-4">
            <dt className="eyebrow">Base</dt>
            <dd className="mt-2 text-fg">{profile.location}</dd>
          </div>
          {latestCertification && (
            <div className="border-b border-line py-4">
              <dt className="eyebrow">Certificación</dt>
              <dd className="mt-2 text-fg">{latestCertification.name}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
