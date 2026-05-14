import { createFileRoute } from '@tanstack/react-router';
import { BioCvView } from '@/client/views/bio-cv-view';

export const Route = createFileRoute('/bio/cv')({ component: BioCvView });
