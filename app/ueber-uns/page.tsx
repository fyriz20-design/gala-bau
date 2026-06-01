import config from "@/data/config.json";
import Link from "next/link";
import type { Metadata } from "next";
import Gallery from "@/app/components/Gallery";
import galleryImages from "@/data/gallery.json";

export const metadata: Metadata = {
  title: "Über uns – " + config.company.name,
  description:
    "Lernen Sie das Team hinter GaLaBau O.JF kennen. Fachbetrieb für Bausanierung, Malerarbeiten und Spachtelarbeiten in Albstadt-Ebingen – regional, persönlich, präzise.",
};

const { company } = config;
const yearsOfExp = parseInt(new Date().getFullYear().toString()) - parseInt(company.founded);

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
  { icon: "🏆", title: "Qualität", desc: "Wir verwenden ausschließlich hochwertige Materialien und arbeiten nach den aktuellen Qualitätsstandards der Branche." },
  { icon: "🤝", title: "Verlässlichkeit", desc: "Vereinbarte Termine und Budgets halten wir ein – das ist für uns nicht verhandelbar." },
  { icon: "🌱", title: "Nachhaltigkeit", desc: "Ressourcenschonendes Arbeiten und ökologische Materialien sind für uns selbstverständlich." },
  { icon: "📍", title: "Regional", desc: "Als lokaler Betrieb aus Albstadt-Ebingen kennen wir die Region und ihre Bauten genau – das macht den Unterschied." },
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

          {/* ── Galerie-Komponente (Bilder in data/gallery.json verwalten) ── */}
          <Gallery images={galleryImages} columns={3} />

          {/* Hinweis: eigene Bilder einfügen */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1.25rem 1.5rem",
              backgroundColor: "var(--accent-muted)",
              border: "1px solid var(--accent-dark)",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--text-primary)" }}>Eigene Fotos hinzufügen:</strong>{" "}
              Öffnen Sie die Datei{" "}
              <code style={{ backgroundColor: "var(--bg-card)", padding: "0.1rem 0.4rem", fontFamily: "monospace", fontSize: "0.8rem" }}>
                data/gallery.json
              </code>{" "}
              und tragen Sie dort Ihre Bilder ein – mit URL, Alt-Text und einer kurzen Beschreibung.
              Neue Einträge erscheinen sofort in der Galerie, ohne dass Sie den Seiten-Code anfassen müssen.
              Eigene Fotos legen Sie in{" "}
              <code style={{ backgroundColor: "var(--bg-card)", padding: "0.1rem 0.4rem", fontFamily: "monospace", fontSize: "0.8rem" }}>
                /public/galerie/meinbild.jpg
              </code>{" "}
              ab und verwenden dann{" "}
              <code style={{ backgroundColor: "var(--bg-card)", padding: "0.1rem 0.4rem", fontFamily: "monospace", fontSize: "0.8rem" }}>
                {`"src": "/galerie/meinbild.jpg"`}
              </code>{" "}
              in der JSON-Datei.
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
