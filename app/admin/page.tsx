'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

type GalleryItem = { id: string; src: string; alt: string; label: string; description: string };
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/* ════════════════════════════════════════════════════════
   Passwort-Gate
════════════════════════════════════════════════════════ */
function PasswordGate({ onSuccess }: { onSuccess: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    const res = await fetch('/api/admin/gallery', {
      headers: { 'x-admin-key': pw },
    });
    if (res.ok) {
      sessionStorage.setItem('admin-key', pw);
      onSuccess(pw);
    } else {
      setError(true);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--bg-base)', padding: '2rem',
    }}>
      <div style={{
        width: '100%', maxWidth: '380px',
        backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
        padding: '2.5rem',
      }}>
        {/* Logo-Bereich */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <svg width="36" height="36" viewBox="0 0 30 30" fill="none" style={{ margin: '0 auto 0.75rem' }}>
            <rect x="2"  y="16" width="12" height="12" rx="1" fill="#c9a227" opacity="0.9"/>
            <rect x="16" y="16" width="12" height="12" rx="1" fill="#c9a227" opacity="0.7"/>
            <rect x="9"  y="2"  width="12" height="12" rx="1" fill="#d4b53a"/>
          </svg>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
            GALA<span style={{ color: 'var(--accent-light)' }}>-</span>BAU
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Admin-Bereich</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Passwort
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="••••••••"
              autoFocus
              style={{
                width: '100%', backgroundColor: 'var(--bg-surface)', border: `1px solid ${error ? '#c0392b' : 'var(--border)'}`,
                color: 'var(--text-primary)', padding: '0.75rem 1rem', fontSize: '0.9rem',
                outline: 'none', fontFamily: 'var(--font-sans)',
              }}
            />
            {error && <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.4rem' }}>Falsches Passwort.</p>}
          </div>
          <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
            Anmelden →
          </button>
        </form>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Admin-Hauptbereich
════════════════════════════════════════════════════════ */
function AdminPanel({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [images, setImages]           = useState<GalleryItem[]>([]);
  const [dragActive, setDragActive]   = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview]         = useState<string | null>(null);
  const [label, setLabel]             = useState('');
  const [description, setDescription] = useState('');
  const [alt, setAlt]                 = useState('');
  const [status, setStatus]           = useState<UploadStatus>('idle');
  const [statusMsg, setStatusMsg]     = useState('');
  const [deletingId, setDeletingId]   = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Bilder laden */
  useEffect(() => {
    fetch('/api/admin/gallery', { headers: { 'x-admin-key': adminKey } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setImages(data); });
  }, [adminKey]);

  /* Drag-Events */
  const onDragOver  = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragActive(true); }, []);
  const onDragLeave = useCallback(() => setDragActive(false), []);
  const onDrop      = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) selectFile(file);
  }, []);

  function selectFile(file: File) {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    if (!alt) setAlt(file.name.replace(/\.[^.]+$/, ''));
    setStatus('idle');
  }

  /* Upload */
  async function handleUpload() {
    if (!selectedFile) return;
    setStatus('uploading');
    setStatusMsg('');

    const fd = new FormData();
    fd.append('file', selectedFile);
    fd.append('label', label);
    fd.append('description', description);
    fd.append('alt', alt || label || selectedFile.name);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setImages(data.gallery);
        setSelectedFile(null);
        setPreview(null);
        setLabel('');
        setDescription('');
        setAlt('');
        setStatus('success');
        setStatusMsg('Foto erfolgreich hochgeladen!');
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Upload fehlgeschlagen.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Netzwerkfehler. Bitte erneut versuchen.');
    }
  }

  /* Löschen */
  async function handleDelete(id: string) {
    if (!confirm('Dieses Bild wirklich löschen?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });
      const data = await res.json();
      if (res.ok) setImages(data.gallery);
    } finally {
      setDeletingId(null);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)',
    color: 'var(--text-primary)', padding: '0.7rem 0.9rem', fontSize: '0.875rem',
    outline: 'none', fontFamily: 'var(--font-sans)',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)',
    marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)',
        padding: '1rem 0',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              GALA<span style={{ color: 'var(--accent-light)' }}>-</span>BAU
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.75rem' }}>
              Admin-Bereich
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {images.length} {images.length === 1 ? 'Bild' : 'Bilder'} in der Galerie
            </span>
            <button onClick={onLogout} className="btn-outline" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
              Abmelden
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* ── Upload-Bereich ── */}
        <div style={{
          backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
          padding: '2rem', marginBottom: '2.5rem',
        }}>
          <p style={{ color: 'var(--accent-light)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Neues Foto hochladen
          </p>

          {/* Drop-Zone */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragActive ? 'var(--accent)' : 'var(--border-light)'}`,
              backgroundColor: dragActive ? 'var(--accent-muted)' : 'var(--bg-surface)',
              borderRadius: 0,
              padding: preview ? '0' : '3rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '1.25rem',
              overflow: 'hidden',
              minHeight: preview ? '220px' : undefined,
              position: 'relative',
            }}
          >
            {preview ? (
              /* Vorschau */
              <>
                <img
                  src={preview}
                  alt="Vorschau"
                  style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <span style={{ color: '#fff', fontSize: '0.875rem' }}>Anderes Foto wählen</span>
                </div>
              </>
            ) : (
              /* Leer-Zustand */
              <>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.4rem' }}>
                  Foto hier ablegen
                </p>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
                  oder klicken zum Auswählen · JPG, PNG, WEBP bis 10 MB
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) selectFile(f); }}
          />

          {/* Metadaten-Felder */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Kategorie / Label</label>
              <input style={inputStyle} placeholder="z. B. Bausanierung" value={label} onChange={e => setLabel(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Alt-Text (für Suchmaschinen)</label>
              <input style={inputStyle} placeholder="Kurze Bildbeschreibung" value={alt} onChange={e => setAlt(e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Kurzbeschreibung (erscheint in der Lightbox)</label>
            <input style={inputStyle} placeholder="z. B. Sanierung eines Altbaus in Albstadt-Ebingen" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          {/* Upload-Button & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || status === 'uploading'}
              className="btn-primary"
              style={{ opacity: (!selectedFile || status === 'uploading') ? 0.6 : 1, cursor: (!selectedFile || status === 'uploading') ? 'not-allowed' : 'pointer' }}
            >
              {status === 'uploading' ? 'Wird hochgeladen …' : 'Foto hochladen →'}
            </button>

            {statusMsg && (
              <span style={{ fontSize: '0.875rem', color: status === 'success' ? 'var(--accent-light)' : '#e74c3c' }}>
                {status === 'success' ? '✓ ' : '⚠ '}{statusMsg}
              </span>
            )}
          </div>
        </div>

        {/* ── Galerie-Übersicht ── */}
        <div>
          <p style={{ color: 'var(--accent-light)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Aktuelle Galerie
          </p>

          {images.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', border: '1px dashed var(--border)' }}>
              Noch keine Bilder hochgeladen.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {images.map(img => (
                <div key={img.id} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                    <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '0.875rem' }}>
                    {img.label && (
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{img.label}</p>
                    )}
                    {img.description && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{img.description}</p>
                    )}
                    <button
                      onClick={() => handleDelete(img.id)}
                      disabled={deletingId === img.id}
                      style={{
                        width: '100%', backgroundColor: 'transparent', border: '1px solid #c0392b33',
                        color: '#e74c3c', padding: '0.45rem', fontSize: '0.75rem', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                        opacity: deletingId === img.id ? 0.6 : 1,
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c0392b22')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {deletingId === img.id ? 'Wird gelöscht …' : '✕ Löschen'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Haupt-Export
════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  // Gespeichertes Passwort aus Session laden
  useEffect(() => {
    const stored = sessionStorage.getItem('admin-key');
    if (stored) {
      fetch('/api/admin/gallery', { headers: { 'x-admin-key': stored } })
        .then(r => { if (r.ok) setAdminKey(stored); });
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem('admin-key');
    setAdminKey(null);
  }

  if (!adminKey) {
    return <PasswordGate onSuccess={setAdminKey} />;
  }

  return <AdminPanel adminKey={adminKey} onLogout={handleLogout} />;
}
