import config from "@/data/config.json";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – " + config.company.name,
  description:
    "Lernen Sie das Team hinter GALA.BAU kennen. Über 15 Jahre Erfahrung im Garten- und Landschaftsbau – regional, persönlich und kompromisslos qualitätsbewusst.",
};

const { company } = config;
const yearsOfExp = parseInt(new Date().getFullYear().toString()) - parseInt(company.founded);

/* ── Galerie-Bilder (Unsplash-Platzhalter) ── */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    alt: "Gepflegter Garten mit Natursteinweg",
    label: "Gartengestaltung",
  },
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    alt: "Professionelle Gartenpflege",
    label: "Pflanzenpflege",
  },
  {
    src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    alt: "Natursteinterrasse",
    label: "Terrassen & Wege",
  },
  {
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
    alt: "Stadtbegrünung und Hecken",
    label: "Hecken & Bäume",
  },
  {
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
    alt: "Moderne Hauseinfahrt",
    label: "Pflasterarbeiten",
  },
  {
    src: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=800&q=80",
    alt: "Holzterrasse mit Gartenbeleuchtung",
    label: "Holz & Pergolen",
  },
];

/* ── Team ── */
const team = [
  {
    name: "Aleksander Nowak",
    role: "Inhaber & Meister des Garten- und Landschaftsbaus",
    desc: "Über 20 Jahre Erfahrung in der Branche. Aleksander führt das Unternehmen mit Leidenschaft und einem untrüglichen Sinn für Qualität.",
    initials: "AN",
  },
  {
    name: "Thomas Müller",
    role: "Projektleiter",
    desc: "Spezialist für komplexe Gartenanlagen und Pflasterarbeiten. Thomas koordiniert unsere Baustellen mit höchster Präzision.",
    initials: "TM",
  },
  {
    name: "Sara Klein",
    role: "Gartenplanerin & Designerin",
    desc: "Mit Kreativität und botanischem Fachwissen entwirft Sara Außenanlagen, die Funktionalität und Ästhetik vereinen.",
    initials: "SK",
  },
];

/* ── Werte ── */
const values = [
  { icon: "🏆", title: "Qualität", desc: "Wir verwenden ausschließlich hochwertige Materialien und arbeiten nach den aktuellen Qualitätsstandards der Branche." },
  { icon: "🤝", title: "Verlässlichkeit", desc: "Vereinbarte Termine und Budgets halten wir ein – das ist für uns nicht verhandelbar." },
  { icon: "🌱", title: "Nachhaltigkeit", desc: "Ressourcenschonendes Arbeiten und ökologische Materialien sind für uns selbstverständlich." },
  { icon: "📍", title: "Regional", desc: "Als lokales Unternehmen kennen wir die Region, ihre Böden und ihre Menschen – das macht den Unterschied." },
];

/* ════════════════════════════════════════════════════════ */
export default function UeberUnsPage() {
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
              "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80')",
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
            Ein regionaler Fachbetrieb mit über {yearsOfExp} Jahren Erfahrung –
            persönlich, professionell und leidenschaftlich.
          </p>
        </div>
      </section>

      {/* ── Haupttext ── */}
      <section className="section">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
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
              Was als Ein-Mann-Betrieb begann, ist heute ein eingespieltes Team aus qualifizierten Garten-
              und Landschaftsbauern, das jährlich über hundert Projekte in der Region erfolgreich abschließt.
              Gegründet im Jahr {company.founded}, haben wir uns von Anfang an auf kompromisslose Qualität
              und persönlichen Service konzentriert.
            </p>

            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              Wir wissen, dass Ihr Garten mehr ist als nur eine Grünfläche – er ist Ihr Lebensraum,
              Ihr Rückzugsort und oft das erste, was Besucher von Ihrem Zuhause sehen.
              Deshalb nehmen wir uns die Zeit, Ihre Wünsche wirklich zu verstehen, bevor die erste
              Schaufel Erde bewegt wird.
            </p>

            <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "2rem" }}>
              Als inhabergeführter Betrieb sind wir nicht nur für unsere Kunden verantwortlich,
              sondern auch für unsere Mitarbeiter und die Region, in der wir arbeiten und leben.
              Kurze Wege, schnelle Reaktionszeiten und ein direkter Ansprechpartner –
              das unterscheidet uns von großen Ketten.
            </p>

            <Link href="/#kontakt" className="btn-primary">
              Jetzt Kontakt aufnehmen →
            </Link>
          </div>

          {/* Bild rechts */}
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
              alt="Unser Team bei der Arbeit"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }}
            />
            {/* Stat-Box */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "-1.5rem",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                gap: "1.5rem",
              }}
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
              <div key={v.title} className="card" style={{ padding: "1.75rem" }}>
                <span style={{ fontSize: "2rem" }}>{v.icon}</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: "0.75rem 0 0.4rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{v.desc}</p>
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

          {/* Galerie-Grid */}
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img.src} alt={img.alt} loading="lazy" />
                {/* Label-Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1rem",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="gallery-overlay"
                >
                  <span style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Hinweis: eigene Bilder einfügen */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1.25rem 1.5rem",
              backgroundColor: "var(--accent-muted)",
              border: "1px solid var(--accent-dark)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>💡</span>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text-primary)" }}>Eigene Bilder einfügen:</strong>{" "}
              Legen Sie Ihre Projektfotos in den Ordner{" "}
              <code style={{ backgroundColor: "var(--bg-card)", padding: "0.1rem 0.4rem", fontFamily: "monospace", fontSize: "0.8rem" }}>
                /public/galerie/
              </code>{" "}
              und ersetzen Sie die Bild-URLs im Array{" "}
              <code style={{ backgroundColor: "var(--bg-card)", padding: "0.1rem 0.4rem", fontFamily: "monospace", fontSize: "0.8rem" }}>
                galleryImages
              </code>{" "}
              in der Datei <code style={{ backgroundColor: "var(--bg-card)", padding: "0.1rem 0.4rem", fontFamily: "monospace", fontSize: "0.8rem" }}>app/ueber-uns/page.tsx</code>.
            </p>
          </div>
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
            Bereit für Ihren Traumgarten?
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
