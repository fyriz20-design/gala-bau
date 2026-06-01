'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

/* ── Typen ───────────────────────────────────────────── */
type GalleryItem = { id: string; src: string; alt: string; label: string; description: string };

type PendingFile = {
  id: string;          // temporäre Client-ID
  file: File;
  preview: string;     // Objekt-URL für Vorschau
  label: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  errorMsg?: string;
};

/* ── Hilfsfunktionen ─────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2);

/* ════════════════════════════════════════════════════════
   Passwort-Gate
════════════════════════════════════════════════════════ */
function PasswordGate({ onSuccess }: { onSuccess: (pw: string) => void }) {
  const [pw, setPw]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch('/api/admin/gallery', { headers: { 'x-admin-key': pw } });
    setLoading(false);
    if (res.ok) { sessionStorage.setItem('admin-key', pw); onSuccess(pw); }
    else setError(true);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f0f0f', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '360px', backgroundColor: '#242424', border: '1px solid #2e2e2e', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f0f0f0', letterSpacing: '0.04em', fontFamily: 'Georgia, serif' }}>
            GALA<span style={{ color: '#d4b53a' }}>-</span>BAU
          </div>
          <p style={{ color: '#8a8a8a', fontSize: '0.8rem', marginTop: '0.4rem' }}>Admin-Bereich</p>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#8a8a8a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Passwort
            </label>
            <input
              type="password" autoFocus value={pw} onChange={e => setPw(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', backgroundColor: '#1a1a1a', border: `1px solid ${error ? '#c0392b' : '#2e2e2e'}`, color: '#f0f0f0', padding: '0.75rem 1rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
            />
            {error && <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.4rem' }}>Falsches Passwort.</p>}
          </div>
          <button type="submit" disabled={loading} style={{ backgroundColor: '#c9a227', color: '#fff', border: 'none', padding: '0.875rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Prüfe …' : 'Anmelden →'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Haupt-Admin-Panel
════════════════════════════════════════════════════════ */
function AdminPanel({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  /* ── Galerie-State ── */
  const [images, setImages]       = useState<GalleryItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  /* ── Upload-Queue ── */
  const [queue, setQueue]         = useState<PendingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ done: 0, total: 0 });
  const [dragActive, setDragActive] = useState(false);

  /* ── Auswahl (Bulk-Delete) ── */
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Bilder laden ── */
  const loadImages = useCallback(() => {
    setLoadingImages(true);
    fetch('/api/admin/gallery', { headers: { 'x-admin-key': adminKey } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setImages(data); })
      .finally(() => setLoadingImages(false));
  }, [adminKey]);

  useEffect(() => { loadImages(); }, [loadImages]);

  /* ── Dateien zur Queue hinzufügen ── */
  function addFiles(files: FileList | File[]) {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    const newItems: PendingFile[] = imageFiles.map(f => ({
      id: uid(), file: f,
      preview: URL.createObjectURL(f),
      label: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      status: 'pending',
    }));
    setQueue(prev => [...prev, ...newItems]);
  }

  /* ── Drag & Drop ── */
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = () => setDragActive(false);
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault(); setDragActive(false);
    addFiles(e.dataTransfer.files);
  };

  /* ── Alle Dateien hochladen ── */
  async function uploadAll() {
    const pending = queue.filter(f => f.status === 'pending');
    if (!pending.length) return;
    setIsUploading(true);
    setUploadProgress({ done: 0, total: pending.length });

    for (const item of pending) {
      setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'uploading' } : f));
      try {
        const fd = new FormData();
        fd.append('file', item.file);
        fd.append('label', item.label);
        fd.append('alt', item.label || item.file.name);
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-admin-key': adminKey },
          body: fd,
        });
        if (res.ok) {
          const data = await res.json();
          setImages(data.gallery ?? []);
          setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'done' } : f));
        } else {
          setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', errorMsg: 'Fehler beim Upload' } : f));
        }
      } catch {
        setQueue(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', errorMsg: 'Netzwerkfehler' } : f));
      }
      setUploadProgress(p => ({ ...p, done: p.done + 1 }));
    }
    setIsUploading(false);
  }

  /* ── Queue bereinigen ── */
  function clearDone() {
    setQueue(prev => {
      prev.filter(f => f.status === 'done' || f.status === 'pending').forEach(f => URL.revokeObjectURL(f.preview));
      return prev.filter(f => f.status !== 'done');
    });
  }

  /* ── Einzeln löschen ── */
  async function deleteOne(id: string) {
    if (!confirm('Dieses Bild wirklich löschen?')) return;
    await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
      method: 'DELETE', headers: { 'x-admin-key': adminKey },
    });
    setImages(prev => prev.filter(i => i.id !== id));
    setSelected(prev => { const next = new Set(prev); next.delete(id); return next; });
  }

  /* ── Bulk-Delete ── */
  async function deleteSelected() {
    if (!confirm(`${selected.size} Bild(er) wirklich löschen?`)) return;
    setBulkDeleting(true);
    const res = await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.from(selected) }),
    });
    if (res.ok) {
      const data = await res.json();
      setImages(data.gallery ?? []);
      setSelected(new Set());
    }
    setBulkDeleting(false);
  }

  /* ── Auswahl-Helfer ── */
  const toggleSelect = (id: string) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const selectAll = () => setSelected(new Set(images.map(i => i.id)));
  const deselectAll = () => setSelected(new Set());
  const allSelected = images.length > 0 && selected.size === images.length;

  /* ── Styles ── */
  const S = {
    card: { backgroundColor: '#242424', border: '1px solid #2e2e2e', padding: '1.5rem' } as React.CSSProperties,
    label: { display: 'block', fontSize: '0.75rem', color: '#8a8a8a', marginBottom: '0.35rem', textTransform: 'uppercase' as const, letterSpacing: '0.06em' },
    input: { width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e', color: '#f0f0f0', padding: '0.6rem 0.8rem', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' } as React.CSSProperties,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', paddingBottom: '4rem' }}>

      {/* ── Header ── */}
      <div style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2e2e2e', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#f0f0f0', fontWeight: 700 }}>
              GALA<span style={{ color: '#d4b53a' }}>-</span>BAU
            </span>
            <span style={{ color: '#555', fontSize: '0.8rem', marginLeft: '0.75rem' }}>/ Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/" style={{ color: '#8a8a8a', fontSize: '0.8rem', textDecoration: 'none' }}>← Zur Website</a>
            <button onClick={onLogout} style={{ backgroundColor: 'transparent', border: '1px solid #2e2e2e', color: '#8a8a8a', padding: '0.45rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}>
              Abmelden
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', display: 'grid', gap: '2rem' }}>

        {/* ══════════════════════════════════════════════
            SEKTION 1: BILDER HOCHLADEN
        ══════════════════════════════════════════════ */}
        <section>
          <h2 style={{ color: '#d4b53a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Bilder hochladen
          </h2>
          <div style={S.card}>

            {/* Drop-Zone */}
            <div
              onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragActive ? '#c9a227' : '#3a3a3a'}`,
                backgroundColor: dragActive ? 'rgba(201,162,39,0.06)' : '#1a1a1a',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={dragActive ? '#c9a227' : '#555'} strokeWidth="1.5" style={{ margin: '0 auto 0.75rem', display: 'block' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p style={{ color: '#8a8a8a', fontWeight: 500 }}>Fotos hier ablegen</p>
              <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.3rem' }}>oder klicken zum Auswählen · Mehrere Bilder gleichzeitig möglich · JPG, PNG, WEBP</p>
            </div>
            <input
              ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }}
              onChange={e => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }}
            />

            {/* Upload-Queue */}
            {queue.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <p style={{ color: '#8a8a8a', fontSize: '0.8rem' }}>
                    {queue.filter(f => f.status === 'done').length}/{queue.length} hochgeladen
                    {isUploading && ` – lädt hoch (${uploadProgress.done}/${uploadProgress.total}) …`}
                  </p>
                  <button onClick={clearDone} style={{ background: 'none', border: 'none', color: '#555', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Erledigte entfernen
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {queue.map(item => (
                    <div key={item.id} style={{ backgroundColor: '#1a1a1a', border: `1px solid ${item.status === 'error' ? '#c0392b55' : item.status === 'done' ? '#2d5a1b55' : '#2e2e2e'}`, overflow: 'hidden' }}>
                      {/* Vorschau */}
                      <div style={{ position: 'relative', paddingTop: '66%', overflow: 'hidden' }}>
                        <img src={item.preview} alt={item.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: item.status === 'uploading' ? 0.5 : 1, transition: 'opacity 0.2s' }} />
                        {/* Status-Badge */}
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: item.status === 'done' ? '#27ae60' : item.status === 'error' ? '#c0392b' : item.status === 'uploading' ? '#c9a227' : '#333', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.4rem', fontWeight: 700 }}>
                          {item.status === 'done' ? '✓' : item.status === 'error' ? '✕' : item.status === 'uploading' ? '…' : '⏳'}
                        </div>
                        {/* Aus Queue entfernen */}
                        {item.status !== 'uploading' && (
                          <button
                            onClick={e => { e.stopPropagation(); URL.revokeObjectURL(item.preview); setQueue(prev => prev.filter(f => f.id !== item.id)); }}
                            style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                          >✕</button>
                        )}
                      </div>
                      {/* Label-Feld */}
                      <div style={{ padding: '0.6rem' }}>
                        <input
                          value={item.label}
                          onChange={e => setQueue(prev => prev.map(f => f.id === item.id ? { ...f, label: e.target.value } : f))}
                          placeholder="Kategorie / Label"
                          disabled={item.status === 'uploading' || item.status === 'done'}
                          style={{ ...S.input, fontSize: '0.8rem', padding: '0.45rem 0.6rem' }}
                        />
                        {item.errorMsg && <p style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: '0.25rem' }}>{item.errorMsg}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upload-Button */}
                <button
                  onClick={uploadAll}
                  disabled={isUploading || !queue.some(f => f.status === 'pending')}
                  style={{ backgroundColor: '#c9a227', color: '#fff', border: 'none', padding: '0.875rem 2rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: isUploading ? 'not-allowed' : 'pointer', opacity: isUploading || !queue.some(f => f.status === 'pending') ? 0.6 : 1 }}
                >
                  {isUploading
                    ? `Hochladen … (${uploadProgress.done}/${uploadProgress.total})`
                    : `${queue.filter(f => f.status === 'pending').length} Bild(er) hochladen →`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SEKTION 2: GALERIE VERWALTEN
        ══════════════════════════════════════════════ */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ color: '#d4b53a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Galerie verwalten · {images.length} Bild{images.length !== 1 ? 'er' : ''}
            </h2>

            {/* Auswahl-Aktionen */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {images.length > 0 && (
                <button onClick={allSelected ? deselectAll : selectAll} style={{ background: 'none', border: '1px solid #3a3a3a', color: '#8a8a8a', padding: '0.45rem 0.9rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  {allSelected ? 'Auswahl aufheben' : 'Alle auswählen'}
                </button>
              )}
              {selected.size > 0 && (
                <button
                  onClick={deleteSelected}
                  disabled={bulkDeleting}
                  style={{ backgroundColor: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.5)', color: '#e74c3c', padding: '0.45rem 0.9rem', fontSize: '0.8rem', cursor: 'pointer', opacity: bulkDeleting ? 0.6 : 1 }}
                >
                  {bulkDeleting ? 'Wird gelöscht …' : `${selected.size} löschen`}
                </button>
              )}
            </div>
          </div>

          <div style={S.card}>
            {loadingImages ? (
              <p style={{ color: '#555', textAlign: 'center', padding: '2rem' }}>Lädt …</p>
            ) : images.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#555', border: '1px dashed #2e2e2e' }}>
                <p>Noch keine Bilder hochgeladen.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>Ziehen Sie Fotos in den Bereich oben oder klicken Sie auf „Auswählen".</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {images.map(img => {
                  const isSel = selected.has(img.id);
                  return (
                    <div
                      key={img.id}
                      style={{ backgroundColor: '#1a1a1a', border: `2px solid ${isSel ? '#c9a227' : '#2e2e2e'}`, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s' }}
                      onClick={() => toggleSelect(img.id)}
                    >
                      {/* Bild */}
                      <div style={{ position: 'relative', paddingTop: '75%' }}>
                        <img src={img.src} alt={img.alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        {/* Checkbox */}
                        <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', width: '20px', height: '20px', backgroundColor: isSel ? '#c9a227' : 'rgba(0,0,0,0.6)', border: `2px solid ${isSel ? '#c9a227' : 'rgba(255,255,255,0.4)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isSel && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2"><polyline points="2 6 5 9 10 3"/></svg>}
                        </div>
                      </div>
                      {/* Info + Löschen */}
                      <div style={{ padding: '0.6rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ overflow: 'hidden' }}>
                          {img.label && <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0f0f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.label}</p>}
                          <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.1rem' }}>Klicken zum Auswählen</p>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); deleteOne(img.id); }}
                          title="Löschen"
                          style={{ flexShrink: 0, backgroundColor: 'transparent', border: '1px solid #3a3a3a', color: '#e74c3c', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Root-Export mit Auth-State
════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin-key');
    if (stored) {
      fetch('/api/admin/gallery', { headers: { 'x-admin-key': stored } })
        .then(r => { if (r.ok) setAdminKey(stored); });
    }
  }, []);

  function handleLogout() { sessionStorage.removeItem('admin-key'); setAdminKey(null); }

  if (!adminKey) return <PasswordGate onSuccess={setAdminKey} />;
  return <AdminPanel adminKey={adminKey} onLogout={handleLogout} />;
}
