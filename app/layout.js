import './globals.css';

export const metadata = {
  title: 'GaLaBau O.JF | Garten- & Landschaftsbau Albstadt',
  description:
    'GaLaBau O.JF – Ihr Fachbetrieb für Garten- und Landschaftsbau in Albstadt-Ebingen. Pflasterarbeiten, Gartengestaltung, Terrassenbau, Zaunbau, Entwässerung und mehr.',
  keywords:
    'GaLaBau, Gartenbau, Landschaftsbau, Albstadt, Ebingen, Zollernalb, Pflasterarbeiten, Gartengestaltung, Terrassenbau, Zaunbau, Baggerarbeiten',
  authors: [{ name: 'GaLaBau O.JF' }],
  openGraph: {
    title: 'GaLaBau O.JF | Garten- & Landschaftsbau Albstadt',
    description:
      'Ihr verlässlicher Partner für Garten- und Landschaftsbau in Albstadt und der Zollernalb-Region.',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
