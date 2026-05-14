/**
 * Generic empty subpage for technical detail pages.
 * Used by: Dream In Spotlight technical page, Blade Runner 2049 technical page,
 * Silent Hill f technical page.
 */
import { PageLayout } from '@/components/page-layout';
import { Link, useLocation } from '@tanstack/react-router';

export function EmptySubpageView() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const section = segments[0] ?? '';
  const title = segments[segments.length - 1]
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) ?? '';

  return (
    <PageLayout>
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '4rem 2rem' }}>
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          to={`/${section}` as any}
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'oklch(0.55 0.08 250)',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '2rem',
          }}
        >
          ← back to {section}
        </Link>

        <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'oklch(0.50 0.08 250)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          {section} / {title}
        </div>
        <h1 style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '3rem' }}>
          {title}
        </h1>

        <div
          style={{
            border: '1px solid oklch(0.18 0.03 265)',
            padding: '5rem 3rem',
            textAlign: 'center',
            background: 'oklch(0.085 0.02 265)',
          }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.14em', color: 'oklch(0.35 0.04 265)', textTransform: 'uppercase' }}>
            technical details coming soon
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
