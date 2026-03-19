import { tr } from "date-fns/locale";
import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  width?: string | number;
  render: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  keyExtractor: (row: T) => string | number;
}

export function Table<T>({
  columns,
  data,
  loading,
  emptyMessage = "Нет данных",
  keyExtractor,
}: TableProps<T>) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(-lg)",
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: "11px 16px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--text-3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: "var(--surface-2)",
                    borderBottom: "1px solid var(--border)",
                    whiteSpace: "nowrap",
                    width: col.width,
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ padding: 52, textAlign: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          border: "50%",
                          background: "var(--text-3)",
                          animation: `dot-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <style>{`
                  @keyframes dot-pulse {
                  0%,100%{opacity:.3;transform:scale(.8)}
                  50%{opacity:1;transform:scale(1)}
                  }
                  `}</style>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: 52,
                    textAlign: "center",
                    color: "var(--text-3)",
                    fontSize: 14,
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={keyExtractor(row)}
                  style={{
                    borderBottom:
                      i < data.length - 1 ? "1px solid var(--border)" : "none",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--surface-2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{ padding: "13px 16px", fontSize: 14 }}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
