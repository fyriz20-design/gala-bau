'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#home', label: 'Start' },
  { href: '#ueber-uns', label: 'Über uns' },
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#galerie', label: 'Referenzen' },
  { href: '#kontakt', label: 'Kontakt' },
];

const leistungen = [
  { titel: 'Pflaster- & Erdarbeiten', text: 'Fachgerechtes Verlegen von Einfahrten, Terrassen und Gartenwegen inklusive Baggerarbeiten.' },
  { titel: 'Gartengestaltung', text: 'Von der Geländemodellierung bis zur professionellen Bepflanzung und Rasenanlage.' },
  { titel: 'Gartenpflege', text: 'Hecken-, Strauch- und Baumschnitt sowie regelmäßige Gartenpflege für Ihren Außenbereich.' },
  { titel: 'Zaunbau', text: 'Lieferung und Montage von Sichtschutz, Doppelstabmatten- und Holzzäunen.' },
  { titel: 'Entwässerung', text: 'Professionelle Lösungen für Entwässerungsrinnen, Zisternen und Grundstücksentwässerung.' },
  { titel: 'Terrassenbau', text: 'Planung und Bau von Holz-, WPC- und Natursteinterrassen sowie Außentreppen in dauerhafter Qualität.' },
];

const stats = [
  { zahl: '10+', label: 'Jahre Erfahrung' },
  { zahl: '200+', label: 'Projekte' },
  { zahl: '100%', label: 'Engagement' },
];

export default function Home() {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  useEffect(() => {
    const handleScroll = () => setNavbarScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setImages(data.urls || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="bg-[#F7F9F6] text-[#1A1D1A] font-sans antialiased selection:bg-[#607762] selection:text-white scroll-smooth">

      {/* ─── HEADER ─── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 lg:px-16 ${
          navbarScrolled
            ? 'bg-[#1A1D1A]/90 backdrop-blur-md border-b border-[#C5A880]/20 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-light tracking-widest text-white uppercase">
            gala<span className="text-[#C5A880] font-medium">.</span>bau
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wider uppercase text-gray-300">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-[#C5A880] transition-colors">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="/admin"
              className="border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1D1A] text-xs tracking-widest uppercase font-medium py-3 px-6 transition-all rounded-sm"
            >
              Admin-Bereich
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col pt-4 pb-6 gap-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-[#C5A880] text-sm font-medium tracking-wider uppercase transition-colors py-3 border-b border-white/5"
              >
                {label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="mt-4 border border-[#C5A880] text-[#C5A880] text-xs tracking-widest uppercase font-medium py-3 px-6 text-center rounded-sm"
            >
              Admin-Bereich
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-[#1A1D1A] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <span className="text-[#C5A880] text-xs lg:text-sm tracking-[0.3em] uppercase font-medium block mb-4">
            Exklusive Handwerkskunst
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight mb-6">
            GaLaBau O.JF
            <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-[#C5A880]">
              Garten- & Landschaftsbau
            </span>
          </h1>
          <a
            href="#kontakt"
            className="bg-[#607762] hover:bg-[#475849] text-white text-xs tracking-widest uppercase font-medium py-4 px-8 transition-all inline-block rounded-sm shadow-lg"
          >
            Termin vereinbaren
          </a>
        </div>
      </section>

      {/* ─── ÜBER UNS ─── */}
      <section id="ueber-uns" className="py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#607762] text-xs tracking-[0.2em] uppercase font-semibold block mb-3">
              Unser Unternehmen
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#1A1D1A] mb-6">Über uns</h2>
            <div className="w-12 h-[1px] bg-[#C5A880] mb-8"></div>
            <p className="text-gray-500 font-light leading-relaxed mb-4">
              GaLaBau O.JF ist Ihr verlässlicher Partner für Garten- und Landschaftsbau in Albstadt und der gesamten
              Zollernalb-Region. Mit Leidenschaft für handwerkliche Qualität und einem Blick für Ästhetik gestalten
              wir Außenbereiche, die begeistern.
            </p>
            <p className="text-gray-500 font-light leading-relaxed mb-8">
              Als inhabergeführter Betrieb legen wir größten Wert auf persönliche Betreuung, termingerechte
              Ausführung und transparente Kommunikation – von der ersten Beratung bis zur Fertigstellung Ihres
              Projekts.
            </p>
            <a
              href="#kontakt"
              className="inline-block border border-[#1A1D1A] text-[#1A1D1A] hover:bg-[#1A1D1A] hover:text-white text-xs tracking-widest uppercase font-medium py-3 px-6 transition-all rounded-sm"
            >
              Jetzt kontaktieren
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {stats.map(({ zahl, label }) => (
              <div
                key={label}
                className="bg-white border border-gray-100 p-8 text-center shadow-sm hover:border-[#C5A880]/40 transition-all"
              >
                <span className="text-3xl font-extralight text-[#1A1D1A] block mb-2">{zahl}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEISTUNGEN ─── */}
      <section id="leistungen" className="py-24 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#607762] text-xs tracking-[0.2em] uppercase font-semibold block mb-3">
              Meisterbetreuung
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#1A1D1A] mb-4">Unsere Leistungen</h2>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leistungen.map((item, i) => (
              <div
                key={i}
                className="bg-[#F7F9F6] p-10 border border-gray-100 hover:border-[#C5A880]/30 transition-all group shadow-sm"
              >
                <h3 className="text-xl font-medium mb-4 text-[#1A1D1A]">{item.titel}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERIE ─── */}
      <section id="galerie" className="py-24 lg:py-32 bg-[#1A1D1A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="mb-16">
            <span className="text-[#C5A880] text-xs tracking-[0.2em] uppercase font-semibold block mb-3">
              Ausgewählte Projekte
            </span>
            <h2 className="text-3xl md:text-4xl font-light">Referenzen & Inspirationen</h2>
          </div>
          {images.length === 0 ? (
            <p className="text-gray-500 font-light text-sm">Noch keine Bilder hochgeladen.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((url, index) => (
                <div key={index} className="group relative overflow-hidden h-80 bg-gray-900 rounded-sm">
                  <img
                    src={url}
                    alt={`Referenz ${index}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D1A] via-transparent to-transparent opacity-80"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── KONTAKT ─── */}
      <section id="kontakt" className="py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-light mb-6 uppercase tracking-wider">Kontakt</h2>
            <p className="text-gray-600 mb-6">
              Sie planen ein Projekt im Garten oder rund ums Haus? Lassen Sie uns unverbindlich darüber sprechen!
            </p>
            <div className="space-y-2 text-sm text-[#1A1D1A]">
              <p className="font-bold">GaLaBau O.JF</p>
              <p>Am Stöcken 8</p>
              <p>72458 Albstadt-Ebingen</p>
              <p className="pt-4">
                Tel:{' '}
                <a href="tel:+491607546537" className="text-[#607762] hover:underline">
                  0160 / 75 46 537
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-[#607762]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-[#607762]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-light text-[#1A1D1A] mb-2">Vielen Dank!</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei Ihnen.
                </p>
                <button
                  onClick={() => setFormStatus(null)}
                  className="mt-6 text-xs text-[#607762] hover:underline uppercase tracking-wider"
                >
                  Weitere Nachricht senden
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Ihr Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#F7F9F6] border-b border-gray-200 focus:border-[#607762] py-3 px-4 text-sm outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Ihre E-Mail"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F7F9F6] border-b border-gray-200 focus:border-[#607762] py-3 px-4 text-sm outline-none transition-colors"
                />
                <textarea
                  placeholder="Ihre Nachricht"
                  rows="4"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#F7F9F6] border-b border-gray-200 focus:border-[#607762] py-3 px-4 text-sm outline-none transition-colors resize-none"
                ></textarea>

                {formStatus === 'error' && (
                  <p className="text-red-500 text-xs">
                    Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full bg-[#1A1D1A] hover:bg-[#607762] text-white text-xs uppercase font-medium py-4 transition-all disabled:bg-gray-400"
                >
                  {formStatus === 'loading' ? 'Wird gesendet...' : 'Absenden'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
