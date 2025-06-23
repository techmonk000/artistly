'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-[#0a0f2c] text-white px-6 py-6 fixed top-0 w-full z-50 shadow-md transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } rounded-b-xl`}
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Artistly</div>


        <ul className="hidden md:flex gap-6 text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/artists">Artists</Link></li>
          <li><Link href="/onboard">Onboard Artist</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>


        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-6 text-lg">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/artists" onClick={() => setMenuOpen(false)}>Artists</Link></li>
          <li><Link href="/onboard" onClick={() => setMenuOpen(false)}>Onboard Artist</Link></li>
          <li><Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
        </ul>
      )}
    </nav>
  );
}
