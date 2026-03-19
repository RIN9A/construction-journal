import { HardHat } from "lucide-react";
import { ReactNode } from "react";

export function Header({ actions }: { actions?: ReactNode }) {
  return (
    <header
      style={{
        height: 60,
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap:10}}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <HardHat size={17} color="#0b0d11" strokeWidth={2.2} />
        </div>
        <div>
          <div style={{fontSize:15, fontWeight: 700, letterSpacing: '-0.3px', lineHeight:1.2}}>
            СтройКонтроль
          </div>
          <div style={{fontSize: 10, color:'var(--text-3)', letterSpacing:'0.1em', textTransform: 'uppercase'}}>
            Журнал работ
          </div>
        </div>
      </div>
      {actions && <div>{actions}</div>}
    </header>
  );
}
