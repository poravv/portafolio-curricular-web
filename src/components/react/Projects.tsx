import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../lib/animations';
import {
  ExternalLink,
  Smartphone,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Check,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: number;
  techStack: string[];
  features: string[];
  status: string;
  url?: string | null;
  playStore?: string;
  images?: {
    logo?: string | null;
    icon?: string | null;
    ogImage?: string | null;
    hero?: string | null;
    screenshots?: string[];
  };
  meta?: {
    title?: string;
    description?: string;
  };
  timeline: {
    startDate: string;
    lastUpdate: string;
  };
  highlights: string[];
  architecture: string;
  employer?: string;
  client?: string;
}

interface ProjectsProps {
  projects: Project[];
}

type FilterKey = 'all' | 'production' | 'beta' | 'development';

const ACCENT_COLORS = ['#8B5CF6', '#06B6D4', '#F43F5E', '#22C55E', '#F59E0B', '#8B5CF6', '#06B6D4'] as const;

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'production', label: 'Producción' },
  { key: 'beta', label: 'Beta' },
  { key: 'development', label: 'En Desarrollo' },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  production: {
    label: 'Producción',
    color: 'text-accent-green border-accent-green/30 bg-accent-green/10',
    dot: 'bg-accent-green',
  },
  development: {
    label: 'Desarrollo',
    color: 'text-accent-amber border-accent-amber/30 bg-accent-amber/10',
    dot: 'bg-accent-amber',
  },
  active: {
    label: 'Activo',
    color: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
    dot: 'bg-accent-cyan',
  },
  beta: {
    label: 'Beta',
    color: 'text-secondary border-secondary/30 bg-secondary/10',
    dot: 'bg-secondary',
  },
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const MAX_VISIBLE_TECH = 5;

export default function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.status === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="section-padding" aria-label="Proyectos">
      <div className="mx-auto max-w-container container-padding">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4" aria-hidden="true">
          <span className="section-number">04</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-10"
        >
          <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
            Proyectos
          </h2>
          <p className="mt-4 text-body-lg text-slate-600 dark:text-text-secondary max-w-2xl mx-auto">
            Una selección de los proyectos que he diseñado, desarrollado y puesto en producción.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filtrar proyectos"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`
                px-5 py-2 rounded-full font-mono text-body-sm font-medium
                border transition-all duration-300
                ${
                  activeFilter === f.key
                    ? 'bg-primary text-white border-primary shadow-glow-sm'
                    : 'bg-slate-100 dark:bg-surface text-slate-600 dark:text-text-secondary border-slate-200 dark:border-border hover:border-primary/30 hover:text-slate-900 dark:hover:text-text-primary'
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} accentColor={ACCENT_COLORS[index % ACCENT_COLORS.length]} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, accentColor }: { project: Project; accentColor: string }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[project.status] ?? statusConfig.active;
  const imageUrl =
    project.images?.logo || project.images?.ogImage || project.images?.hero || null;
  const extraTechCount = Math.max(0, project.techStack.length - MAX_VISIBLE_TECH);
  const visibleTech = project.techStack.slice(0, MAX_VISIBLE_TECH);
  const isTier1 = project.tier === 1;

  return (
    <motion.article
      layout
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`
        glass-card card-accented group relative flex flex-col overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-md
        ${isTier1 ? 'lg:col-span-1' : ''}
      `}
      style={{ '--card-accent': accentColor, transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' } as React.CSSProperties}
    >
      {/* Image / Placeholder area */}
      <div className="relative h-44 md:h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${project.name} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500
              group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center
              bg-gradient-to-br from-slate-100 dark:from-bg-elevated via-slate-50 dark:via-bg-base to-primary/10"
            aria-hidden="true"
          >
            <span className="text-display-mobile font-heading text-primary/20 select-none">
              {getInitials(project.name)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-bg-base/90 via-white/20 dark:via-bg-base/20 to-transparent"
          aria-hidden="true"
        />

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`
              inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
              font-mono text-caption border backdrop-blur-sm
              ${status.color}
            `}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot} animate-glow-pulse`} />
            {status.label}
          </span>
        </div>

        {/* Employer / Client badge */}
        {(project.employer || project.client) && (
          <div className="absolute top-3 left-3">
            <span
              className="inline-block px-2.5 py-1 rounded-full font-mono text-caption
                text-accent-cyan border border-accent-cyan/30 bg-accent-cyan/10
                backdrop-blur-sm"
            >
              {project.employer ?? project.client}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {/* Name + Architecture */}
        <div>
          <h3 className="text-h3 font-heading text-slate-900 dark:text-text-primary leading-tight group-hover:text-primary-light transition-colors duration-300">
            {project.name}
          </h3>
          <span className="mt-1 inline-block font-mono text-caption text-slate-500 dark:text-text-muted bg-slate-100 dark:bg-surface border border-slate-200 dark:border-border rounded-md px-2 py-0.5">
            {project.architecture}
          </span>
        </div>

        {/* Description */}
        <p className="text-body-sm text-slate-600 dark:text-text-secondary line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="font-mono text-caption text-slate-600 dark:text-text-secondary bg-slate-100 dark:bg-surface
                border border-slate-200 dark:border-border rounded-md px-2 py-0.5
                hover:text-primary-light hover:border-primary/30
                transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
          {extraTechCount > 0 && (
            <span className="font-mono text-caption text-primary-light bg-primary/10 border border-primary/20 rounded-md px-2 py-0.5">
              +{extraTechCount} más
            </span>
          )}
        </div>

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <div className="mt-auto space-y-1.5 pt-2">
            {project.highlights.slice(0, 2).map((hl, i) => (
              <div key={i} className="flex items-start gap-2">
                <Sparkles
                  size={14}
                  className="mt-0.5 flex-shrink-0 text-primary-light"
                  aria-hidden="true"
                />
                <span className="text-caption text-slate-600 dark:text-text-secondary leading-snug line-clamp-2">
                  {hl}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Features toggle */}
        {project.features.length > 0 && (
          <div className="pt-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-caption font-medium
                text-primary-light hover:text-primary transition-colors duration-200"
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
              {expanded ? 'Ocultar' : 'Ver'} características
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden mt-2 space-y-1"
                >
                  {project.features.map((feat, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <Check size={12} className="mt-0.5 flex-shrink-0 text-accent-green" />
                      <span className="text-caption text-slate-600 dark:text-text-secondary">
                        {feat}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Action buttons */}
        {(project.url || project.playStore) && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200 dark:border-border mt-auto">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                  font-mono text-body-sm font-medium
                  bg-primary/10 text-primary-light border border-primary/20
                  hover:bg-primary/20 hover:border-primary/40
                  transition-all duration-200 group/link"
                aria-label={`Ver sitio de ${project.name}`}
              >
                <ExternalLink size={14} aria-hidden="true" />
                Ver sitio
                <ChevronRight
                  size={14}
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
            {project.playStore && (
              <a
                href={project.playStore.startsWith('http') ? project.playStore : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                  font-mono text-body-sm font-medium
                  bg-accent-green/10 text-accent-green border border-accent-green/20
                  hover:bg-accent-green/20 hover:border-accent-green/40
                  transition-all duration-200"
                aria-label={`Ver ${project.name} en Google Play`}
              >
                <Smartphone size={14} aria-hidden="true" />
                Google Play
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
