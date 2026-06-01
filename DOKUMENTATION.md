# GaLaBau O.JF – Projektdokumentation

## Übersicht

Website für **GaLaBau O.JF**, einen Garten- und Landschaftsbaubetrieb aus Albstadt-Ebingen.
Technologiebasis: **Next.js 14+ (App Router)**, Tailwind CSS, Node.js.

---

## Projektstruktur

```
galabau-premium/
├── app/
│   ├── page.js                   # Hauptseite (Landing Page)
│   ├── layout.js                 # Root-Layout + SEO-Metadaten
│   ├── globals.css               # Globale Styles
│   ├── favicon.ico
│   ├── admin/
│   │   └── page.js               # Admin-Bereich (Bildverwaltung)
│   └── api/
│       ├── contact/
│       │   └── route.js          # POST /api/contact – E-Mail-Versand
│       └── gallery/
│           ├── route.js          # GET /api/gallery – Bilder abrufen
│           └── upload/
│               └── route.js      # POST /api/gallery/upload – Bild hochladen
├── public/                       # Statische Assets
├── .env.local                    # Geheime Zugangsdaten (nicht ins Git!)
├── .env.local.example            # Vorlage für .env.local
└── DOKUMENTATION.md              # Diese Datei
```

---

## Setup & Lokale Entwicklung

### Voraussetzungen
- Node.js 18+
- npm

### Installation

```bash
npm install
npm install nodemailer   # Für das Kontaktformular (einmalig nötig)
```

### Umgebungsvariablen einrichten

1. Kopiere `.env.local.example` und benenne sie in `.env.local` um.
2. Fülle deine Gmail-Zugangsdaten ein:

```env
GMAIL_USER=deine-adresse@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

**Gmail App-Passwort erstellen:**
1. Gehe zu [myaccount.google.com](https://myaccount.google.com) → Sicherheit
2. Aktiviere 2-Faktor-Authentifizierung (falls noch nicht aktiv)
3. Suche nach „App-Passwörter" → Erstelle ein neues für „E-Mail"
4. Kopiere den 16-stelligen Code als `GMAIL_APP_PASSWORD`

### Entwicklungsserver starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

---

## Seitenstruktur (Landing Page)

| Abschnitt     | ID           | Beschreibung                                 |
|---------------|--------------|----------------------------------------------|
| Header        | –            | Fixierte Navigation mit Hamburger-Menü (mobil)|
| Hero          | `#home`      | Vollbild-Einstieg mit Hintergrundbild        |
| Über uns      | `#ueber-uns` | Unternehmensbeschreibung + Kennzahlen        |
| Leistungen    | `#leistungen`| 6 Leistungskarten                            |
| Referenzen    | `#galerie`   | Bildergalerie (über Admin-Bereich befüllen)  |
| Kontakt       | `#kontakt`   | Adresse + funktionales Kontaktformular       |

---

## API-Endpunkte

### `POST /api/contact`
Versendet eine Kontaktanfrage per E-Mail.

**Body (JSON):**
```json
{
  "name": "Max Mustermann",
  "email": "max@beispiel.de",
  "message": "Ich hätte Interesse an einem Angebot..."
}
```

**Antwort:**
- `200 OK` → `{ "success": true }`
- `400 Bad Request` → Fehlende Felder
- `500 Internal Server Error` → E-Mail-Versand fehlgeschlagen

### `GET /api/gallery`
Gibt alle Galerie-Bild-URLs zurück.

**Antwort:** `{ "urls": ["https://..."] }`

### `POST /api/gallery/upload`
Lädt ein neues Bild in die Galerie hoch (nur über Admin-Bereich).

---

## Admin-Bereich

Erreichbar unter `/admin`. Passwort: `galabau2026`

> **Hinweis:** Das Passwort ist derzeit im Quellcode (`app/admin/page.js`) hartcodiert. Für mehr Sicherheit empfiehlt sich eine Umgebungsvariable oder ein serverseitiger Auth-Check.

---

## Design-System

| Token           | Wert        | Verwendung                        |
|-----------------|-------------|-----------------------------------|
| Dunkelgrün/Schwarz | `#1A1D1A` | Hintergrund, Text, Buttons      |
| Gold/Beige      | `#C5A880`   | Akzente, Trennlinien, Hover      |
| Olivgrün        | `#607762`   | CTA-Buttons, Links               |
| Hellgrau        | `#F7F9F6`   | Seitenhintergrund, Inputs        |

---

## Deployment

Das Projekt kann direkt auf [Vercel](https://vercel.com) deployt werden:

```bash
npm run build   # Lokaler Build-Test
```

Auf Vercel die Umgebungsvariablen (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) unter **Settings → Environment Variables** eintragen.
