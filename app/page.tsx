import { ReactNode } from 'react';
import ClientRoot from './client-root';

export const dynamic = 'force-dynamic';

export default function Page(): ReactNode {
  return <ClientRoot />;
}
