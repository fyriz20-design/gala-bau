import './globals.css';

export const metadata = {
  title: 'gala-bau | Premium Bausanierung & Galabau',
  description: 'Exklusive Handwerkskunst für Ihren Lebensraum.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
