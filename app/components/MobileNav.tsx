'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const links = [
  { href: '/',            label: 'Start' },
  { href: '/#leistungen', label: 'Leistungen' },
  { href: '/ueber-uns',   label: 'Über uns' },
  { href: '/#kontakt',    label: 'Kontakt' },
  { href: '/admin',       label: 'Admin', muted: true },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Scroll sperren wenn Menü offen; Esc zum Schließen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.body.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="nav-mobile-trigger">
      {/* Hamburger / X Taste */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={open}
        style={{
          background: 'none',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
          width: '2.5rem',
          height: '2.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* Menü-Overlay */}
      {open && (
        <nav className="mobile-menu" aria-label="Mobile Navigation">
          {links.map(({ href, label, muted }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className="mobile-menu-link"
              style={muted ? { color: 'var(--text-subtle)', fontSize: '1rem' } : undefined}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/#kontakt"
            onClick={close}
            className="btn-primary"
            style={{ marginTop: '1.5rem', justifyContent: 'center', textAlign: 'center' }}
          >
            Anfrage stellen →
          </Link>
        </nav>
      )}
    </div>
  );
}
