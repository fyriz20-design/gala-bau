import type { Metadata } from "next";
import "./globals.css";
import config from "@/data/config.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
};

/* ── Logo ────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.65rem" }}>
      {/* Baustein-Icon (gold) */}
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2"  y="16" width="12" height="12" rx="1" fill="#c9a227" opacity="0.9"/>
        <rect x="16" y="16" width="12" height="12" rx="1" fill="#c9a227" opacity="0.7"/>
        <rect x="9"  y="2"  width="12" height="12" rx="1" fill="#d4b53a"/>
      </svg>

      {/* Schriftzug */}
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "#f0f0f0",
        letterSpacing: "0.04em",
      }}>
        GALA<span style={{ color: "var(--accent-light)" }}>-</span>BAU
      </span>
    </Link>
  );
}

/* ── Header ──────────────────────────────────────────── */
function Header() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: "rgba(15, 15, 15, 0.96)",
      borderBottom: "1px solid var(--border)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.5rem",
      }}>
        <Logo />

        <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          <Link href="/" className="nav-link">Start</Link>
          <Link href="/#leistungen" className="nav-link">Leistungen</Link>
          <Link href="/ueber-uns" className="nav-link">Über uns</Link>
          <Link href="/#kontakt" className="nav-link">Kontakt</Link>
          <Link href="/admin" className="nav-link" style={{ color: "var(--text-subtle)" }}>Admin</Link>
          <Link href="/#kontakt" className="btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.8rem" }}>
            Anfrage stellen
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ── Footer ──────────────────────────────────────────── */
function Footer() {
  const { company } = config;
  return (
    <footer style={{
      backgroundColor: "var(--bg-surface)",
      borderTop: "1px solid var(--border)",
      padding: "3rem 0 1.5rem",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}>
          <div>
            <Logo />
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.75rem", lineHeight: 1.7 }}>
              {company.slogan}.<br />
              Regional. Professionell. Zuverlässig.
            </p>
          </div>

          <div>
            <h4 style={{ color: "var(--text-primary)", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <Link href="/" className="footer-link">Startseite</Link>
              <Link href="/#leistungen" className="footer-link">Leistungen</Link>
              <Link href="/ueber-uns" className="footer-link">Über uns</Link>
              <Link href="/#kontakt" className="footer-link">Kontakt</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: "var(--text-primary)", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Kontakt
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
              <span>{company.address.street}</span>
              <span>{company.address.city}</span>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="footer-link">{company.phone}</a>
              <a href={`mailto:${company.email}`} className="footer-link">{company.email}</a>
              <span>{company.hours}</span>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)" }}>
            © {new Date().getFullYear()} {company.name} – Alle Rechte vorbehalten.
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/impressum" className="footer-link" style={{ fontSize: "0.8rem" }}>Impressum</Link>
            <Link href="/datenschutz" className="footer-link" style={{ fontSize: "0.8rem" }}>Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
