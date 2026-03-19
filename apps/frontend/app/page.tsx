import { EntriesShell } from '@/components/entries/EntriesShell';
import { StatCard } from '@/components/ui/StatCard';
import { getEntriesServer } from '@/lib/api.server';
import { ClipboardList, Users, Layers } from 'lucide-react';


export default async function Page() {
  const entries = await getEntriesServer();

  const uniqueExecutors = new Set(entries.map(e => e.executorName)).size;
  const uniqueWorkTypes = new Set(entries.map(e => e.workType.name)).size;

  return (
    <main style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 24px'}}>

      <EntriesShell />

    </main>
  );
}