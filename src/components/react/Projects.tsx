import { ArrowUpRight, ChevronDown, FlaskConical, Smartphone } from 'lucide-react';
import { getProjectRelation, type Project } from '@/lib/portfolio';
import Section from './ui/Section';
import TagList from './ui/TagList';

interface ProjectsProps {
  projects: Project[];
}

const MAX_TAGS = 5;

function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}

function playStoreUrl(project: Project): string | null {
  return 'playStore' in project && project.playStore ? project.playStore : null;
}

function StatusLabel({ status }: { status: string }) {
  if (status === 'development') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-line-strong px-2 py-0.5 font-mono text-caption text-fg-muted">
        <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
        En desarrollo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-caption text-live">
      <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
      En producción
    </span>
  );
}

function ProjectLogo({ project }: { project: Project }) {
  const logo = project.images.logo;
  return (
    <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-sm border border-line bg-logo-tile">
      {logo ? (
        <img src={logo} alt="" width={56} height={56} loading="lazy" decoding="async" className="h-full w-full object-contain p-1.5" />
      ) : (
        <span className="font-display text-h3 text-fg-subtle" aria-hidden="true">
          {project.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

/** Primary live link ("Ver sitio") and Play Store link; rendered only when they exist. */
function ProjectLinks({ project, size }: { project: Project; size: 'lg' | 'sm' }) {
  const playStore = playStoreUrl(project);
  if (!project.url && !playStore) return null;

  const newTab = <span className="sr-only"> (abre en una pestaña nueva)</span>;
  const primaryClass = size === 'lg' ? 'btn-primary' : 'link inline-flex items-center gap-1 text-body-sm font-medium';
  const secondaryClass = size === 'lg' ? 'btn-secondary' : 'link inline-flex items-center gap-1 text-body-sm font-medium';

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className={primaryClass}>
          Ver sitio
          {size === 'lg' && <span className="font-mono text-caption opacity-70">{hostname(project.url)}</span>}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">: {project.name}</span>
          {newTab}
        </a>
      )}
      {playStore && (
        <a href={playStore} target="_blank" rel="noopener noreferrer" className={secondaryClass}>
          <Smartphone className="h-4 w-4" aria-hidden="true" />
          Google Play
          <span className="sr-only">: {project.name}</span>
          {newTab}
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const relation = getProjectRelation(project);
  return (
    <li className="flex">
      <article className="flex w-full flex-col border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <ProjectLogo project={project} />
          <StatusLabel status={project.status} />
        </div>

        <p className={`mt-6 font-mono text-caption ${relation.kind === 'client' ? 'text-accent' : 'text-fg-subtle'}`}>
          {relation.label}
        </p>
        <h4 className="mt-1 font-display text-h3 text-fg">{project.name}</h4>
        <p className="mt-3 text-body-sm text-fg-muted">{project.description}</p>

        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-body-sm text-fg">
              <span className="mt-[0.6em] h-px w-3 flex-none bg-accent" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <TagList items={project.techStack} label={`Tecnologías de ${project.name}`} limit={MAX_TAGS} />
        </div>

        <details className="group mt-4">
          <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 text-body-sm text-fg-muted transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
            Características
          </summary>
          <ul className="space-y-1 pb-2 pl-6 text-body-sm text-fg-muted">
            {project.features.map((feature) => (
              <li key={feature} className="list-disc marker:text-fg-subtle">
                {feature}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-auto pt-5">
          <ProjectLinks project={project} size="lg" />
        </div>
      </article>
    </li>
  );
}

function OtherProject({ project }: { project: Project }) {
  const relation = getProjectRelation(project);
  return (
    <li className="border-b border-line py-8">
      <article>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h4 className="font-display text-h3 text-fg">{project.name}</h4>
          <StatusLabel status={project.status} />
        </div>
        <p className="mt-1 font-mono text-caption text-fg-subtle">
          {relation.label} · {project.architecture}
        </p>
        <p className="mt-3 max-w-2xl text-body-sm text-fg-muted">{project.description}</p>
        <div className="mt-4">
          <TagList items={project.techStack} label={`Tecnologías de ${project.name}`} limit={MAX_TAGS + 1} />
        </div>
        <div className="mt-4">
          <ProjectLinks project={project} size="sm" />
        </div>
      </article>
    </li>
  );
}

/** Tier 1 (live, in production) as cards; tier 2 (other / experimental) as a compact list. */
export default function Projects({ projects }: ProjectsProps) {
  const featured = projects.filter((p) => p.tier === 1);
  const others = projects.filter((p) => p.tier !== 1);

  return (
    <Section
      id="projects"
      index="04"
      title="Proyectos"
      intro="Primero lo que está en producción: trabajo para clientes, en relación de dependencia y productos propios. Después, otros proyectos y experimentos."
    >
      <h3 className="eyebrow">En producción · {featured.length}</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2" role="list">
        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}
      </ul>

      {others.length > 0 && (
        <>
          <h3 className="eyebrow mt-16">Otros proyectos y experimentos · {others.length}</h3>
          <ul className="mt-2 border-t border-line" role="list">
            {others.map((project) => (
              <OtherProject key={project.id} project={project} />
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
