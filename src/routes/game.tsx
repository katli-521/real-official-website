import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { GameView } from '@/client/views/game-view';

export const Route = createFileRoute('/game')({ component: GameLayout });

function GameLayout() {
  const location = useLocation();
  if (location.pathname === '/game' || location.pathname === '/game/') {
    return <GameView />;
  }
  return <Outlet />;
}
