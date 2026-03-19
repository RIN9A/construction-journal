import { ReactNode } from "react";

type BadgeVariant = 'accent'| 'neutral' | 'success' | 'danger';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const styles: Record<BadgeVariant, {bg: string; color: string}> = {
  accent: {bg: 'var(--accent-bg)', color: 'var(--accent)'},
  neutral: {bg: 'var(--surface-3)', color: 'var(--text-2)'},
  success: {bg: 'rgba(63,185,80,0.12)', color: 'var(--success)'},
  danger: {bg: 'var(--danger-bg)', color: 'var(--danger)'},
};

export function Badge({children, variant='neutral'}: BadgeProps) {
  const s = styles[variant];
  return(
    <span style={{
      background: s.bg, color: s.color,
      padding: '2px 8px', borderRadius: 99,
      fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
      fontFamily: 'JetBrains Mono, monospace',
      letterSpacing: '0.02em',
    }}>{children}</span>
  );
}