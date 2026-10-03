import type { Skills as SkillsData } from '@/lib/portfolio';
import Section from './ui/Section';
import TagList from './ui/TagList';

interface SkillsProps {
  skills: SkillsData;
}

const CATEGORY_LABELS: Record<keyof SkillsData, string> = {
  languages: 'Lenguajes',
  backendFrameworks: 'Backend',
  frontendFrameworks: 'Frontend',
  mobile: 'Mobile',
  databases: 'Bases de datos',
  infrastructure: 'Infraestructura',
  cloud: 'Cloud',
  architecture: 'Arquitectura',
  tools: 'Herramientas',
  aiMl: 'Visión e IA',
  ai: 'Flujo con IA',
  payments: 'Pagos',
  other: 'Otros',
};

/** Technology inventory as a two-column definition list (category → tags). */
export default function Skills({ skills }: SkillsProps) {
  const categories = Object.keys(CATEGORY_LABELS) as (keyof SkillsData)[];

  return (
    <Section id="skills" index="03" title="Stack técnico" intro="Tecnologías que uso en trabajo y proyectos propios.">
      <dl className="border-t border-line">
        {categories.map((key) => (
          <div key={key} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="eyebrow pt-1">{CATEGORY_LABELS[key]}</dt>
            <dd>
              <TagList items={skills[key]} label={CATEGORY_LABELS[key]} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
