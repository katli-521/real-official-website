import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PageLayout } from '@/components/page-layout';
import { Link, useLocation } from '@tanstack/react-router';

const bioFiles = [
  { name: '2.1 cv', to: '/bio/cv' },
  { name: '2.2 cross-disciplinary', to: '/bio/cross-disciplinary' },
  { name: '2.3 readme.txt', to: '/bio/readme' },
  { name: '2.4 admitted schools', to: '/bio/admitted-schools' },
  { name: '2.5 contact', to: '/bio/contact' },
];

export const Route = createFileRoute('/bio')({ component: BioLayout });

function BioLayout() {
  const location = useLocation();
  const current = location.pathname;
  return (
    <PageLayout>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
        <aside style={{ width: '220px', flexShrink: 0, borderRight: '1px solid oklch(0.20 0.04 265)', padding: '2.5rem 0' }}>
          <div style={{ padding: '0 1.5rem 1rem', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.14em', color: 'oklch(0.40 0.04 265)', textTransform: 'uppercase' }}>bio /</div>
          {bioFiles.map((f) => {
            const isActive = current === f.to || current.startsWith(f.to + '/');
            return (
              <Link
                key={f.to}
                to={f.to}
                style={{
                  display: 'block',
                  padding: '8px 1.5rem',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: isActive ? 'oklch(0.85 0.10 250)' : 'oklch(0.60 0.04 265)',
                  background: isActive ? 'oklch(0.14 0.04 265)' : 'transparent',
                  borderLeft: isActive ? '2px solid oklch(0.72 0.15 250)' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {f.name}
              </Link>
            );
          })}
        </aside>
        <main style={{ flex: 1, padding: '3rem 4rem', maxWidth: '800px' }}>
          <Outlet />
        </main>
      </div>
    </PageLayout>
  );
}
