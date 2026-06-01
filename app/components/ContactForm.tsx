'use client';

import { useState } from 'react';
import config from '@/data/config.json';

const { company } = config;

type Status = 'idle' | 'sending' | 'success' | 'error';
type Vorhaben = 'Umbau' | 'Anbau' | 'Neubau' | 'Sanierung' | 'Sonstiges';

const VORHABEN_OPTIONS: { value: Vorhaben; label: string; emoji: string }[] = [
  { value: 'Umbau',     label: 'Umbau',     emoji: '🏗️' },
  { value: 'Anbau',     label: 'Anbau',     emoji: '🏠' },
  { value: 'Neubau',    label: 'Neubau',    emoji: '🏡' },
  { value: 'Sanierung', label: 'Sanierung', emoji: '🔨' },
  { value: 'Sonstiges', label: 'Sonstiges', emoji: '💬' },
];

export default function ContactForm() {
  const [vorhaben, setVorhaben] = useState<Vorhaben | ''>('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vorhaben) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vorhaben, ...form }),
      });

      if (res.ok) {
        setStatus('success');
        setVorhaben('');
        setForm({ name: '', email: '', phone: '', message: '' });
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

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

        {/* ── Vorhaben-Auswahl ── */}
        <div>
          <label style={labelStyle}>Um welches Vorhaben geht es? *</label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '0.6rem',
          }}>
            {VORHABEN_OPTIONS.map((opt) => {
              const isActive = vorhaben === opt.value;
              return (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.7rem 1rem',
                    backgroundColor: isActive ? 'var(--accent-muted)' : 'var(--bg-card)',
                    border: `1px solid ${isActive ? 'var(--accent-dark)' : 'var(--border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontSize: '0.875rem',
                    color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <input
                    type="radio"
                    name="vorhaben"
                    value={opt.value}
                    checked={isActive}
                    onChange={() => setVorhaben(opt.value)}
                    style={{ display: 'none' }}
                  />
                  <span style={{ fontSize: '1rem' }}>{opt.emoji}</span>
                  {opt.label}
                </label>
              );
            })}
          </div>
          {!vorhaben && status !== 'idle' && (
            <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.4rem' }}>
              Bitte wählen Sie ein Vorhaben aus.
            </p>
          )}
        </div>

        {/* ── Name + E-Mail ── */}
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

        {/* ── Telefon ── */}
        <div>
          <label style={labelStyle} htmlFor="phone">Telefon (optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={company.phone}
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* ── Nachricht ── */}
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
          disabled={status === 'sending' || !vorhaben}
          className="btn-primary"
          style={{
            justifyContent: 'center',
            opacity: status === 'sending' || !vorhaben ? 0.7 : 1,
            cursor: status === 'sending' || !vorhaben ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'sending' ? 'Wird gesendet …' : 'Anfrage absenden →'}
        </button>
      </form>
    </div>
  );
}
