import { createFileRoute } from '@tanstack/react-router';
import { HomeView } from '@/client/views/home-view';

export const Route = createFileRoute('/')({
  component: HomeView,
});
