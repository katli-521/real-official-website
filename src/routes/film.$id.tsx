import { createFileRoute } from '@tanstack/react-router';
import { EmptySubpageView } from '@/client/views/empty-subpage-view';

export const Route = createFileRoute('/film/$id')({ component: EmptySubpageView });
