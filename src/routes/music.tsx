import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { MusicView } from '@/client/views/music-view';

export const Route = createFileRoute('/music')({ component: MusicLayout });

function MusicLayout() {
  const location = useLocation();
  if (location.pathname === '/music' || location.pathname === '/music/') {
    return <MusicView />;
  }
  return <Outlet />;
}
