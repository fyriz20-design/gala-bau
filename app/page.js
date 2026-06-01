'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setImages(data.urls || []));
  }, []);

  return (
    <div className="bg-[#F7F9F6] text-[#1A1D1A] font-sans antialiased selection:bg-[#607762] selection:text-white scroll-smooth">
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 lg:px-16 ${navbarScrolled ? 'bg-[#1A1D1A]/85 backdrop-blur-md border-b border-[#C5A880]/20 py-4' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-light tracking-widest text-white uppercase">
            gala<span className="text-[#C5A880] font-medium">.</span>bau
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wider uppercase text-gray-300">
            <a href="#home" className="hover:text-[#C5A880] transition-colors">Start</a>
            <a href="#leistungen" className="hover:text-[#C5A880] transition-colors">Leistungen</a>
            <a href="#galerie" className="hover:text-[#C5A880] transition-colors">Referenzen</a>
            <a href="#kontakt" className="hover:text-[#C5A880] transition-colors">Kontakt</a>
          </nav>
          <div className="hidden md:block">
            <a href="/admin" className="border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1D1A] text-xs tracking-widest uppercase font-medium py-3 px-6 transition-all rounded-sm">
              Admin-Bereich
            </a>
          </div>
        </div>
      </header>

      <section id="home" className="relative h-screen flex items-center justify-center bg-[#1A1D1A] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <span className="text-[#C5A880] text-xs lg:text-sm tracking-[0.3em] uppercase font-medium block mb-4">Exklusive Handwerkskunst</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight mb-6">
            GaLaBau O.JF<br/><span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-[#C5A880]">Garten- & Landschaftsbau</span>
          </h1>
          <a href="#kontakt" className="bg-[#607762] hover:bg-[#475849] text-white text-xs tracking-widest uppercase font-medium py-4 px-8 transition-all inline-block rounded-sm shadow-lg">
            Termin vereinbaren
          </a>
        </div>
      </section>

      <section id="leistungen" className="py-24 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#607762] text-xs tracking-[0.2em] uppercase font-semibold block mb-3">Meisterbetreuung</span>
          <h2 className="text-3xl md:text-4xl font-light text-[#1A1D1A] mb-4">Unsere Leistungen</h2>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { titel: 'Pflaster- & Erdarbeiten', text: 'Fachgerechtes Verlegen von Einfahrten, Terrassen und Gartenwegen inklusive Baggerarbeiten.' },
            { titel: 'Gartengestaltung', text: 'Von der Geländemodellierung bis zur professionellen Bepflanzung und Rasenanlage.' },
            { titel: 'Gartenpflege', text: 'Hecken-, Strauch- und Baumschnitt sowie regelmäßige Gartenpflege für Ihren Außenbereich.' },
            { titel: 'Zaunbau', text: 'Lieferung und Montage von Sichtschutz, Doppelstabmatten- und Holzzäunen.' },
            { titel: 'Entwässerung', text: 'Professionelle Lösungen für Entwässerungsrinnen, Zisternen und Grundstücksentwässerung.' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 border border-gray-100 hover:border-[#C5A880]/30 transition-all group shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1D1A]">{item.titel}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="galerie" className="py-24 lg:py-32 bg-[#1A1D1A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="mb-16">
            <span className="text-[#C5A880] text-xs tracking-[0.2em] uppercase font-semibold block mb-3">Ausgewählte Projekte</span>
            <h2 className="text-3xl md:text-4xl font-light">Referenzen & Inspirationen</h2>
          </div>
          {images.length === 0 ? (
            <p className="text-gray-500 font-light text-sm">Noch keine Bilder hochgeladen.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((url, index) => (
                <div key={index} className="group relative overflow-hidden h-80 bg-gray-900 rounded-sm">
                  <img src={url} alt={`Referenz ${index}`} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D1A] via-transparent to-transparent opacity-80"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="kontakt" className="py-24 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-light mb-6 uppercase tracking-wider">Kontakt</h2>
          <p className="text-gray-600 mb-6">Sie planen ein Projekt im Garten oder rund ums Haus? Lassen Sie uns unverbindlich darüber sprechen!</p>
          <div className="space-y-2 text-sm text-[#1A1D1A]">
            <p className="font-bold">GaLaBau O.JF</p>
            <p>Am Stöcken 8</p>
            <p>72458 Albstadt-Ebingen</p>
            <p className="pt-4">Tel: <a href="tel:+491607546537" className="text-[#607762] hover:underline">0160 / 75 46 537</a></p>
          </div>
        </div>
        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
          <form className="space-y-6">
            <input type="text" placeholder="Ihr Name" className="w-full bg-[#F7F9F6] border-b border-gray-200 py-3 px-4 text-sm outline-none" />
            <input type="email" placeholder="Ihre E-Mail" className="w-full bg-[#F7F9F6] border-b border-gray-200 py-3 px-4 text-sm outline-none" />
            <textarea placeholder="Ihre Nachricht" rows="4" className="w-full bg-[#F7F9F6] border-b border-gray-200 py-3 px-4 text-sm outline-none"></textarea>
            <button type="submit" className="w-full bg-[#1A1D1A] hover:bg-[#607762] text-white text-xs uppercase font-medium py-4 transition-all">Absenden</button>
          </form>
        </div>
      </section>
    </div>
  );
}