import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GraduationCap, BookOpen, School } from 'lucide-react';

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  startYear?: number;
  completedYear?: number;
  endYear?: null;
  status?: string;
  type: string;
}

interface EducationProps {
  education: EducationEntry[];
}

function getYearLabel(entry: EducationEntry): string {
  if (entry.status === 'cursando') return 'Cursando';
  if (entry.completedYear) return String(entry.completedYear);
  return '';
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'grado':
      return GraduationCap;
    case 'secundario':
      return School;
    default:
      return BookOpen;
  }
}

export default function Education({ education }: EducationProps) {
  const reducedMotion = useReducedMotion();

  const viewportConfig = { once: true, amount: 0.2 as const };
  const motionProps = reducedMotion
    ? {}
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportConfig };

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-container container-padding relative">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4" aria-hidden="true">
          <span className="section-number">05</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section heading */}
        <motion.div variants={fadeUp} {...motionProps} className="mb-12 md:mb-16">
          <p className="text-label uppercase tracking-widest text-primary-light mb-3">
            Formaci&oacute;n
          </p>
          <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
            Educaci&oacute;n
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          {...motionProps}
          className="relative"
        >
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-6 md:space-y-8">
            {education.map((entry) => {
              const Icon = getTypeIcon(entry.type);
              const yearLabel = getYearLabel(entry);
              const isInProgress = entry.status === 'cursando';

              return (
                <motion.div
                  key={entry.id}
                  variants={staggerItem}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-2 md:left-4 top-6 w-4 h-4 rounded-full border-2 border-primary bg-white dark:bg-bg-base flex items-center justify-center z-10"
                    aria-hidden="true"
                  >
                    {isInProgress && (
                      <span className="absolute w-4 h-4 rounded-full bg-accent-green/40 animate-ping" />
                    )}
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isInProgress ? 'bg-accent-green' : 'bg-primary'
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div className="glass-card p-5 md:p-6 group hover:border-primary/30 hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300" style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Year badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-semibold ${
                              isInProgress
                                ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                                : 'bg-primary/10 text-primary-light border border-primary/20'
                            }`}
                          >
                            {isInProgress && (
                              <span
                                className="relative flex h-2 w-2"
                                aria-label="En curso"
                              >
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                              </span>
                            )}
                            {yearLabel}
                          </span>

                          {/* Type badge */}
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-caption text-slate-500 dark:text-text-muted bg-slate-100 dark:bg-surface border border-slate-200 dark:border-border">
                            {entry.type === 'grado' ? 'Grado' : 'Secundario'}
                          </span>
                        </div>

                        {/* Degree */}
                        <h3 className="text-h3 font-heading text-slate-900 dark:text-text-primary leading-tight">
                          {entry.degree}
                        </h3>

                        {/* Institution */}
                        <div className="mt-2 flex items-center gap-2 text-body-sm text-slate-600 dark:text-text-secondary">
                          <Icon className="w-4 h-4 text-primary-light flex-shrink-0" aria-hidden="true" />
                          <span>{entry.institution}</span>
                        </div>

                        {/* Start year for in-progress */}
                        {isInProgress && entry.startYear && (
                          <p className="mt-1.5 text-caption text-slate-500 dark:text-text-muted">
                            Desde {entry.startYear}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
