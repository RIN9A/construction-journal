import { CSSProperties, InputHTMLAttributes, Ref } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  ref?: Ref<HTMLInputElement>;
}
const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-2)",
};

export function Input({ label, error, hint, ref, ...props }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        ref={ref}
        style={{
          background: "var(--surface-2)",
          border: `1px solid ${error ? "var(--danger)" : "var(--border)"}`,
          color: "var(--text)",
          borderRadius: "var(--r-md)",
          padding: "9px 12px",
          fontSize: 14,
          outline: "none",
          width: "100%",
          transition: "border-color 0.15s",
        }}
        onFocus={e => {e.currentTarget.style.borderColor = error ? 'var(--danger)': 'var(--accent)';}}
        onBlur={e => {e.currentTarget.style.borderColor = error ? 'var(--danger)' : 'var(--border)';}}
        {...props}
      />
      {error && <span style={{fontSize: 12, color: 'var(--danger)' }}>{error}</span>}
      {hint && !error && <span style={{fontSize: 12, color: 'var(--text-3)'}}>{hint}</span>}
    </div>
  );
}
