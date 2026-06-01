import type { Metadata } from "next";
import "./globals.css";
import config from "@/data/config.json";
import Link from "next/link";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
};

/* ── Logo SVG ────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
      {/* Blatt-Icon */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M16 2C16 2 4 8 4 18C4 24.627 9.373 30 16 30C22.627 30 28 24.627 28 18C28 8 16 2 16 2Z"
          fill="#4d8c3a"
        />
        <path
          d="M16 30 L16 14"
          stroke="#2a5c1e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 20 C13 17 9 16 7 16"
          stroke="#2a5c1e"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M16 24 C19 21 23 20 25 20"
          stroke="#2a5c1e"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* Schriftzug */}
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "#f0f0f0",
        letterSpacing: "0.04em",
      }}>
        GALA<span style={{ color: "var(--accent-light)" }}>.</span>BAU
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
      backgroundColor: "rgba(15, 15, 15, 0.95)",
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

        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/" className="nav-link">Start</Link>
          <Link href="/#leistungen" className="nav-link">Leistungen</Link>
          <Link href="/ueber-uns" className="nav-link">Über uns</Link>
          <Link href="/#kontakt" className="nav-link">Kontakt</Link>
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
        {/* Oberer Bereich */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}>
          {/* Spalte 1: Logo & Slogan */}
          <div>
            <Logo />
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.75rem", lineHeight: 1.7 }}>
              {company.slogan}.<br />
              Regional. Professionell. Zuverlässig.
            </p>
          </div>

          {/* Spalte 2: Navigation */}
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

          {/* Spalte 3: Kontakt */}
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

        {/* Unterer Bereich */}
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

/* ── Root Layout ─────────────────────────────────────── */
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
