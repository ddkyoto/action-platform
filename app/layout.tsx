import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Action Platform - Community Petitions',
  description: 'Create petitions, gather support, and coordinate real-world action together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
