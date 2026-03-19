export default function Loading() {
  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            height: 88, borderRadius: 'var(--r-lg)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            animation: `shimmer 1.5s ease-in-out ${i * 0.1}s infinite`,
          }} />
        ))}
      </div>
      <div style={{ height: 400, borderRadius: 'var(--r-lg)', background: 'var(--surface)', border: '1px solid var(--border)' }} />
      <style>{`
        @keyframes shimmer { 0%,100%{opacity:.4} 50%{opacity:.7} }
      `}</style>
    </div>
  );
}