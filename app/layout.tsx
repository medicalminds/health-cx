import type { Metadata } from 'next';
import './globals.css';

const title = 'Health CX Family Medicine | Hospitals, Clinics & Specialty Care';
const description =
  'Connected primary, specialty and hospital care for families across the Front Range.';
const siteOrigin = 'https://medicalminds.github.io/health-cx';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title,
  description,
  alternates: {
    canonical: siteOrigin,
  },
  openGraph: {
    title: 'Health care that sees the whole you. | Health CX Family Medicine',
    description,
    type: 'website',
    url: siteOrigin,
    images: [
      {
        url: `${siteOrigin}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Health CX Family Medicine — Health care that sees the whole you.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health care that sees the whole you. | Health CX Family Medicine',
    description,
    images: [`${siteOrigin}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
