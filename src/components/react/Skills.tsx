import { motion } from 'framer-motion';
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

const categoryMeta: Record<string, { label: string; icon: LucideIcon }> = {
  languages: { label: 'Lenguajes', icon: Code2 },
  backendFrameworks: { label: 'Backend', icon: Server },
  frontendFrameworks: { label: 'Frontend', icon: Layout },
  mobile: { label: 'Mobile', icon: Smartphone },
  databases: { label: 'Bases de Datos', icon: Database },
  infrastructure: { label: 'Infraestructura', icon: Container },
  cloud: { label: 'Cloud & AWS', icon: Cloud },
  aiMl: { label: 'IA & Machine Learning', icon: Brain },
  ai: { label: 'IA & Herramientas', icon: Bot },
  payments: { label: 'Pagos', icon: CreditCard },
  architecture: { label: 'Arquitectura', icon: Building2 },
  tools: { label: 'Herramientas', icon: Wrench },
  other: { label: 'Otros', icon: Puzzle },
};

export default function Skills({ skills }: SkillsProps) {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="section-padding" aria-label="Habilidades Técnicas">
      <div className="mx-auto max-w-container container-padding">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
            Habilidades Técnicas
          </h2>
          <p className="mt-4 text-body-lg text-slate-600 dark:text-text-secondary max-w-2xl mx-auto">
            Tecnologías y herramientas con las que trabajo a diario para construir soluciones escalables.
          </p>
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
          {categories.map(([key, techs]) => {
            const meta = categoryMeta[key] ?? { label: key, icon: Puzzle };
            const Icon = meta.icon;

            return (
              <motion.div
                key={key}
                variants={staggerItem}
                role="listitem"
                className="glass-card group relative p-5 md:p-6 flex flex-col gap-4
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-md"
              >
                {/* Glow background on hover */}
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
                    className="font-mono text-caption text-slate-500 dark:text-text-muted
                      bg-slate-100 dark:bg-surface px-2 py-0.5 rounded-full border border-slate-200 dark:border-border"
                  >
                    {techs.length} techs
                  </span>
                </div>

                {/* Category name */}
                <h3 className="relative text-h4 font-heading text-slate-900 dark:text-text-primary leading-tight">
                  {meta.label}
                </h3>

                {/* Tech badges */}
                <div className="relative flex flex-wrap gap-1.5 mt-auto">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block font-mono text-caption text-slate-600 dark:text-text-secondary
                        bg-slate-100 dark:bg-surface border border-slate-200 dark:border-border rounded-md px-2 py-0.5
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
        </motion.div>
      </div>
    </section>
  );
}
