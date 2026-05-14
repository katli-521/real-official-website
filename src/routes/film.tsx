import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { FilmView } from '@/client/views/film-view';

export const Route = createFileRoute('/film')({ component: FilmLayout });

function FilmLayout() {
  const location = useLocation();
  if (location.pathname === '/film' || location.pathname === '/film/') {
    return <FilmView />;
  }
  return <Outlet />;
}
