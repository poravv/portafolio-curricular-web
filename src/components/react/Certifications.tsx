import type { Certification } from '@/lib/portfolio';
import Section from './ui/Section';

interface CertificationsProps {
  certifications: Certification[];
}

function formatDate(date: string): string {
  if (!date.includes('-')) return date;
  return new Date(`${date}-01T00:00:00`).toLocaleDateString('es-PY', { month: 'short', year: 'numeric' });
}

/** Certifications (entries with an issuer badge) featured first, then courses as a compact list. */
export default function Certifications({ certifications }: CertificationsProps) {
  const sorted = [...certifications].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted.filter((c) => 'logo' in c);
  const courses = sorted.filter((c) => !('logo' in c));

  return (
    <Section id="certifications" index="06" title="Certificación y cursos">
      <ul className="space-y-4" role="list">
        {featured.map((cert) => (
          <li key={cert.id} className="flex items-center gap-5 border border-line bg-surface p-5">
            {'logo' in cert && (
              <img src={cert.logo} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 flex-none object-contain" />
            )}
            <div>
              <h3 className="font-display text-h3 text-fg">{cert.name}</h3>
              <p className="mt-1 text-body-sm text-fg-muted">
                {cert.issuer} · <span className="font-mono text-caption">{formatDate(cert.date)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <ul className="mt-8 border-t border-line" role="list">
        {courses.map((course) => (
          <li key={course.id} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <p className="font-mono text-caption text-fg-subtle sm:pt-0.5">{formatDate(course.date)}</p>
            <p className="text-body-sm text-fg">
              {course.name}
              <span className="text-fg-muted"> — {course.issuer}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
