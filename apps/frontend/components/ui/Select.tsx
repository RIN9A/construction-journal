import { Ref, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: {value: string | number; label: string}[];
  ref?: Ref<HTMLSelectElement>;
}

export function Select({label, error, placeholder, options, ref, ...props}: SelectProps) {
  const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b8fa8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

  return(
    <div style={{display: 'flex', flexDirection: 'column', gap:6}}
    >
      {label &&
      <label style={{fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--text-2)'
      }}
      >{label}</label>}
      <select
      ref={ref}
      style={{
        background: 'var(--surface-2)',
        border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
        color: props.value ? 'var(--text)' : 'var(--text-3)',
        borderRadius: 'var(--r-md)',
        padding: '9px 36px 9px 12px',
        fontSize: 14,
        outline: 'none',
        width: '100%',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: chevron,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
      }}
      {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <span style={{fontSize: 12, color: 'var(--danger)'}}>{error}</span>}
    </div> 
  )
}