"use client";

import { Entry } from "@/lib/api";
import { Table } from "../ui/Table";
import { Badge } from "../ui/Badge";
import { formatDate, formatVolume } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Pencil, Trash2 } from "lucide-react";

interface EntryTableProps {
  entries: Entry[];
  loading: boolean;
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

export function EntryTable({
  entries,
  loading,
  onEdit,
  onDelete,
}: EntryTableProps) {
  return (
    <Table
      data={entries}
      loading={loading}
      keyExtractor={(row) => row.id}
      emptyMessage="Записей не найдено. Добавьте первую запись."
      columns={[
        {
          key: "date",
          header: "Дата",
          width: 130,
          render: (row) => (
            <Badge variant="accent">{formatDate(row.date)}</Badge>
          ),
        },
        {
          key: "date",
          header: "Вид работ",
          width: 130,
          render: (row) => (
            <span style={{ fontWeight: 500 }}>{row.workType.name}</span>
          ),
        },
        {
          key: "volume",
          header: "Объем",
          width: 120,
          render: (row) => (
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              {formatVolume(row.volume, row.workType.unit)}
            </span>
          ),
        },
        {
          key: "executor",
          header: "Исполнитель",
          render: (row) => row.executorName,
        },
        {
          key: "notes",
          header: "Примечания",
          render: (row) => (
            <span style={{ color: "var(--text-2)", fontSize: 13 }}>
              {row.notes || "-"}
            </span>
          ),
        },
        {
          key: "actions",
          header: "",
          width: 88,
          render: (row) => (
            <div
              style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}
            >
              <Button
                variant="ghost"
                size="sm"
                icon={<Pencil size={13} />}
                onClick={() => onEdit(row)}
              >
                {""}
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={13} />}
                onClick={() => onDelete(row)}
              >
                {""}
              </Button>
            </div>
          ),
        },
      ]}
    ></Table>
  );
}
