interface TagListProps {
  items: string[];
  /** Accessible name for the list, e.g. "Tecnologías de FoxBox". */
  label: string;
  /** Show at most this many tags and summarize the rest as "+N". */
  limit?: number;
}

/** Wrapping list of monospace technology tags. */
export default function TagList({ items, label, limit = items.length }: TagListProps) {
  const visible = items.slice(0, limit);
  const hiddenCount = items.length - visible.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {visible.map((item) => (
        <li key={item} className="rounded-sm border border-line px-2 py-0.5 font-mono text-caption text-fg-muted">
          {item}
        </li>
      ))}
      {hiddenCount > 0 && (
        <li className="px-1 py-0.5 font-mono text-caption text-fg-subtle">
          +{hiddenCount}
          <span className="sr-only"> tecnologías más: {items.slice(limit).join(', ')}</span>
        </li>
      )}
    </ul>
  );
}
