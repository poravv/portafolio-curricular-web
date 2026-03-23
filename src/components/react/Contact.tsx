import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from 'lucide-react';

interface ContactProps {
  profile: {
    name: string;
    contact: {
      email: string;
      businessEmail: string;
      phone: string;
      whatsapp: string;
      website: string;
      instagram: string;
      linkedin: string;
      github: string;
    };
    location: string;
  };
}

/** Format WhatsApp number for wa.me link (digits only) */
function waLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

/** Format phone for tel: link */
function telLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+${digits}`;
}

interface ContactInfoItem {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  color: string;
}

function WhatsAppFloatingButton({ reducedMotion }: { reducedMotion: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past ~100vh
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/595992756462"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5, y: 20 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping"
            style={{ animationDuration: '3s' }}
            aria-hidden="true"
          />
          {/* WhatsApp SVG icon */}
          <svg
            className="w-7 h-7 relative"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function Contact({ profile }: ContactProps) {
  const reducedMotion = useReducedMotion();

  const viewportConfig = { once: true, amount: 0.2 as const };
  const motionProps = reducedMotion
    ? {}
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportConfig };

  const contactItems: ContactInfoItem[] = [
    {
      icon: Phone,
      label: 'Tel\u00e9fono',
      value: '+595 992 756 462',
      href: telLink('+595 992 756 462'),
      color: 'text-accent-cyan',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+595 992 756 462',
      href: 'https://wa.me/595992756462',
      color: 'text-[#25D366]',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'andyvercha@gmail.com',
      href: 'mailto:andyvercha@gmail.com',
      color: 'text-primary-light',
    },
    {
      icon: MapPin,
      label: 'Ubicaci\u00f3n',
      value: profile.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location)}`,
      color: 'text-accent-amber',
    },
  ];

  return (
    <>
      <section id="contact" className="section-padding relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-container container-padding relative">
          {/* Section heading */}
          <motion.div variants={fadeUp} {...motionProps} className="mb-12 md:mb-16 text-center">
            <p className="text-label uppercase tracking-widest text-primary-light mb-3">
              Hablemos
            </p>
            <h2 className="text-h2-mobile md:text-h2 font-heading gradient-text">
              Contacto
            </h2>
          </motion.div>

          {/* Centered single column with contact cards */}
          <div className="max-w-xl mx-auto">
            <motion.div
              variants={staggerContainer}
              {...motionProps}
              className="space-y-4"
            >
              {contactItems.map((item) => {
                const Icon = item.icon;
                const isExternal = item.href.startsWith('https://');

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    variants={staggerItem}
                    className="glass-card p-4 md:p-5 flex items-center gap-4 group hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 block"
                  >
                    {/* Icon container */}
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-border group-hover:shadow-glow-sm transition-shadow duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} aria-hidden="true" />
                    </div>

                    {/* Label + Value */}
                    <div className="min-w-0">
                      <p className="text-caption text-slate-500 dark:text-text-muted uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-body-sm text-slate-800 dark:text-text-primary font-medium truncate group-hover:text-primary-light transition-colors duration-200">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <WhatsAppFloatingButton reducedMotion={reducedMotion} />
    </>
  );
}
