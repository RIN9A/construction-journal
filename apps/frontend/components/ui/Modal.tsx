'use client'

import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: number;
}

export function Modal({open, onClose, title, children, maxWidth = 520}: ModalProps) {
  useEffect(() => {
    if(!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose])

  if(!open) return null;

  return (
    <div
    onClick={e => e.target === e.currentTarget && onClose()}
    style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}
    >
      <style>{`
      @keyframes modal-in {
      from {opacity: 0; transform: translateY(10px) scale(0.98);}
      to {opacity: 1; transform: translateY(0) scale(1);}
      }
      `}
      </style>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        width: '100%', maxWidth,
        maxHeight: '90vh', overflowY: 'auto',
        animation: 'modal-in 0.18s ease',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid var(--border)',
        }}
        >
          <h2 style={{fontSize: 15, fontWeight: 600}}>{title}</h2>
          <button
          onClick={onClose}
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            color: 'var(--text-2)', borderRadius: 'var(--r-sm)',
            width: 28, height: 28, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
          <X size={13}/>
          </button>
        </div>
        <div style={{padding: 24}}>{children}</div>
      </div>
    </div>
  )
}