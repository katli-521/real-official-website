/**
 * Live section — placeholder for future concert listings.
 */
import { PageLayout } from '@/components/page-layout';

export function LiveView() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'oklch(0.50 0.08 250)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          live /
        </div>
        <h1 style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '3rem' }}>
          Live
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
            concert listings &amp; images coming soon
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.28 0.04 265)', marginTop: '8px' }}>
            20+ concerts · 11 gigs · 1 festival · 5 headlining shows · ~1,000 audience
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
