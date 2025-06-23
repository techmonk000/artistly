import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Artistly | Book Artists for Your Event',
  description: 'A platform to connect event planners with performing artists',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
