import { motion } from 'framer-motion';
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerItem, scaleIn } from '../../lib/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ExperienceProps {
  experience: Array<{
    id: string;
    company: string;
    role: string;
    location: string;
    current: boolean;
    startDate: string;
    endDate: string | null;
    description: string;
    techStack?: string[];
    achievements?: string[];
    responsibilities?: string[];
    products?: string[];
    services?: string[];
    clients?: any[];
    notableProjects?: string[];
  }>;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-PY', { month: 'short', year: 'numeric' });
}

function formatDateRange(start: string, end: string | null, current: boolean): string {
  const startFormatted = formatDate(start);
  const endFormatted = current ? 'Presente' : end ? formatDate(end) : 'Presente';
  return `${startFormatted} — ${endFormatted}`;
}

function calculateDuration(start: string, end: string | null): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} meses`;
  if (remainingMonths === 0) return `${years} ${years === 1 ? 'año' : 'años'}`;
  return `${years} ${years === 1 ? 'año' : 'años'}, ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
}

export default function Experience({ experience }: ExperienceProps) {
  const reducedMotion = useReducedMotion();

  const viewportConfig = { once: true, amount: 0.2 as const };
  const motionProps = reducedMotion
    ? {}
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportConfig };

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />

      <div className="mx-auto max-w-container container-padding relative">
        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          {...motionProps}
          className="mb-12 md:mb-16"
        >
          <p className="text-label uppercase tracking-widest text-primary-light mb-3">Trayectoria</p>
          <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
            Experiencia Profesional
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line — mobile: left, desktop: center */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-px w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {experience.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const slideVariant = isLeft ? slideInLeft : slideInRight;

              return (
                <div
                  key={exp.id}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <motion.div
                    variants={scaleIn}
                    {...motionProps}
                    className={`
                      absolute top-8 left-4 md:left-1/2 -translate-x-1/2 z-10
                      w-4 h-4 rounded-full bg-primary border-[3px] border-white dark:border-bg-base
                      shadow-[0_0_12px_rgba(139,92,246,0.5)]
                    `}
                  >
                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" style={{ animationDuration: '3s' }} />
                  </motion.div>

                  {/* Card container */}
                  <motion.div
                    variants={reducedMotion ? fadeUp : slideVariant}
                    {...motionProps}
                    className={`
                      relative pl-12
                      md:w-[calc(50%-2rem)]
                      ${isLeft ? 'md:pl-0 md:pr-8 md:ml-0' : 'md:pl-8 md:pr-0 md:ml-auto'}
                    `}
                  >
                    {/* Card */}
                    <article className="glass-card p-6 md:p-8 group hover:border-primary/30 transition-colors duration-300 relative">
                      {/* Connector to timeline dot — desktop only */}
                      <div
                        className={`
                          hidden md:block absolute top-9 w-8 h-[2px] bg-primary/20
                          ${isLeft ? '-right-8' : '-left-8'}
                        `}
                      />

                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-h3 font-heading gradient-text">
                            {exp.company}
                          </h3>
                          <p className="text-body font-medium text-slate-800 dark:text-text-primary mt-1">
                            {exp.role}
                          </p>
                        </div>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-semibold bg-accent-green/10 text-accent-green border border-accent-green/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                            Actual
                          </span>
                        )}
                      </div>

                      {/* Date & location */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
                        <time className="text-label uppercase text-primary-light tracking-wider">
                          {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        </time>
                        <span className="text-caption text-slate-500 dark:text-text-muted">
                          {calculateDuration(exp.startDate, exp.endDate)}
                        </span>
                        <span className="flex items-center gap-1 text-caption text-slate-500 dark:text-text-muted">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-body-sm text-slate-600 dark:text-text-secondary leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      {/* Responsibilities */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <motion.div variants={staggerContainer} {...motionProps} className="mb-5">
                          <h4 className="text-caption uppercase tracking-wider text-slate-500 dark:text-text-muted mb-2">Responsabilidades</h4>
                          <ul className="space-y-1.5">
                            {exp.responsibilities.map((item, i) => (
                              <motion.li
                                key={i}
                                variants={staggerItem}
                                className="flex items-start gap-2 text-body-sm text-slate-600 dark:text-text-secondary"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Achievements */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <motion.div variants={staggerContainer} {...motionProps} className="mb-5">
                          <h4 className="text-caption uppercase tracking-wider text-slate-500 dark:text-text-muted mb-2">Logros Destacados</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((item, i) => (
                              <motion.li
                                key={i}
                                variants={staggerItem}
                                className="flex items-start gap-2 text-body-sm"
                              >
                                <svg className="w-4 h-4 mt-0.5 text-accent-amber flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-slate-800 dark:text-text-primary">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Products & Services */}
                      {exp.products && exp.products.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-caption uppercase tracking-wider text-slate-500 dark:text-text-muted mb-2">Productos</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.products.map((product, i) => (
                              <span key={i} className="px-3 py-1 text-caption rounded-full bg-primary/10 text-primary-light border border-primary/20">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {exp.services && exp.services.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-caption uppercase tracking-wider text-slate-500 dark:text-text-muted mb-2">Servicios</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.services.map((service, i) => (
                              <span key={i} className="px-3 py-1 text-caption rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notable Projects */}
                      {exp.notableProjects && exp.notableProjects.length > 0 && (
                        <motion.div variants={staggerContainer} {...motionProps} className="mb-5">
                          <h4 className="text-caption uppercase tracking-wider text-slate-500 dark:text-text-muted mb-2">Proyectos Destacados</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.notableProjects.map((project, i) => (
                              <motion.span
                                key={i}
                                variants={staggerItem}
                                className="px-3 py-1.5 text-[0.75rem] rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 text-slate-800 dark:text-text-primary border border-slate-200 dark:border-primary/20 hover:border-primary/40 transition-colors duration-200"
                              >
                                {project}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Clients */}
                      {exp.clients && exp.clients.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-caption uppercase tracking-wider text-slate-500 dark:text-text-muted mb-2">Clientes</h4>
                          <div className="space-y-1.5">
                            {exp.clients.map((client: any, i: number) => (
                              <p key={i} className="text-body-sm text-slate-600 dark:text-text-secondary">
                                <span className="text-slate-800 dark:text-text-primary font-medium">{client.name}</span>
                                {' — '}
                                <span className="text-slate-500 dark:text-text-muted">{client.project}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {exp.techStack && exp.techStack.length > 0 && (
                        <motion.div variants={staggerContainer} {...motionProps}>
                          <h4 className="text-caption uppercase tracking-wider text-slate-500 dark:text-text-muted mb-2">Stack Tecnol&oacute;gico</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.techStack.map((tech, i) => (
                              <motion.span
                                key={i}
                                variants={staggerItem}
                                className="px-2 py-0.5 text-[0.6875rem] font-mono rounded bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface-hover text-slate-500 dark:text-text-muted hover:text-slate-700 dark:hover:text-text-secondary border border-slate-200 dark:border-border transition-colors duration-200"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </article>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Timeline end dot */}
          <div className="absolute -bottom-2 left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/30 border-2 border-white dark:border-bg-base" />
        </div>
      </div>
    </section>
  );
}
