import type { Metadata } from "next";
import config from "@/data/config.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum – " + config.company.name,
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
};

const { company } = config;

/* ── Hilfsstil ─────────────────────────────────────────── */
const sectionStyle: React.CSSProperties = {
  marginBottom: "2rem",
};
const h2Style: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: "0.5rem",
  marginTop: "2rem",
};
const pStyle: React.CSSProperties = {
  color: "var(--text-muted)",
  lineHeight: 1.8,
  fontSize: "0.95rem",
};

export default function ImpressumPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section style={{ padding: "5rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Rechtliche Angaben
          </p>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15 }}>
            Impressum
          </h1>
        </div>
      </section>

      {/* ── Inhalt ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>

          {/* Pflichtangaben § 5 TMG */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Angaben gemäß § 5 TMG</h2>
            <p style={pStyle}>
              <strong style={{ color: "var(--text-primary)" }}>{company.name}</strong><br />
              Inhaber: <strong style={{ color: "var(--text-primary)" }}>[Vorname Nachname des Inhabers]</strong><br />
              {company.address.street}<br />
              {company.address.city}<br />
              {company.address.country}
            </p>
          </div>

          {/* Kontakt */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Kontakt</h2>
            <p style={pStyle}>
              Telefon: <a href={`tel:${company.phone.replace(/\s/g, "")}`} style={{ color: "var(--accent-light)" }}>{company.phone}</a><br />
              E-Mail: <a href={`mailto:${company.email}`} style={{ color: "var(--accent-light)" }}>{company.email}</a><br />
              Web: <a href={company.website} style={{ color: "var(--accent-light)" }} target="_blank" rel="noopener noreferrer">{company.website}</a>
            </p>
          </div>

          {/* Steuer- / Unternehmensangaben */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Umsatzsteuer-Identifikationsnummer</h2>
            <p style={pStyle}>
              Gemäß § 27a Umsatzsteuergesetz:<br />
              <strong style={{ color: "var(--text-primary)" }}>[USt-IdNr. eintragen, z.&nbsp;B. DE&nbsp;123&nbsp;456&nbsp;789]</strong><br />
              <em style={{ fontSize: "0.85rem" }}>
                (Hinweis: Kleinunternehmer nach § 19 UStG sind von der USt-IdNr.-Pflicht befreit –
                in diesem Fall diesen Abschnitt entfernen oder durch den Hinweis auf § 19 UStG ersetzen.)
              </em>
            </p>

            <h2 style={{ ...h2Style, marginTop: "1.5rem" }}>Handwerkskammer / Berufsrecht</h2>
            <p style={pStyle}>
              Eintragung in der Handwerksrolle der Handwerkskammer Reutlingen.<br />
              Gewerbe: Garten- und Landschaftsbau<br />
              Kammer: Handwerkskammer Reutlingen, Hindenburgstraße 58, 72762 Reutlingen<br />
              <a href="https://www.hwk-reutlingen.de" style={{ color: "var(--accent-light)" }} target="_blank" rel="noopener noreferrer">www.hwk-reutlingen.de</a>
            </p>
          </div>

          {/* Verantwortlich für den Inhalt */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p style={pStyle}>
              [Vorname Nachname des Inhabers]<br />
              {company.address.street}<br />
              {company.address.city}
            </p>
          </div>

          {/* Haftung für Inhalte */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Haftung für Inhalte</h2>
            <p style={pStyle}>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p style={{ ...pStyle, marginTop: "0.75rem" }}>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>

          {/* Haftung für Links */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Haftung für Links</h2>
            <p style={pStyle}>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </div>

          {/* Urheberrecht */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Urheberrecht</h2>
            <p style={pStyle}>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </div>

          {/* Streitbeilegung */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>Online-Streitbeilegung (OS-Plattform)</h2>
            <p style={pStyle}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" style={{ color: "var(--accent-light)" }} target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p style={{ ...pStyle, marginTop: "0.75rem" }}>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          {/* Zurück-Link */}
          <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
            <Link href="/" className="btn-outline" style={{ fontSize: "0.875rem" }}>
              ← Zurück zur Startseite
            </Link>
          </div>

          {/* Hinweis Platzhalter */}
          <div style={{
            marginTop: "2rem",
            padding: "1rem 1.25rem",
            backgroundColor: "rgba(201, 162, 39, 0.08)",
            border: "1px solid rgba(201, 162, 39, 0.25)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}>
            <strong style={{ color: "var(--accent-light)" }}>⚠ Platzhalter-Hinweis:</strong>{" "}
            Alle Angaben in eckigen Klammern <strong>[…]</strong> müssen vor dem Livegang durch die korrekten
            rechtlichen Informationen ersetzt werden. Dieser Text ersetzt keine professionelle Rechtsberatung.
          </div>
        </div>
      </section>
    </>
  );
}
