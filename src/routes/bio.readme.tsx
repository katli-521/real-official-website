import { createFileRoute } from '@tanstack/react-router';
import { BioReadmeView } from '@/client/views/bio-readme-view';

export const Route = createFileRoute('/bio/readme')({ component: BioReadmeView });
