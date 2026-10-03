import type { Education as EducationEntry } from '@/lib/portfolio';
import Section from './ui/Section';

interface EducationProps {
  education: EducationEntry[];
}

function yearLabel(entry: EducationEntry): string {
  if ('status' in entry && entry.status === 'cursando') return `${entry.startYear} — en curso`;
  return 'completedYear' in entry ? String(entry.completedYear) : '';
}

/** Degrees as a ruled list: year on the left, degree and institution on the right. */
export default function Education({ education }: EducationProps) {
  return (
    <Section id="education" index="05" title="Formación">
      <ol className="border-t border-line">
        {education.map((entry) => (
          <li key={entry.id} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <p className="font-mono text-caption text-fg-subtle sm:pt-1.5">{yearLabel(entry)}</p>
            <div>
              <h3 className="font-display text-h3 text-fg">{entry.degree}</h3>
              <p className="mt-1 text-body-sm text-fg-muted">{entry.institution}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
