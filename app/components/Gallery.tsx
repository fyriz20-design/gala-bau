'use client';

import { useState, useEffect, useCallback } from 'react';

/* ── Typ-Definition ──────────────────────────────────────
   Jedes Bild braucht: src, alt
   Optional:           label, description
──────────────────────────────────────────────────────── */
export interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
  description?: string;
}

/* ════════════════════════════════════════════════════════
   Gallery  –  Props
   • images    : Array der Bilder (aus gallery.json oder
                 direkt übergeben)
   • columns   : Spaltenanzahl auf Desktop (default: 3)
════════════════════════════════════════════════════════ */
export default function Gallery({
  images,
  columns = 3,
}: {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const active  = isOpen ? images[activeIndex] : null;

  /* ── Keyboard-Navigation & Scroll-Lock ── */
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
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden'; // kein Scrollen wenn offen
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, goPrev, goNext]);

  return (
    <>
      {/* ════════════════════════════════════════════
          GRID
      ════════════════════════════════════════════ */}
      <div
        className="gallery-grid"
        style={{ '--gallery-cols': columns } as React.CSSProperties}
      >
        {images.map((img, i) => (
          <button
            key={i}
            className="gallery-btn"
            onClick={() => setActiveIndex(i)}
            aria-label={`Bild vergrößern: ${img.alt}`}
          >
            {/* Bild – kein lazy loading, damit Höhe korrekt berechnet wird */}
            <img src={img.src} alt={img.alt} />

            {/* Hover-Overlay */}
            <div className="gallery-btn-overlay">
              {img.label && (
                <span className="gallery-btn-label">{img.label}</span>
              )}
              {img.description && (
                <span className="gallery-btn-desc">{img.description}</span>
              )}
              <span className="gallery-btn-zoom">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                Vergrößern
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════
          LIGHTBOX
      ════════════════════════════════════════════ */}
      {isOpen && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          className="lb-backdrop"
          onClick={close}
        >
          {/* ── Bild-Container (click stoppt Schließen) ── */}
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.alt}
              className="lb-image"
            />

            {/* ── Info unter dem Bild ── */}
            {(active.label || active.description) && (
              <div className="lb-info">
                {active.label && (
                  <span className="lb-label">{active.label}</span>
                )}
                {active.description && (
                  <span className="lb-desc">{active.description}</span>
                )}
              </div>
            )}

            {/* ── Zähler ── */}
            <span className="lb-counter">
              {activeIndex + 1} / {images.length}
            </span>
          </div>

          {/* ── Schließen-Button ── */}
          <button className="lb-close" onClick={close} aria-label="Schließen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* ── Navigations-Buttons ── */}
          {images.length > 1 && (
            <>
              <button
                className="lb-nav lb-nav-prev"
                onClick={e => { e.stopPropagation(); goPrev(); }}
                aria-label="Vorheriges Bild"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button
                className="lb-nav lb-nav-next"
                onClick={e => { e.stopPropagation(); goNext(); }}
                aria-label="Nächstes Bild"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
