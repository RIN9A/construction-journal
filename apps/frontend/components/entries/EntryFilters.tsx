"use client";

import { EntryFilters as IFilters  } from "@/lib/api";
import { SlidersHorizontal, X } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";


interface EntryFilterProps {
  filters: IFilters;
  onChange: (f: IFilters) => void;
}

export function EntryFilters({ filters, onChange }: EntryFilterProps) {
  const hasFilters = !!(filters.dateFrom || filters.dateTo);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "flex-end",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <SlidersHorizontal
        size={15}
        style={{ color: "var(--text-3)", marginBottom: 2, flexShrink: 0 }}
      />
      <div style={{ minWidth: 155 }}>
        <Input
          label="Дата с"
          type="date"
          value={filters.dateFrom ?? ""}
          onChange={(e) =>
            onChange({ ...filters, dateFrom: e.target.value || undefined })
          }
        />
      </div>
      <div style={{ minWidth: 155 }}>
        <Input
          label="Дата по"
          type="date"
          value={filters.dateTo ?? ""}
          onChange={(e) =>
            onChange({ ...filters, dateTo: e.target.value || undefined })
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          minWidth: 155,
        }}
      >
        <label
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-w)",
          }}
        >
          Порядок
        </label>
        <select
          value={filters.sort ?? "desc"}
          onChange={(e) =>
            onChange({ ...filters, sort: e.target.value as "asc" | "desc" })
          }
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            borderRadius: "var(--r-md)",
            padding: "9px 12px",
            fontSize: 14,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="desc">Сначала новые</option>
          <option value="asc">Сначала старые</option>
        </select>
      </div>
      {hasFilters && (
        <Button variant="ghost" size="md" icon={<X size={13}/>}
        onClick={() => onChange({sort: filters.sort})}
        >Сбросить</Button>
      )}
    </div>
  );
}
