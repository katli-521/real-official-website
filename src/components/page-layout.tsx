/**
 * Shared page layout wrapper.
 * Renders the persistent Nav and wraps page content with
 * top padding (to avoid nav overlap) and consistent spacing.
 */
import type { ReactNode } from 'react';
import { Nav } from './nav';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 20% 50%, oklch(0.13 0.06 265) 0%, oklch(0.07 0.02 265) 60%)',
        color: 'oklch(0.93 0.01 265)',
      }}
    >
      <Nav />
      <div
        style={{ paddingTop: '52px' }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}
