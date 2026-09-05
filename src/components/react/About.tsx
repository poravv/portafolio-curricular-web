import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, scaleIn } from '../../lib/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AboutProps {
  profile: any;
  experience: any[];
  projects: any[];
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({ value, suffix, inView, reducedMotion }: { value: number; suffix: string; inView: boolean; reducedMotion: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, value, reducedMotion]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function About({ profile, experience, projects }: AboutProps) {
  const reducedMotion = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    { value: profile.yearsOfExperience, suffix: '', label: 'Años de Experiencia' },
    { value: 15, suffix: '+', label: 'Proyectos' },
    { value: 8, suffix: '+', label: 'Certificaciones' },
    { value: 3, suffix: '', label: 'Empresas' },
  ];

  const viewportConfig = { once: true, amount: 0.2 as const };
  const motionProps = reducedMotion
    ? {}
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportConfig };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-container container-padding relative">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4" aria-hidden="true">
          <span className="section-number">01</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          {...motionProps}
          className="mb-12 md:mb-16"
        >
          <p className="text-label uppercase tracking-widest text-primary-light mb-3">Conóceme</p>
          <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
            Sobre Mí
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Left: Decorative avatar card */}
          <motion.div
            variants={scaleIn}
            {...motionProps}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent-cyan opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500" />
              {/* Glass card with initials */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-3xl glass-card border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }} />
                {/* Initials */}
                <span className="relative text-7xl md:text-8xl font-heading font-bold gradient-text select-none">
                  AV
                </span>
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
              </div>
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="lg:col-span-3 space-y-6"
          >
            <motion.p
              variants={staggerItem}
              className="text-body-lg text-slate-600 dark:text-text-secondary leading-relaxed"
            >
              {profile.summary}
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="text-body text-slate-500 dark:text-text-muted"
            >
              Actualmente como <span className="text-primary-light font-medium">{profile.title}</span> en{' '}
              <span className="text-slate-800 dark:text-text-primary font-medium">{profile.company}</span>, y fundador de{' '}
              <span className="text-slate-800 dark:text-text-primary font-medium">{profile.ownCompany}</span>.
            </motion.p>

            <motion.div variants={staggerItem} className="flex items-center gap-2 text-body-sm text-slate-500 dark:text-text-muted">
              <svg className="w-4 h-4 text-primary-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{profile.location}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          {...motionProps}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="glass-card p-5 md:p-6 text-center group hover:border-primary/30 hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300"
            >
              <div className="text-h1-mobile md:text-h1 font-heading font-bold gradient-text">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={statsInView}
                  reducedMotion={reducedMotion}
                />
              </div>
              <p className="mt-1 text-caption text-slate-500 dark:text-text-muted uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
