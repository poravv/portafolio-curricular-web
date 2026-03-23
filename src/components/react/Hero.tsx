import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroProps {
  profile: {
    name: string;
    title: string;
    company: string;
    ownCompany: string;
    summary: string;
    yearsOfExperience: number;
    contact: Record<string, string>;
  };
}

const ROLES = ['Technical Lead', 'Full-Stack Developer', 'Founder de MindTechPy'];
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_BEFORE_DELETE = 2400;
const PAUSE_BEFORE_TYPE = 400;

function useTypewriter(words: string[], reducedMotion: boolean) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'paused' | 'deleting' | 'waiting'>('typing');

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(words[currentWordIndex]);
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 3000);
      return () => clearInterval(interval);
    }

    const currentWord = words[currentWordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case 'typing':
        if (displayText.length < currentWord.length) {
          timeout = setTimeout(() => {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          }, TYPING_SPEED);
        } else {
          timeout = setTimeout(() => setPhase('paused'), 0);
        }
        break;
      case 'paused':
        timeout = setTimeout(() => setPhase('deleting'), PAUSE_BEFORE_DELETE);
        break;
      case 'deleting':
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, DELETING_SPEED);
        } else {
          timeout = setTimeout(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            setPhase('waiting');
          }, 0);
        }
        break;
      case 'waiting':
        timeout = setTimeout(() => setPhase('typing'), PAUSE_BEFORE_TYPE);
        break;
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, currentWordIndex, words, reducedMotion]);

  // Update displayText when reducedMotion changes word index
  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(words[currentWordIndex]);
    }
  }, [currentWordIndex, reducedMotion, words]);

  return displayText;
}

function useCountUp(target: number, duration: number, reducedMotion: boolean) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(() => setHasStarted(true), []);

  useEffect(() => {
    if (!hasStarted) return;
    if (reducedMotion) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [hasStarted, target, duration, reducedMotion]);

  return { count, start };
}

function StatItem({
  value,
  suffix,
  label,
  duration,
  reducedMotion,
}: {
  value: number;
  suffix: string;
  label: string;
  duration: number;
  reducedMotion: boolean;
}) {
  const { count, start } = useCountUp(value, duration, reducedMotion);

  return (
    <motion.div
      variants={staggerItem}
      onViewportEnter={start}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-1 px-6"
    >
      <span className="text-h2-mobile md:text-h2 font-heading gradient-text">
        {count}
        {suffix}
      </span>
      <span className="text-caption text-slate-500 dark:text-text-muted uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}

export default function Hero({ profile }: HeroProps) {
  const reducedMotion = useReducedMotion();
  const displayText = useTypewriter(ROLES, reducedMotion);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const animationProps = reducedMotion
    ? {}
    : {
        initial: 'hidden' as const,
        animate: 'visible' as const,
      };

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      {/* ── Background gradient layer ── */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-bg-base" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(99,102,241,0.04),transparent_60%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(99,102,241,0.08),transparent_60%)]" />
      </div>

      {/* ── Floating glow orbs ── */}
      <div
        aria-hidden="true"
        className="absolute top-[15%] left-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary/[0.04] dark:bg-primary/[0.07] blur-[100px] animate-float will-change-transform"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-accent-cyan/[0.03] dark:bg-accent-cyan/[0.06] blur-[100px] animate-float-delayed will-change-transform"
      />

      {/* ── Fine grid overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-container container-padding flex flex-col items-center text-center pt-20 pb-24 md:pt-24 md:pb-32">
        {/* ── Name ── */}
        <motion.h1
          className="text-display-mobile md:text-display font-heading gradient-text text-balance max-w-4xl"
          {...animationProps}
          variants={fadeUp}
          transition={reducedMotion ? undefined : { delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.name}
        </motion.h1>

        {/* ── Typewriter role ── */}
        <motion.div
          className="mt-4 md:mt-6 h-10 md:h-12 flex items-center justify-center"
          {...animationProps}
          variants={fadeUp}
          transition={reducedMotion ? undefined : { delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-h3 md:text-h2 font-heading text-slate-600 dark:text-text-secondary">
            {displayText}
            <span
              className="inline-block w-[3px] h-[1.1em] ml-1 align-middle bg-primary animate-[blink_1s_step-end_infinite]"
              aria-hidden="true"
            />
          </span>
        </motion.div>

        {/* ── Summary paragraph ── */}
        <motion.p
          className="mt-6 md:mt-8 max-w-2xl text-body md:text-body-lg text-slate-600 dark:text-text-secondary leading-relaxed text-balance"
          {...animationProps}
          variants={fadeUp}
          transition={reducedMotion ? undefined : { delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.summary}
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
          {...animationProps}
          variants={staggerContainer}
          transition={reducedMotion ? undefined : { delayChildren: 0.8, staggerChildren: 0.12 }}
        >
          <motion.a
            href="#projects"
            onClick={handleScrollToProjects}
            variants={staggerItem}
            aria-label="Ver proyectos destacados"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-body font-semibold text-white shadow-glow-md transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Ver Proyectos</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>

          <motion.a
            href="/cv.pdf"
            download
            variants={staggerItem}
            aria-label="Descargar currículum"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-border-glass bg-white/60 dark:bg-bg-glass/40 backdrop-blur-sm px-8 py-3.5 text-body font-semibold text-slate-900 dark:text-text-primary transition-all duration-300 hover:border-primary/40 hover:bg-white/80 dark:hover:bg-bg-glass/60 hover:shadow-glow-sm hover:scale-[1.03] active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Descargar CV</span>
          </motion.a>
        </motion.div>

        {/* ── Social Links ── */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-4"
          {...animationProps}
          variants={fadeUp}
          transition={reducedMotion ? undefined : { delay: 0.95, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="https://github.com/poravv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group flex items-center gap-2 rounded-xl border border-slate-300 dark:border-border-glass bg-white/60 dark:bg-bg-glass/40 backdrop-blur-sm px-4 py-2.5 text-slate-700 dark:text-text-secondary transition-all duration-300 hover:border-primary/40 hover:bg-white/80 dark:hover:bg-bg-glass/60 hover:text-primary-light hover:shadow-glow-sm hover:scale-[1.05]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            <span className="text-body-sm font-medium">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/andr%C3%A9s-valentin-vera-chavez-b3baa6188/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group flex items-center gap-2 rounded-xl border border-slate-300 dark:border-border-glass bg-white/60 dark:bg-bg-glass/40 backdrop-blur-sm px-4 py-2.5 text-slate-700 dark:text-text-secondary transition-all duration-300 hover:border-primary/40 hover:bg-white/80 dark:hover:bg-bg-glass/60 hover:text-primary-light hover:shadow-glow-sm hover:scale-[1.05]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span className="text-body-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/_vienecadames_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group flex items-center gap-2 rounded-xl border border-slate-300 dark:border-border-glass bg-white/60 dark:bg-bg-glass/40 backdrop-blur-sm px-4 py-2.5 text-slate-700 dark:text-text-secondary transition-all duration-300 hover:border-primary/40 hover:bg-white/80 dark:hover:bg-bg-glass/60 hover:text-primary-light hover:shadow-glow-sm hover:scale-[1.05]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span className="text-body-sm font-medium">Instagram</span>
          </a>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          className="mt-16 md:mt-20 flex flex-wrap justify-center gap-8 md:gap-0 md:divide-x md:divide-slate-200 dark:md:divide-border-glass"
          {...animationProps}
          variants={staggerContainer}
          transition={reducedMotion ? undefined : { delayChildren: 1.0, staggerChildren: 0.15 }}
        >
          <StatItem
            value={profile.yearsOfExperience}
            suffix="+"
            label="Años de Experiencia"
            duration={1800}
            reducedMotion={reducedMotion}
          />
          <StatItem
            value={15}
            suffix="+"
            label="Proyectos"
            duration={1600}
            reducedMotion={reducedMotion}
          />
          <StatItem
            value={65}
            suffix="+"
            label="Tecnologías"
            duration={2000}
            reducedMotion={reducedMotion}
          />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        {...animationProps}
        variants={fadeUp}
        transition={reducedMotion ? undefined : { delay: 1.4, duration: 0.6 }}
      >
        <span className="text-caption text-slate-400 dark:text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.svg
          className="w-5 h-5 text-slate-400 dark:text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={reducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>

      {/* ── Blink keyframe (injected once) ── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
