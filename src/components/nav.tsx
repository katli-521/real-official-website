/**
 * Persistent navigation bar used across all pages.
 * Shows KAT back-link on left, page links on right.
 * Active route is highlighted with underline.
 */
import { Link, useLocation } from '@tanstack/react-router';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Bio', to: '/bio' },
  { label: 'Music', to: '/music' },
  { label: 'Film', to: '/film' },
  { label: 'Game', to: '/game' },
  { label: 'Live', to: '/live' },
  { label: 'Interaction', to: '/interaction' },
];

export function Nav() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        height: '52px',
        background: 'oklch(0.07 0.02 265 / 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid oklch(0.25 0.04 265 / 0.6)',
      }}
    >
      {/* Left: back arrow + KAT */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'oklch(0.72 0.15 250)',
          fontFamily: 'monospace',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          transition: 'opacity 0.2s',
        }}
      >
        <span style={{ fontSize: '14px' }}>←</span>
        <span>KAT</span>
      </Link>

      {/* Right: nav links */}
      <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }}>
        {navLinks.map((link) => {
          const isActive =
            link.to === '/'
              ? current === '/'
              : current.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                color: isActive
                  ? 'oklch(0.72 0.15 250)'
                  : 'oklch(0.65 0.04 265)',
                transition: 'color 0.2s',
                fontWeight: isActive ? 600 : 400,
                position: 'relative',
              }}
            >
              {link.label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-3px',
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: 'oklch(0.72 0.15 250)',
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
