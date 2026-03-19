import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger" | "outline";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    background: "var(--accent)",
    color: "#0b0d11",
    fontWeight: 600,
    border: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-2)",
    border: "1px solid var(--border)",
  },
  danger: {
    background: "var(--danger-bg)",
    color: "var(--danger)",
    border: "1px solid rgba(229,83,75,0.2)",
  },
  outline: {
    background: "transparent",
    color: "var(--text)",
    border: "1px solid var(--border)",
  },
};

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: 12, gap: 6 },
  md: { padding: "8px 16px", fontSize: 14, gap: 8 },
  lg: { padding: "10px 20px", fontSize: 14, gap: 8 },
};

export function Button({ variant = 'outline', size = 'md', loading = false, icon, children, disabled, style, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--r-md)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontFamily: 'Geologica, sans-serif',
        transition: 'opacity 0.15s',
        opacity: disabled || loading ? 0.5 : 1,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {loading
        ? <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
        : icon ? <span style={{ display: 'flex', flexShrink: 0 }}>{icon}</span> : null
      }
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </button>
  );
}
