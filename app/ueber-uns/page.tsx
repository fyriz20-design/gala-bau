import config from "@/data/config.json";
import Link from "next/link";
import type { Metadata } from "next";
import Gallery from "@/app/components/Gallery";
import { getGallery } from "@/lib/gallery-store";
import staticImages from "@/data/gallery.json";

export const metadata: Metadata = {
  title: "Über uns – " + config.company.name,
  description:
    "Lernen Sie das Team hinter GaLaBau O.JF kennen. Fachbetrieb für Bausanierung, Malerarbeiten und Spachtelarbeiten in Albstadt-Ebingen – regional, persönlich, präzise.",
};

const { company } = config;
const yearsOfExp = parseInt(new Date().getFullYear().toString()) - parseInt(company.founded);

// Seite ist async → lädt Bilder live aus dem Admin-Bereich
export default async function UeberUnsPage() {
  // Admin-Bilder holen; Fallback auf statische Platzhalter
  let galleryImages: typeof staticImages = [];
  try {
    const live = await getGallery();
    galleryImages = live.length > 0 ? live : staticImages;
  } catch {
    galleryImages = staticImages;
  }

/* ── Team ── */
const team = [
  {
    name: "O.JF – Inhaber",
    role: "Inhaber & Handwerksmeister",
    desc: "Gründer und treibende Kraft hinter GaLaBau O.JF. Mit handwerklicher Präzision und einem untrüglichen Sinn für Qualität leitet er jeden Auftrag persönlich.",
    initials: "OJ",
  },
  {
    name: "Bauleitung",
    role: "Projektleitung & Ausführung",
    desc: "Unsere erfahrenen Fachkräfte koordinieren Bausanierungen, Malerarbeiten und Spachtelarbeiten – termingerecht und auf höchstem Niveau.",
    initials: "BL",
  },
  {
    name: "Kundenbetreuung",
    role: "Beratung & Aufmaß",
    desc: "Vom ersten Gespräch bis zur Abnahme: persönliche Beratung, transparente Kostenvoranschläge und ein direkter Ansprechpartner für alle Fragen.",
    initials: "KB",
  },
];

/* ── Werte ── */
const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Qualität",
    desc: "Wir verwenden ausschließlich hochwertige Materialien und arbeiten nach den aktuellen Qualitätsstandards der Branche.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Verlässlichkeit",
    desc: "Vereinbarte Termine und Budgets halten wir ein – das ist für uns nicht verhandelbar.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    title: "Nachhaltigkeit",
    desc: "Ressourcenschonendes Arbeiten und ökologische Materialien sind für uns selbstverständlich.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Regional",
    desc: "Als lokaler Betrieb aus Albstadt-Ebingen kennen wir die Region und ihre Bauten genau – das macht den Unterschied.",
  },
];

/* ════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Page Header ── */}
      <section
        style={{
          position: "relative",
          padding: "6rem 0 4rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.25)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Wer wir sind
          </p>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" }}>
            Über uns
          </h1>
          <p style={{ color: "rgba(240,240,240,0.7)", maxWidth: "540px", lineHeight: 1.7 }}>
            Ihr Fachbetrieb für Bausanierung, Malerarbeiten und Spachtelqualität
            in Albstadt-Ebingen und Umgebung – seit {company.founded}.
          </p>
        </div>
      </section>

      {/* ── Haupttext ── */}
      <section className="section">
        <div className="container grid-2col">
          {/* Text links */}
          <div>
            <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Unsere Geschichte
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", margin: "0.5rem 0" }}>
              Seit {company.founded} für Ihre Außenanlagen
            </h2>
            <div className="divider" />

            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              Was als kleiner Familienbetrieb begann, ist heute ein eingespieltes Team aus erfahrenen
              Handwerkern, das jährlich zahlreiche Sanierungs- und Renovierungsprojekte in der Region
              erfolgreich abschließt. Gegründet im Jahr {company.founded}, haben wir uns von Anfang an
              auf kompromisslose Qualität und persönlichen Service konzentriert.
            </p>

            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              Ob Bausanierung, Malerarbeiten, Verputz- oder Spachtelarbeiten nach Q1 bis Q4 –
              jede Oberfläche, die wir bearbeiten, ist ein Ausdruck unseres Anspruchs an
              Präzision und Langlebigkeit. Denn wir wissen: Qualität, die man sieht,
              beginnt mit Qualität, die man nicht sieht.
            </p>

            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "2rem" }}>
              Als inhabergeführter Betrieb sind wir nicht nur unseren Kunden verpflichtet,
              sondern auch der Region Albstadt, in der wir arbeiten und leben.
              Kurze Wege, schnelle Reaktionszeiten und ein direkter Ansprechpartner –
              das unterscheidet uns von großen anonymen Baufirmen.
            </p>

            <Link href="/#kontakt" className="btn-primary">
              Jetzt Kontakt aufnehmen →
            </Link>
          </div>

          {/* Bild rechts */}
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
              alt="Unser Team bei der Arbeit"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }}
            />
            {/* Stat-Box (auf Mobile ausgeblendet via .stat-box-floating) */}
            <div className="stat-box-floating"
            >
              {[
                { n: `${yearsOfExp}+`, l: "Jahre" },
                { n: "500+", l: "Projekte" },
                { n: "98%", l: "Zufrieden" },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent-light)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Unsere Werte ── */}
      <section style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container section">
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Warum uns wählen
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", margin: "0.5rem 0 0.5rem" }}>
            Unsere Werte
          </h2>
          <div className="divider" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
            {values.map((v) => (
              <div key={v.title} className="card" style={{ padding: "1.75rem", borderTop: "2px solid var(--accent-dark)" }}>
                {/* Icon-Container */}
                <div style={{
                  width: "46px",
                  height: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--accent-muted)",
                  border: "1px solid rgba(201, 162, 39, 0.28)",
                  marginBottom: "1.25rem",
                  color: "var(--accent-light)",
                  flexShrink: 0,
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bildergalerie ── */}
      <section className="section">
        <div className="container">
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Unsere Arbeit
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", margin: "0.5rem 0 0.5rem" }}>
            Referenz-Galerie
          </h2>
          <div className="divider" />
          <p style={{ color: "var(--text-muted)", maxWidth: "540px", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Ein kleiner Einblick in unsere abgeschlossenen Projekte.
            Jedes Bild erzählt die Geschichte eines zufriedenen Kunden.
          </p>

          {/* ── Galerie-Komponente (Bilder in data/gallery.json verwalten) ── */}
          <Gallery images={galleryImages} columns={3} />
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container section">
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Unser Team
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", margin: "0.5rem 0 0.5rem" }}>
            Die Menschen hinter GALA.BAU
          </h2>
          <div className="divider" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
            {team.map((member) => (
              <div key={member.name} className="card" style={{ padding: "2rem" }}>
                {/* Avatar */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "1rem",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {member.initials}
                </div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "0.25rem" }}>{member.name}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--accent-light)", marginBottom: "0.75rem", fontWeight: 500 }}>{member.role}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie gerne kostenlos und unverbindlich.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#kontakt" className="btn-primary">
              Kostenlos anfragen →
            </Link>
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="btn-outline">
              {company.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
