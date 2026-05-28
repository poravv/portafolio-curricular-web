import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Award } from 'lucide-react';

interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  logo?: string;
}

interface CertificationsProps {
  certifications: CertificationEntry[];
}

function formatCertDate(dateStr: string): string {
  // Handle "YYYY-MM" format
  if (dateStr.includes('-')) {
    const date = new Date(dateStr + '-01T00:00:00');
    return date.toLocaleDateString('es-PY', { month: 'long', year: 'numeric' });
  }
  // Handle "YYYY" format
  return dateStr;
}

function sortByDateDesc(certs: CertificationEntry[]): CertificationEntry[] {
  return [...certs].sort((a, b) => {
    const dateA = a.date.includes('-') ? new Date(a.date + '-01') : new Date(a.date + '-01-01');
    const dateB = b.date.includes('-') ? new Date(b.date + '-01') : new Date(b.date + '-01-01');
    return dateB.getTime() - dateA.getTime();
  });
}

function CertLogo({ logo, issuer }: { logo?: string; issuer: string }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return <Award className="w-6 h-6 text-primary-light" aria-hidden="true" />;
  }

  return (
    <img
      src={logo}
      alt={`${issuer} logo`}
      className="w-10 h-10 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function Certifications({ certifications }: CertificationsProps) {
  const reducedMotion = useReducedMotion();

  const viewportConfig = { once: true, amount: 0.2 as const };
  const motionProps = reducedMotion
    ? {}
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportConfig };

  const sorted = sortByDateDesc(certifications);

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-amber/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-container container-padding relative">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4" aria-hidden="true">
          <span className="section-number">06</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section heading */}
        <motion.div variants={fadeUp} {...motionProps} className="mb-12 md:mb-16">
          <p className="text-label uppercase tracking-widest text-primary-light mb-3">
            Certificaciones
          </p>
          <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
            Cursos y Certificaciones
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          {...motionProps}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {sorted.map((cert) => (
            <motion.div
              key={cert.id}
              variants={staggerItem}
              className="glass-card p-5 md:p-6 group hover:border-primary/30 hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300 flex flex-col"
            >
              {/* Logo or icon */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                  <CertLogo logo={cert.logo} issuer={cert.issuer} />
                </div>

                {/* Date badge */}
                <span className="ml-auto inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold bg-primary/10 text-primary-light border border-primary/20">
                  {formatCertDate(cert.date)}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-h3 font-heading text-slate-900 dark:text-text-primary leading-tight mb-2">
                {cert.name}
              </h3>

              {/* Issuer */}
              <div className="mt-auto flex items-center gap-2 text-body-sm text-slate-600 dark:text-text-secondary">
                <Award className="w-4 h-4 text-primary-light flex-shrink-0" aria-hidden="true" />
                <span>{cert.issuer}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
