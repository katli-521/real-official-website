import { createFileRoute } from '@tanstack/react-router';
import { BioAdmittedSchoolsView } from '@/client/views/bio-admitted-schools-view';

export const Route = createFileRoute('/bio/admitted-schools')({ component: BioAdmittedSchoolsView });
