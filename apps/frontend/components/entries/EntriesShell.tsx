'use client'

import { useEntries } from "@/hooks/useEntries";
import { Entry, EntryFilters } from "@/lib/api"
import { useState } from "react"
import { Button } from "../ui/Button";
import { ClipboardList, Layers, Plus, Users } from "lucide-react";
import { EntryFilters as FiltersBar } from "./EntryFilters";
import { EntryTable } from "./EntryTable";
import { Modal } from "../ui/Modal";
import { EntryForm } from "./EntryForm";
import { DeleteConfirm } from "./DeleteConfirm";
import { StatCard } from "../ui/StatCard";


export function EntriesShell() {
  const [filters, setFilters] = useState<EntryFilters>({sort: 'desc'});
  const [formOpen, setFormOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<Entry | null>(null);
  const [delEntry, setDelEntry] = useState<Entry | null>(null);

  const {data: entries = [], isLoading} = useEntries(filters);
  const openCreate = () => {setEditEntry(null); setFormOpen(true);};
  const openEdit = (e: Entry) => {setEditEntry(e); setFormOpen(true);}
  const closeForm = () => {setFormOpen(false); setEditEntry(null)};
  const stats = {
  total: entries.length,
  executors: new Set(entries.map(e => e.executorName)).size,
  workTypes: new Set(entries.map(e => e.workType.name)).size,
};
  return (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <StatCard label="Всего записей" value={stats.total} icon={<ClipboardList size={20} />} accent />
        <StatCard label="Исполнителей" value={stats.executors} icon={<Users size={20} />} />
        <StatCard label="Видов работ" value={stats.workTypes} icon={<Layers size={20} />} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="primary" size="md" icon={<Plus size={16} />}
          onClick={openCreate}>Добавить запись</Button>
      </div>
      <FiltersBar filters={filters} onChange={setFilters} />
      <EntryTable
        entries={entries}
        loading={isLoading}
        onEdit={openEdit}
        onDelete={setDelEntry}
      />
    </div>
    <Modal open={formOpen} onClose={closeForm}
      title={editEntry ? 'Редактировать запись' : 'Новая запись'}>
      <EntryForm entry={editEntry} onSuccess={closeForm} />
    </Modal>
    <Modal open={!!delEntry} onClose={() => setDelEntry(null)}
      title="Подтверждение" maxWidth={400}>
      {delEntry && (
        <DeleteConfirm
          entry={delEntry}
          onSuccess={() => setDelEntry(null)}
          onCancel={() => setDelEntry(null)}
        />
      )}
    </Modal>
  </>
);
}