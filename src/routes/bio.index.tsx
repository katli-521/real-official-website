import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bio/')({ component: BioIndexPage });

function BioIndexPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 700, letterSpacing: '0.1em', color: 'oklch(0.90 0.08 250)', marginBottom: '1rem' }}>BIO</h1>
      <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'oklch(0.50 0.04 265)', lineHeight: 1.8 }}>Select a file from the tree to read.</p>
    </div>
  );
}
