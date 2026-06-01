'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import config from '@/data/config.json';

const { company } = config;

const links = [
  { href: '/',            label: 'Start' },
  { href: '/#leistungen', label: 'Leistungen' },
  { href: '/ueber-uns',   label: 'Über uns' },
  { href: '/#kontakt',    label: 'Kontakt' },
];

export default function MobileNav() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal braucht browser-Umgebung
  useEffect(() => { setMounted(true); }, []);

  // Scroll sperren + Esc schließt Menü
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

  return (
    <>
      {/* ── Hamburger / X-Button ────────────────────────────────
          Immer im DOM – Sichtbarkeit via CSS im <head> (#mobile-menu-btn)
          display:none auf Desktop, display:flex auf Mobile (≤820px)
      ────────────────────────────────────────────────────────── */}
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
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6"  y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* ── Vollbild-Overlay via createPortal ──────────────────
          Wird direkt in document.body gemountet, AUSSERHALB des
          Headers. Dadurch entkommt es dem backdrop-filter-
          Stacking-Context des Headers, der sonst position:fixed
          auf den Header-Bereich beschränken würde.
      ────────────────────────────────────────────────────────── */}
      {mounted && open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#0f0f0f',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {/* Header-Leiste im Overlay */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #2e2e2e',
            flexShrink: 0,
          }}>
            <Link href="/" onClick={close} style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#f0f0f0', fontWeight: 700 }}>
                GALA<span style={{ color: '#d4b53a' }}>-</span>BAU
              </span>
            </Link>

            <button
              onClick={close}
              aria-label="Menü schließen"
              style={{
                background: 'none',
                border: '1px solid #3a3a3a',
                color: '#f0f0f0',
                width: '44px',
                height: '44px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6"  y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Nav-Links */}
          <nav style={{ flex: 1, padding: '1rem 1.5rem' }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                style={{
                  display: 'block',
                  color: '#f0f0f0',
                  textDecoration: 'none',
                  fontSize: '2rem',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  padding: '1rem 0',
                  borderBottom: '1px solid #2e2e2e',
                  letterSpacing: '-0.01em',
                }}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/#kontakt"
              onClick={close}
              style={{
                display: 'block',
                marginTop: '2rem',
                backgroundColor: '#c9a227',
                color: '#fff',
                textDecoration: 'none',
                textAlign: 'center',
                padding: '1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Kostenlos anfragen →
            </Link>
          </nav>

          {/* Kontaktdaten unten */}
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid #2e2e2e',
            flexShrink: 0,
          }}>
            <a
              href={`tel:${company.phone.replace(/[\s/]/g, '')}`}
              style={{ display: 'block', color: '#d4b53a', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}
            >
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              style={{ display: 'block', color: '#8a8a8a', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              {company.email}
            </a>
            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.25rem' }}>
              {company.hours}
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
