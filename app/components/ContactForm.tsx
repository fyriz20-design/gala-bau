'use client';

import { useState } from 'react';
import config from '@/data/config.json';

const { company } = config;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

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
  }

  const inputStyle: React.CSSProperties = {
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

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Erfolgs-/Fehlermeldung */}
      {status === 'success' && (
        <div style={{
          backgroundColor: 'var(--accent-muted)',
          border: '1px solid var(--accent-dark)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.25rem' }}>✅</span>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
            <strong>Vielen Dank!</strong> Ihre Nachricht wurde gesendet. Wir melden uns bald bei Ihnen.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div style={{
          backgroundColor: 'rgba(180,40,40,0.1)',
          border: '1px solid rgba(180,40,40,0.4)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.25rem' }}>⚠️</span>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
            Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.
          </p>
        </div>
      )}

      {/* Formular */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <div className="form-grid-2">
          <div>
            <label style={labelStyle} htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Max Mustermann"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="email">E-Mail *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={company.email}
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle} htmlFor="message">Ihre Nachricht *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Beschreiben Sie kurz Ihr Projekt – z. B. Gartengestaltung, Terrasse, Pflasterarbeiten..."
            value={form.message}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary"
          style={{
            justifyContent: 'center',
            opacity: status === 'sending' ? 0.7 : 1,
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'sending' ? 'Wird gesendet …' : 'Anfrage absenden →'}
        </button>
      </form>

    </div>
  );
}
