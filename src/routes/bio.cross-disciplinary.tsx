import { createFileRoute } from '@tanstack/react-router';
import { BioCrossDisciplinaryView } from '@/client/views/bio-cross-disciplinary-view';

export const Route = createFileRoute('/bio/cross-disciplinary')({ component: BioCrossDisciplinaryView });
