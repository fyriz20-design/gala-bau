'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-muted)',
            border: '1px solid var(--accent-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.5rem',
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 300, marginBottom: '0.5rem' }}>
          Vielen Dank!
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei Ihnen.
        </p>
        <button
          onClick={() => setStatus(null)}
          style={{
            marginTop: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--accent-light)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Weitere Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Vorname</label>
          <input
            type="text"
            placeholder="Max"
            required
            value={form.name.split(' ')[0] || ''}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Nachname</label>
          <input
            type="text"
            placeholder="Mustermann"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>E-Mail</label>
        <input
          type="email"
          placeholder="max@beispiel.de"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Ihre Nachricht</label>
        <textarea
          rows={5}
          placeholder="Beschreiben Sie kurz Ihr Projekt..."
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#e05252', fontSize: '0.85rem' }}>
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary"
        style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.6 : 1 }}
      >
        {status === 'loading' ? 'Wird gesendet...' : 'Anfrage absenden →'}
      </button>
    </form>
  );
}
