import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Ganti font ke Inter
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard WarTeg!', // Anda bisa ganti judul situs di sini
  description: 'Dashboard untuk kegiatan KKN WarTeg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}