import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  accent?: boolean;
}

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div
      style={{
        background: accent ? "var(--accent-bg)" : "var(--surface)",
        border: `1px solid ${accent ? "rgba(240, 165, 0, 0.2)" : "var(--border)"}`,
        borderRadius: "var(--r-lg)",
        padding: "20px 24px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-1.5px",
            lineHeight: 1,
            color: accent ? "var(--accent)" : "var(--text)",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--text-2)",
            marginTop: 7,
            fontWeight: 500,
          }}
        >
          {label}
        </div>
        {icon && (
          <div
            style={{
              color: accent ? "var(--accent)" : "var(--text-3)",
              opacity: 0.6,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
