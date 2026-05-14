import { createFileRoute } from '@tanstack/react-router';
import { LiveView } from '@/client/views/live-view';

export const Route = createFileRoute('/live')({ component: LiveView });
