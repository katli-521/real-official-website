import { createFileRoute } from '@tanstack/react-router';
import { BioContactView } from '@/client/views/bio-contact-view';

export const Route = createFileRoute('/bio/contact')({ component: BioContactView });
