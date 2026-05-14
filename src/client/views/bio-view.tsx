/**
 * Bio section with file-tree navigation to 3 subpages:
 * 2.1 Cross-disciplinary, 2.2 CV, 2.3 readme.txt
 */
import { PageLayout } from '@/components/page-layout';
import { Link, Outlet, useLocation } from '@tanstack/react-router';

const bioFiles = [
  { name: '2.1 cross-disciplinary', to: '/bio/cross-disciplinary' },
  { name: '2.2 cv', to: '/bio/cv' },
  { name: '2.3 readme.txt', to: '/bio/readme' },
];

export function BioView() {
  const location = useLocation();
  const current = location.pathname;
  const isRoot = current === '/bio' || current === '/bio/';

  return (
    <PageLayout>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
        {/* File tree sidebar */}
        <aside
          style={{
            width: '240px',
            flexShrink: 0,
            borderRight: '1px solid oklch(0.20 0.04 265)',
            padding: '2.5rem 0',
          }}
        >
          <div
            style={{
              padding: '0 1.5rem 1rem',
              fontFamily: 'monospace',
              fontSize: '9px',
              letterSpacing: '0.14em',
              color: 'oklch(0.40 0.04 265)',
              textTransform: 'uppercase',
            }}
          >
            bio /
          </div>

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
                  letterSpacing: '0.02em',
                }}
              >
                {f.name}
              </Link>
            );
          })}
        </aside>

        {/* Content area */}
        <main style={{ flex: 1, padding: '3rem 4rem', maxWidth: '800px' }}>
          {isRoot ? (
            <div>
              <h1
                style={{
                  fontFamily: 'monospace',
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'oklch(0.90 0.08 250)',
                  marginBottom: '1rem',
                }}
              >
                BIO
              </h1>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: 'oklch(0.50 0.04 265)',
                  lineHeight: 1.8,
                }}
              >
                Select a file from the tree to read.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </PageLayout>
  );
}
