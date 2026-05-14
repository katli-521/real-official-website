import { createFileRoute } from '@tanstack/react-router';
import { InteractionView } from '@/client/views/interaction-view';

export const Route = createFileRoute('/interaction')({ component: InteractionView });
