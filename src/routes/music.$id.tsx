/**
 * /music/$id — dynamic music subpage route.
 *
 * How it works:
 * - If id === 'dream-in-spotlight', redirect the browser to the external site.
 * - Otherwise, render the empty subpage placeholder for future content.
 */
import { createFileRoute, redirect } from '@tanstack/react-router';
import { EmptySubpageView } from '@/client/views/empty-subpage-view';

export const Route = createFileRoute('/music/$id')({
  beforeLoad: ({ params }) => {
    if (params.id === 'dream-in-spotlight') {
      throw redirect({ href: 'https://dream-in-spotlight.vercel.app', statusCode: 302 });
    }
  },
  component: EmptySubpageView,
});
