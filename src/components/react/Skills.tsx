import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../lib/animations';
import {
  Code2,
  Server,
  Layout,
  Smartphone,
  Database,
  Container,
  Cloud,
  Brain,
  Bot,
  CreditCard,
  Building2,
  Wrench,
  Puzzle,
  type LucideIcon,
} from 'lucide-react';

interface SkillsProps {
  skills: Record<string, string[]>;
}

const categoryMeta: Record<string, { label: string; icon: LucideIcon; filterGroup: string }> = {
  languages:           { label: 'Lenguajes',            icon: Code2,      filterGroup: 'Frontend' },
  backendFrameworks:   { label: 'Backend',               icon: Server,     filterGroup: 'Backend' },
  frontendFrameworks:  { label: 'Frontend',              icon: Layout,     filterGroup: 'Frontend' },
  mobile:              { label: 'Mobile',                icon: Smartphone, filterGroup: 'Mobile' },
  databases:           { label: 'Bases de Datos',        icon: Database,   filterGroup: 'Database' },
  infrastructure:      { label: 'Infraestructura',       icon: Container,  filterGroup: 'Cloud & DevOps' },
  cloud:               { label: 'Cloud & AWS',           icon: Cloud,      filterGroup: 'Cloud & DevOps' },
  aiMl:                { label: 'IA & Machine Learning', icon: Brain,      filterGroup: 'Tools' },
  ai:                  { label: 'IA & Herramientas',     icon: Bot,        filterGroup: 'Tools' },
  payments:            { label: 'Pagos',                 icon: CreditCard, filterGroup: 'Tools' },
  architecture:        { label: 'Arquitectura',          icon: Building2,  filterGroup: 'Backend' },
  tools:               { label: 'Herramientas',          icon: Wrench,     filterGroup: 'Tools' },
  other:               { label: 'Otros',                 icon: Puzzle,     filterGroup: 'Tools' },
};

const FILTER_OPTIONS = ['Todos', 'Frontend', 'Backend', 'Mobile', 'Database', 'Cloud & DevOps', 'Tools'] as const;
type FilterOption = typeof FILTER_OPTIONS[number];

export default function Skills({ skills }: SkillsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Todos');

  const categories = useMemo(() => {
    const all = Object.entries(skills);
    if (activeFilter === 'Todos') return all;
    return all.filter(([key]) => {
      const meta = categoryMeta[key];
      return meta?.filterGroup === activeFilter;
    });
  }, [skills, activeFilter]);

  return (
    <section id="skills" className="section-padding" aria-label="Habilidades Técnicas">
      <div className="mx-auto max-w-container container-padding">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4" aria-hidden="true">
          <span className="section-number">03</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-10"
        >
          <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
            Habilidades Técnicas
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary max-w-2xl">
            Tecnologías y herramientas con las que trabajo a diario para construir soluciones escalables.
          </p>
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtrar por categoría"
        >
          {FILTER_OPTIONS.map(option => (
            <button
              key={option}
              role="tab"
              aria-selected={activeFilter === option}
              onClick={() => setActiveFilter(option)}
              className={`
                px-4 py-1.5 rounded-full font-mono text-xs font-medium
                border transition-all duration-300
                ${
                  activeFilter === option
                    ? 'bg-primary text-white border-primary shadow-glow-sm'
                    : 'bg-surface text-text-secondary border-border hover:border-primary/30 hover:text-text-primary'
                }
              `}
              style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
            >
              {option}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          role="list"
          aria-label="Categorías de habilidades"
        >
          <AnimatePresence mode="popLayout">
            {categories.map(([key, techs]) => {
              const meta = categoryMeta[key] ?? { label: key, icon: Puzzle, filterGroup: 'Tools' };
              const Icon = meta.icon;

              return (
                <motion.div
                  key={key}
                  layout
                  variants={staggerItem}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  role="listitem"
                  className="glass-card group relative p-5 md:p-6 flex flex-col gap-4
                    transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-sm"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
                >
                  {/* Hover glow overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                      group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
                    aria-hidden="true"
                  />

                  {/* Icon + Count row */}
                  <div className="relative flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl
                        bg-primary/10 text-primary-light
                        group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <span
                      className="font-mono text-caption text-text-muted
                        bg-surface px-2 py-0.5 rounded-full border border-border"
                    >
                      {techs.length} techs
                    </span>
                  </div>

                  {/* Category name */}
                  <h3 className="relative text-h4 font-heading text-text-primary leading-tight">
                    {meta.label}
                  </h3>

                  {/* Tech badges */}
                  <div className="relative flex flex-wrap gap-1.5 mt-auto">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block font-mono text-caption text-text-secondary
                          bg-surface border border-border rounded-md px-2 py-0.5
                          hover:text-primary-light hover:border-primary/30
                          transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
