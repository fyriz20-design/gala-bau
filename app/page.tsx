import config from "@/data/config.json";
import Link from "next/link";
import ContactForm from "@/app/components/ContactForm";

const { company } = config;

/* ── Service-Karten ──────────────────────────────────── */
const services = [
  {
    icon: "🌿",
    title: "Gartengestaltung",
    desc: "Von der Planung bis zur Fertigstellung gestalten wir Ihren Traumgarten – individuell, nachhaltig und mit Liebe zum Detail.",
  },
  {
    icon: "🪨",
    title: "Pflasterarbeiten",
    desc: "Wege, Einfahrten und Terrassen aus Naturstein oder Beton-Verbundsteinen – fachgerecht verlegt für Jahrzehnte.",
  },
  {
    icon: "🌳",
    title: "Baum- & Heckenpflege",
    desc: "Professioneller Schnitt, Fällung und Pflanzung von Bäumen und Hecken durch ausgebildete Fachkräfte.",
  },
  {
    icon: "💧",
    title: "Bewässerungssysteme",
    desc: "Automatische Bewässerungsanlagen, die Ihren Garten effizient und ressourcenschonend mit Wasser versorgen.",
  },
  {
    icon: "🏡",
    title: "Terrassen & Pergolen",
    desc: "Holz, WPC oder Stein – wir bauen Ihre Terrasse und Pergola als perfekten Außenwohnraum.",
  },
  {
    icon: "❄️",
    title: "Winterdienst",
    desc: "Verlässlicher Räum- und Streudienst für Privatgrundstücke und Gewerbeimmobilien – pünktlich und zuverlässig.",
  },
];

/* ── Statistiken ─────────────────────────────────────── */
const stats = [
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "500+", label: "Projekte umgesetzt" },
  { value: "98%", label: "Zufriedene Kunden" },
  { value: "3", label: "Ausgezeichnete Fachbetriebe" },
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
              "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80')",
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
            Ihr Garten.<br />
            <span style={{ color: "var(--accent-light)" }}>Unsere Leidenschaft.</span>
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
            Seit über {parseInt(new Date().getFullYear().toString()) - parseInt(company.founded)} Jahren verwandeln wir Außenflächen in grüne Oasen.
            Präzision, Qualität und regionale Verbundenheit – das ist unser Versprechen an Sie.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
            Von der Gartenplanung bis zum Winterdienst – wir bieten Ihnen alle Leistungen rund um Ihren Außenbereich aus einer Hand.
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
                style={{ padding: "2rem", border: "none" }}
              >
                <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, margin: "0.75rem 0 0.5rem" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Über uns Teaser ── */}
      <section style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div
          className="container section"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}
        >
          {/* Bild */}
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
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
              Jedes Projekt behandeln wir mit derselben Sorgfalt – egal ob kleiner Privatgarten oder große Gewerbefläche.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Unsere qualifizierten Mitarbeiter bringen jahrelange Erfahrung mit und bilden sich kontinuierlich weiter,
              damit Sie stets von modernsten Techniken und Materialien profitieren.
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
