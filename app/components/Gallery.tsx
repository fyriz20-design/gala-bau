'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
  description?: string;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted]         = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isOpen = activeIndex !== null;
  const active = isOpen ? images[activeIndex] : null;

  const close  = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(
    () => setActiveIndex(i => (i != null ? (i - 1 + images.length) % images.length : i)),
    [images.length],
  );
  const goNext = useCallback(
    () => setActiveIndex(i => (i != null ? (i + 1) % images.length : i)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen, close, goPrev, goNext]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* ── Grid ───────────────────────────────────────── */}
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className="gallery-item"
            onClick={() => setActiveIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`Bild vergrößern: ${img.alt}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i); }}
          >
            {/* Wrapper erzeugt 4:3-Höhe zuverlässig auf ALLEN Browsern */}
            <div className="gallery-item-inner">
              <img
                src={img.src}
                alt={img.alt}
                className="gallery-item-img"
              />
              {/* Hover-Overlay */}
              <div className="gallery-item-overlay">
                {img.label && <span className="gallery-item-label">{img.label}</span>}
                {img.description && <span className="gallery-item-desc">{img.description}</span>}
                <span className="gallery-item-zoom">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8"  y1="11" x2="14" y2="11"/>
                  </svg>
                  Vergrößern
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox (via Portal – umgeht backdrop-filter Stacking) ── */}
      {mounted && isOpen && active && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          {/* Bildinhalt – Klick schließt nicht */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={active.src}
              alt={active.alt}
              style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
            />
            {(active.label || active.description) && (
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                {active.label && <p style={{ color: '#d4b53a', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{active.label}</p>}
                {active.description && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginTop: '0.2rem' }}>{active.description}</p>}
              </div>
            )}
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{activeIndex! + 1} / {images.length}</p>
          </div>

          {/* Schließen */}
          <button onClick={close} aria-label="Schließen" style={{ position: 'fixed', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); goPrev(); }} aria-label="Vorheriges Bild" style={{ position: 'fixed', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onClick={e => { e.stopPropagation(); goNext(); }} aria-label="Nächstes Bild" style={{ position: 'fixed', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
