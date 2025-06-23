'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} transition-colors duration-300 bg-white text-black dark:bg-[#0a0a0a] dark:text-white`}>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        
      </body>
    </html>
  );
}
