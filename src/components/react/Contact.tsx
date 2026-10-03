import { useEffect, useState, type ComponentType } from 'react';
import { ArrowUpRight, Check, Clock, Copy, Download, Mail, MapPin } from 'lucide-react';
import type { Profile } from '@/lib/portfolio';
import Section from './ui/Section';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './ui/BrandIcons';

interface ContactProps {
  profile: Profile;
}

interface Channel {
  label: string;
  handle: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

type CopyState = 'idle' | 'copied' | 'failed';

const TIME_ZONE = 'America/Asuncion';
const COPY_RESET_MS = 2500;

function useLocalTime(timeZone: string): string | null {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      setTime(new Intl.DateTimeFormat('es-PY', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date()));
    format();
    const id = setInterval(format, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function useCopyToClipboard(): [CopyState, (text: string) => void] {
  const [state, setState] = useState<CopyState>('idle');
  useEffect(() => {
    if (state === 'idle') return;
    const id = setTimeout(() => setState('idle'), COPY_RESET_MS);
    return () => clearTimeout(id);
  }, [state]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('failed');
    }
  };
  return [state, copy];
}

const COPY_MESSAGES: Record<CopyState, string> = {
  idle: '',
  copied: 'Email copiado al portapapeles.',
  failed: 'No se pudo copiar. Seleccioná el email y copialo manualmente.',
};

/** Contact: primary email CTA with copy-to-clipboard, CV download and secondary channels. */
export default function Contact({ profile }: ContactProps) {
  const { businessEmail, email, linkedin, github, whatsapp } = profile.contact;
  const localTime = useLocalTime(TIME_ZONE);
  const [copyState, copy] = useCopyToClipboard();

  const channels: Channel[] = [
    { label: 'LinkedIn', handle: `in/${linkedin}`, href: `https://www.linkedin.com/in/${encodeURIComponent(linkedin)}/`, Icon: LinkedInIcon },
    { label: 'GitHub', handle: `@${github}`, href: `https://github.com/${github}`, Icon: GitHubIcon },
    { label: 'WhatsApp', handle: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`, Icon: WhatsAppIcon },
    { label: 'Email personal', handle: email, href: `mailto:${email}`, Icon: Mail },
  ];

  return (
    <Section id="contact" index="07" title="Contacto">
      <p className="max-w-xl text-body-lg text-fg-muted">
        Para propuestas laborales, proyectos freelance o consultas técnicas, la vía más directa es el email.
      </p>

      <a
        href={`mailto:${businessEmail}`}
        className="mt-6 inline-block break-all font-display text-headline text-fg underline decoration-line-strong decoration-1 underline-offset-[0.2em] transition-colors duration-200 hover:text-accent hover:decoration-accent"
      >
        {businessEmail}
      </a>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={`mailto:${businessEmail}`} className="btn-primary">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Enviar email
        </a>
        <button type="button" onClick={() => copy(businessEmail)} className="btn-secondary">
          {copyState === 'copied' ? (
            <Check className="h-4 w-4 text-live" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copyState === 'copied' ? 'Copiado' : 'Copiar email'}
        </button>
        <a href="/cv.pdf" download className="btn-secondary">
          <Download className="h-4 w-4" aria-hidden="true" />
          Descargar CV
          <span className="font-mono text-caption text-fg-subtle">PDF</span>
        </a>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-[1.5rem] text-body-sm text-fg-muted">
        {COPY_MESSAGES[copyState]}
      </p>

      <h3 className="eyebrow mt-12">Otros canales</h3>
      <ul className="mt-4 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2" role="list">
        {channels.map(({ label, handle, href, Icon }) => {
          const isExternal = href.startsWith('https://');
          return (
            <li key={label} className="border-b border-r border-line">
              <a
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex min-h-[72px] items-center gap-4 p-4 transition-colors duration-200 hover:bg-surface"
              >
                <Icon className="h-5 w-5 flex-none text-fg-muted transition-colors group-hover:text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-caption uppercase tracking-[0.12em] text-fg-subtle">{label}</span>
                  <span className="block truncate text-body-sm text-fg" title={handle}>
                    {handle}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 flex-none text-fg-subtle transition-colors group-hover:text-accent" aria-hidden="true" />
                {isExternal && <span className="sr-only">(abre en una pestaña nueva)</span>}
              </a>
            </li>
          );
        })}
      </ul>

      <dl className="mt-8 flex flex-col gap-3 text-body-sm text-fg-muted sm:flex-row sm:gap-8">
        <div className="flex items-center gap-2">
          <dt>
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Ubicación</span>
          </dt>
          <dd>{profile.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt>
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Hora local</span>
          </dt>
          <dd>
            <span className="inline-block min-w-[3rem] font-mono tabular-nums text-fg">{localTime ?? '--:--'}</span>{' '}
            hora de Asunción <span className="font-mono text-caption text-fg-subtle">({TIME_ZONE})</span>
          </dd>
        </div>
      </dl>
    </Section>
  );
}
