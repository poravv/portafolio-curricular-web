import { ArrowUpRight } from 'lucide-react';
import type { Experience as ExperienceEntry, Project } from '@/lib/portfolio';
import Section from './ui/Section';
import TagList from './ui/TagList';

interface ExperienceProps {
  experience: ExperienceEntry[];
  projects: Project[];
}

function formatMonth(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('es-PY', { month: 'short', year: 'numeric' });
}

function formatDuration(start: string, end: string | null): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearsText = years > 0 ? `${years} ${years === 1 ? 'año' : 'años'}` : '';
  const monthsText = rest > 0 ? `${rest} ${rest === 1 ? 'mes' : 'meses'}` : '';
  return [yearsText, monthsText].filter(Boolean).join(' ');
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h4 className="eyebrow">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-body-sm text-fg-muted">
            <span className="mt-[0.6em] h-px w-3 flex-none bg-line-strong" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Work history as a ruled, reverse-chronological list. */
export default function Experience({ experience, projects }: ExperienceProps) {
  const projectUrlByName = new Map(projects.filter((p) => p.url).map((p) => [p.name, p.url as string]));

  return (
    <Section id="experience" index="02" title="Experiencia">
      <ol className="border-t border-line">
        {experience.map((exp) => {
          const end = exp.current ? 'Presente' : exp.endDate ? formatMonth(exp.endDate) : 'Presente';
          return (
            <li key={exp.id} className="border-b border-line py-10 first:pt-8">
              <article>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-caption text-fg-subtle">
                  <time dateTime={exp.startDate}>{formatMonth(exp.startDate)}</time>
                  <span aria-hidden="true">—</span>
                  <span>{end}</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatDuration(exp.startDate, exp.endDate)}</span>
                  {exp.current && (
                    <span className="rounded-sm border border-live/40 px-1.5 text-live">Actual</span>
                  )}
                </p>

                <h3 className="mt-3 font-display text-h3 text-fg">{exp.company}</h3>
                <p className="mt-1 text-body text-fg">
                  {exp.role}
                  <span className="text-fg-subtle"> · {exp.location}</span>
                </p>

                <p className="mt-4 max-w-2xl text-body text-fg-muted">{exp.description}</p>

                {exp.responsibilities && <ListBlock title="Responsabilidades" items={exp.responsibilities} />}
                {exp.achievements && <ListBlock title="Trabajo destacado" items={exp.achievements} />}
                {exp.services && <ListBlock title="Servicios" items={exp.services} />}

                {exp.clients && (
                  <div className="mt-6">
                    <h4 className="eyebrow">Clientes</h4>
                    <ul className="mt-3 space-y-2">
                      {exp.clients.map((client) => {
                        const url = projectUrlByName.get(client.name);
                        return (
                          <li key={client.name} className="text-body-sm text-fg-muted">
                            {url ? (
                              <a href={url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 font-medium">
                                {client.name}
                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                <span className="sr-only">(abre en una pestaña nueva)</span>
                              </a>
                            ) : (
                              <span className="font-medium text-fg">{client.name}</span>
                            )}
                            {' — '}
                            {client.project}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {exp.techStack && (
                  <div className="mt-6">
                    <TagList items={exp.techStack} label={`Tecnologías en ${exp.company}`} />
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
