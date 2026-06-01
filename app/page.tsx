import config from "@/data/config.json";
import Link from "next/link";
import ContactForm from "@/app/components/ContactForm";

const { company } = config;

/* ── Service-Icon-Helfer ─────────────────────────────── */
function SvcIcon({ d, d2 }: { d: string; d2?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d}/>
      {d2 && <path d={d2}/>}
    </svg>
  );
}

/* ── Service-Karten ──────────────────────────────────── */
const services = [
  {
    icon: <SvcIcon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" d2="M9 22V12h6v10"/>,
    title: "Bausanierung",
    desc: "Professionelle Sanierung von Wohn- und Gewerbeimmobilien auf höchstem Niveau – mit Blick für das exklusive Detail.",
  },
  {
    icon: <SvcIcon d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/>,
    title: "Trennwändesanierung",
    desc: "Fachgerechte Erneuerung und Instandsetzung von Trennwänden – sauber, schnell und termingerecht ausgeführt.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    title: "Malerarbeiten",
    desc: "Innen- und Außenanstriche in erstklassiger Qualität. Von der Untergrundvorbereitung bis zum finalen Anstrich – alles aus einer Hand.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Verputzarbeiten",
    desc: "Innen- und Außenputze für langlebige, ästhetische Oberflächen. Maschinell oder von Hand – präzise und dauerhaft.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="11" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="9" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="13" x2="20" y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="9" x2="15" y2="9"/>
        <line x1="17" y1="16" x2="23" y2="16"/>
      </svg>
    ),
    title: "Spachtelarbeiten (Q1–Q4)",
    desc: "Alle Qualitätsstufen Q1 bis Q4 nach DIN 18202 – für glatte, makellose Oberflächen als perfekte Grundlage für Folgearbeiten.",
  },
  {
    icon: <SvcIcon d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>,
    title: "Pflaster & Terrassenbau",
    desc: "Einfahrten, Wege und Terrassen aus Naturstein oder Betonverbundsteinen – fachgerecht verlegt für Jahrzehnte.",
  },
];

/* ── Statistiken ─────────────────────────────────────── */
const stats = [
  { value: `${new Date().getFullYear() - parseInt(company.founded)}+`, label: "Jahre Erfahrung" },
  { value: "300+", label: "Projekte umgesetzt" },
  { value: "98%", label: "Zufriedene Kunden" },
  { value: "Q1–Q4", label: "Spachtelqualität" },
];

/* ── Startseite ──────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Hintergrundbild */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.35)",
          }}
        />

        {/* Grüner Akzent-Streifen links */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            bottom: "20%",
            width: "4px",
            background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
          }}
        />

        {/* Inhalt */}
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <p
            style={{
              color: "var(--accent-light)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {company.slogan}
          </p>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#fff",
              maxWidth: "720px",
              marginBottom: "1.5rem",
            }}
          >
            Handwerkskunst.<br />
            <span style={{ color: "var(--accent-light)" }}>Werte erhalten.</span>
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(240,240,240,0.8)",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Seit {new Date().getFullYear() - parseInt(company.founded)} Jahren stehen wir für erstklassige Bausanierung,
            Malerarbeiten und Spachtelqualität auf höchstem Niveau.
            Regional verwurzelt – kompromisslos in der Ausführung.
          </p>

          <div className="hero-cta">
            <Link href="#kontakt" className="btn-primary">
              Kostenlos anfragen →
            </Link>
            <Link href="/ueber-uns" className="btn-outline">
              Über uns
            </Link>
          </div>
        </div>
      </section>

      {/* ── Statistiken ── */}
      <section style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div
            className="stats-bar"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "0",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--accent-light)", lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leistungen ── */}
      <section id="leistungen" className="section">
        <div className="container">
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Was wir bieten
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            Unsere Leistungen
          </h2>
          <div className="divider" />
          <p style={{ color: "var(--text-muted)", maxWidth: "540px", marginBottom: "3rem", lineHeight: 1.7 }}>
            Von der Bausanierung über Malerarbeiten bis zum Pflasterbau – wir bieten Ihnen alle Handwerksleistungen aus einer Hand.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1px",
              backgroundColor: "var(--border)",
              border: "1px solid var(--border)",
            }}
          >
            {services.map((s, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: "2rem", border: "none", borderTop: "2px solid var(--accent-dark)" }}
              >
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
                  {s.icon}
                </div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Über uns Teaser ── */}
      <section style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container section grid-2col">
          {/* Bild */}
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
              alt="Unser Team bei der Arbeit"
              style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
              }}
            />
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-1rem",
                right: "-1rem",
                backgroundColor: "var(--accent)",
                color: "#fff",
                padding: "1.25rem",
                textAlign: "center",
                minWidth: "120px",
              }}
            >
              <div className="font-display" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
                {parseInt(new Date().getFullYear().toString()) - parseInt(company.founded)}+
              </div>
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem" }}>
                Jahre<br />Erfahrung
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Wer wir sind
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", margin: "0.5rem 0" }}>
              Ihr regionaler<br />Fachbetrieb
            </h2>
            <div className="divider" />
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Als inhabergeführter Fachbetrieb stehen wir für persönliche Beratung und kompromisslose Qualität.
              Ob Bausanierung, Malerarbeiten oder Spachtelarbeiten nach Q1–Q4 – jedes Projekt wird mit derselben
              Sorgfalt und Präzision ausgeführt.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Unsere qualifizierten Handwerker bringen jahrelange Erfahrung mit und bilden sich kontinuierlich weiter,
              damit Sie stets von modernsten Techniken und hochwertigen Materialien profitieren.
            </p>
            <Link href="/ueber-uns" className="btn-primary">
              Mehr über uns →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Kontakt ── */}
      <section id="kontakt" className="section">
        <div className="container" style={{ maxWidth: "720px", textAlign: "center" }}>
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Kontakt
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", margin: "0.5rem auto 0.5rem" }}>
            Starten Sie Ihr Projekt
          </h2>
          <div className="divider" style={{ margin: "1rem auto 1.5rem" }} />
          <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>

          {/* Kontaktformular */}
          <ContactForm />

          {/* Direkte Kontaktdaten */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2.5rem",
              marginTop: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} style={{ textDecoration: "none", textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>📞</div>
              <div style={{ color: "var(--accent-light)", fontWeight: 600 }}>{company.phone}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Jetzt anrufen</div>
            </a>
            <a href={`mailto:${company.email}`} style={{ textDecoration: "none", textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>✉️</div>
              <div style={{ color: "var(--accent-light)", fontWeight: 600 }}>{company.email}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>E-Mail schreiben</div>
            </a>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>🕐</div>
              <div style={{ color: "var(--text-primary)", fontWeight: 600 }}>{company.hours}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Erreichbarkeit</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
