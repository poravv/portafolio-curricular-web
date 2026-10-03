import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  /** Two-digit section number shown in the rail, e.g. "02". */
  index: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Page section with an editorial left rail (number, title, intro) and a content column. */
export default function Section({ id, index, title, intro, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className="border-t border-line py-section-sm md:py-section">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-label text-accent">{index}</p>
            <h2 id={titleId} className="mt-3 font-display text-h2 text-fg text-balance">
              {title}
            </h2>
            {intro && <p className="mt-4 max-w-sm text-body text-fg-muted">{intro}</p>}
          </div>
        </header>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
