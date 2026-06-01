import type { Metadata } from "next";
import config from "@/data/config.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz – " + config.company.name,
  description: "Datenschutzerklärung gemäß DSGVO / BDSG.",
};

const { company } = config;

/* ── Hilfsstile ────────────────────────────────────────── */
const h2Style: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: "0.6rem",
  marginTop: "2.25rem",
};
const h3Style: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "var(--text-primary)",
  marginBottom: "0.4rem",
  marginTop: "1.5rem",
};
const pStyle: React.CSSProperties = {
  color: "var(--text-muted)",
  lineHeight: 1.85,
  fontSize: "0.925rem",
  marginBottom: "0.75rem",
};

export default function DatenschutzPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section style={{ padding: "5rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <p style={{ color: "var(--accent-light)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Rechtliche Angaben
          </p>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15 }}>
            Datenschutzerklärung
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "0.75rem", fontSize: "0.9rem" }}>
            Zuletzt aktualisiert: Juni 2025
          </p>
        </div>
      </section>

      {/* ── Inhalt ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>

          {/* 1. Verantwortlicher */}
          <h2 style={h2Style}>1. Verantwortlicher</h2>
          <p style={pStyle}>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer
            nationaler Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
          </p>
          <p style={pStyle}>
            <strong style={{ color: "var(--text-primary)" }}>{company.name}</strong><br />
            Inhaber: <strong style={{ color: "var(--text-primary)" }}>[Vorname Nachname des Inhabers]</strong><br />
            {company.address.street}<br />
            {company.address.city}<br /><br />
            Telefon: {company.phone}<br />
            E-Mail: <a href={`mailto:${company.email}`} style={{ color: "var(--accent-light)" }}>{company.email}</a>
          </p>

          {/* 2. Allgemeines */}
          <h2 style={h2Style}>2. Allgemeines zur Datenverarbeitung</h2>
          <p style={pStyle}>
            Wir erheben und verwenden personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies
            zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich
            ist. Die Erhebung und Verwendung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach
            Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung
            einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch
            gesetzliche Vorschriften gestattet ist.
          </p>

          {/* 3. Rechtsgrundlagen */}
          <h2 style={h2Style}>3. Rechtsgrundlagen der Datenverarbeitung</h2>
          <p style={pStyle}>
            Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen
            Person einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage.
          </p>
          <p style={pStyle}>
            Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen
            Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO
            als Rechtsgrundlage.
          </p>
          <p style={pStyle}>
            Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung
            erforderlich ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als
            Rechtsgrundlage.
          </p>
          <p style={pStyle}>
            Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines
            Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen
            das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage.
          </p>

          {/* 4. Server-Logfiles */}
          <h2 style={h2Style}>4. Server-Log-Dateien</h2>
          <p style={pStyle}>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
            Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul style={{ ...pStyle, paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse (anonymisiert)</li>
          </ul>
          <p style={pStyle}>
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
            an einem sicheren und störungsfreien Betrieb der Website).
          </p>

          {/* 5. Kontaktformular */}
          <h2 style={h2Style}>5. Kontaktformular und E-Mail-Kontakt</h2>
          <p style={pStyle}>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
            Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht
            ohne Ihre Einwilligung weiter.
          </p>
          <p style={pStyle}>
            Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf
            Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Anbahnung oder Durchführung
            eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO). Sie können diese Einwilligung jederzeit widerrufen.
            Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf
            unberührt.
          </p>
          <h3 style={h3Style}>Speicherdauer</h3>
          <p style={pStyle}>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
            auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
            entfällt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche
            Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
          </p>

          {/* 6. Cookies */}
          <h2 style={h2Style}>6. Cookies</h2>
          <p style={pStyle}>
            Unsere Website verwendet technisch notwendige Cookies, die für den Betrieb der Website
            erforderlich sind. Diese Cookies werden auf Ihrem Endgerät gespeichert und ermöglichen es uns,
            Ihren Browser beim nächsten Besuch wiederzuerkennen.
          </p>
          <p style={pStyle}>
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden
            und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder
            generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers
            aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt
            sein.
          </p>
          <p style={pStyle}>
            <em>
              Hinweis: Diese Website setzt derzeit keine Tracking- oder Marketing-Cookies ein. Sollte sich
              dies ändern, wird diese Erklärung aktualisiert und ggf. eine Einwilligungslösung (Consent
              Banner) implementiert.
            </em>
          </p>

          {/* 7. Hosting */}
          <h2 style={h2Style}>7. Hosting und Auftragsverarbeitung</h2>
          <p style={pStyle}>
            Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Personenbezogene Daten,
            die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei
            kann es sich v.&nbsp;a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
            Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website
            generiert werden, handeln.
          </p>
          <p style={pStyle}>
            Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen
            und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen
            und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter
            (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p style={pStyle}>
            <strong style={{ color: "var(--text-primary)" }}>
              [Hosting-Anbieter eintragen, z.&nbsp;B. Vercel, Hetzner, IONOS – und ggf. Auftragsverarbeitungsvertrag
              (AVV) abschließen und hier referenzieren.]
            </strong>
          </p>

          {/* 8. Rechte der betroffenen Person */}
          <h2 style={h2Style}>8. Rechte der betroffenen Person</h2>
          <p style={pStyle}>
            Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
          </p>

          <h3 style={h3Style}>Recht auf Auskunft (Art. 15 DSGVO)</h3>
          <p style={pStyle}>
            Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten
            verarbeiten, die Sie betreffen, sowie Auskunft über diese Daten und die in Art. 15 DSGVO
            genannten Informationen.
          </p>

          <h3 style={h3Style}>Recht auf Berichtigung (Art. 16 DSGVO)</h3>
          <p style={pStyle}>
            Sie haben das Recht, unverzüglich die Berichtigung unrichtiger oder die Vervollständigung
            unvollständiger personenbezogener Daten zu verlangen.
          </p>

          <h3 style={h3Style}>Recht auf Löschung (Art. 17 DSGVO)</h3>
          <p style={pStyle}>
            Sie haben das Recht, die Löschung der Sie betreffenden personenbezogenen Daten zu verlangen,
            sofern die Voraussetzungen des Art. 17 DSGVO vorliegen.
          </p>

          <h3 style={h3Style}>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
          <p style={pStyle}>
            Sie haben das Recht, die Einschränkung der Verarbeitung der Sie betreffenden Daten zu verlangen,
            wenn die Voraussetzungen des Art. 18 DSGVO erfüllt sind.
          </p>

          <h3 style={h3Style}>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
          <p style={pStyle}>
            Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten,
            gängigen und maschinenlesbaren Format zu erhalten und diese Daten einem anderen Verantwortlichen
            zu übermitteln.
          </p>

          <h3 style={h3Style}>Widerspruchsrecht (Art. 21 DSGVO)</h3>
          <p style={pStyle}>
            Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
            gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von
            Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen.
          </p>

          <h3 style={h3Style}>Widerrufsrecht bei Einwilligung</h3>
          <p style={pStyle}>
            Soweit die Verarbeitung auf Ihrer Einwilligung beruht (Art. 6 Abs. 1 lit. a DSGVO), haben Sie
            das Recht, die Einwilligung jederzeit zu widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
            erfolgten Verarbeitung bleibt davon unberührt.
          </p>

          {/* 9. Beschwerderecht */}
          <h2 style={h2Style}>9. Beschwerderecht bei der Aufsichtsbehörde</h2>
          <p style={pStyle}>
            Sie haben das Recht, sich bei einer Datenschutzbehörde über die Verarbeitung Ihrer
            personenbezogenen Daten durch uns zu beschweren. Die zuständige Aufsichtsbehörde für
            Baden-Württemberg ist:
          </p>
          <p style={pStyle}>
            <strong style={{ color: "var(--text-primary)" }}>
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
            </strong><br />
            Lautenschlagerstraße 20<br />
            70173 Stuttgart<br />
            Telefon: +49 711 615541-0<br />
            E-Mail: <a href="mailto:poststelle@lfdi.bwl.de" style={{ color: "var(--accent-light)" }}>poststelle@lfdi.bwl.de</a><br />
            Web: <a href="https://www.baden-wuerttemberg.datenschutz.de" style={{ color: "var(--accent-light)" }} target="_blank" rel="noopener noreferrer">www.baden-wuerttemberg.datenschutz.de</a>
          </p>

          {/* 10. Aktualität */}
          <h2 style={h2Style}>10. Aktualität und Änderung dieser Datenschutzerklärung</h2>
          <p style={pStyle}>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Juni 2025. Durch die
            Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher bzw.
            behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die
            jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Seite abgerufen werden.
          </p>

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
            Informationen ersetzt werden (insbesondere Inhabername und Hosting-Anbieter). Dieser Text ersetzt
            keine professionelle Rechtsberatung.
          </div>
        </div>
      </section>
    </>
  );
}
