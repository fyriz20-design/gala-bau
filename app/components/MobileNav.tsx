'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const links = [
  { href: '/',            label: 'Start' },
  { href: '/#leistungen', label: 'Leistungen' },
  { href: '/ueber-uns',   label: 'Über uns' },
  { href: '/#kontakt',    label: 'Kontakt' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.body.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, mounted]);

  const close = () => setOpen(false);

  /* Nicht auf dem Server rendern – verhindert Hydration-Fehler */
  if (!mounted) return null;

  return (
    <>
      {/* Hamburger-Button */}
      <button
        id="mobile-menu-btn"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={open}
        style={{
          background: 'none',
          border: '1px solid var(--border-light)',
          color: 'var(--text-primary)',
          width: '44px',
          height: '44px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          padding: 0,
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* Vollbild-Overlay */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-base)',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '80px', /* Platz für Header */
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            overflowY: 'auto',
          }}
        >
          {/* Schließen-Button oben rechts */}
          <button
            onClick={close}
            aria-label="Menü schließen"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Logo-Bereich */}
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              GALA<span style={{ color: 'var(--accent-light)' }}>-</span>BAU
            </span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1.75rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border)',
                  display: 'block',
                  letterSpacing: '0.01em',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/#kontakt"
            onClick={close}
            className="btn-primary"
            style={{
              marginTop: '2rem',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '0.9rem',
            }}
          >
            Kostenlos anfragen →
          </Link>

          {/* Kontaktdaten */}
          <div style={{ marginTop: 'auto', paddingTop: '2rem', paddingBottom: '2rem', borderTop: '1px solid var(--border)' }}>
            <a href="tel:016075465370" style={{ color: 'var(--accent-light)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              0160 / 75 46 537
            </a>
            <a href="mailto:info@galabau-ojf.de" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
              info@galabau-ojf.de
            </a>
          </div>
        </div>
      )}
    </>
  );
}
