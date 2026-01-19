'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/common/Logo';

function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-[#FAF7F2] z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <Logo width={180} height={180} />
            </div>
            <h1 className="text-5xl font-headline text-[#2E6B8A] mb-4">The Office</h1>
            <p className="text-lg text-[#2D2D2D] font-body">Built with purpose and love by Wajed</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Rotating names for greeting
const names = ['Ahmad', 'Armando', 'Chef Armando', 'Mr. Doumani', 'Chef'];

// Get time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// Personas data - 10 Gentlemen + 4 Ladies
const gentlemen = [
  { id: 'jack-nicholson', name: 'Jack Nicholson', archetype: 'The Charmer', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Jack_Nicholson_2008.jpg/256px-Jack_Nicholson_2008.jpg' },
  { id: 'steve-martin', name: 'Steve Martin', archetype: 'The Nostalgic', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Steve_Martin_by_Gage_Skidmore.jpg/256px-Steve_Martin_by_Gage_Skidmore.jpg' },
  { id: 'paul-newman', name: 'Paul Newman', archetype: 'The Gentleman', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Paul_Newman_1963.jpg/256px-Paul_Newman_1963.jpg' },
  { id: 'robin-williams', name: 'Robin Williams', archetype: 'The Heart', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Robin_Williams_2011.jpg/256px-Robin_Williams_2011.jpg' },
  { id: 'morgan-freeman', name: 'Morgan Freeman', archetype: 'The Voice', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Morgan_Freeman_2010.jpg/256px-Morgan_Freeman_2010.jpg' },
  { id: 'sean-connery', name: 'Sean Connery', archetype: 'The Bond', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sean_Connery_1983.jpg/256px-Sean_Connery_1983.jpg' },
  { id: 'winston-churchill', name: 'Winston Churchill', archetype: 'The Defiant', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_19086236948.jpg/256px-Sir_Winston_Churchill_-_19086236948.jpg' },
  { id: 'omar-sharif', name: 'Omar Sharif', archetype: 'The Arab Mirror', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Omar_Sharif_1963.jpg/256px-Omar_Sharif_1963.jpg' },
  { id: 'warren-buffett', name: 'Warren Buffett', archetype: 'The Oracle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Warren_Buffett_Kansas_City_2019.jpg/256px-Warren_Buffett_Kansas_City_2019.jpg' },
  { id: 'peter-sellers', name: 'Peter Sellers', archetype: 'The Absurdist', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Peter_Sellers_1964.jpg/256px-Peter_Sellers_1964.jpg' },
];

const ladies = [
  { id: 'catherine-zeta-jones', name: 'Catherine Zeta-Jones', archetype: 'The Flame', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Catherine_Zeta-Jones_2011.jpg/256px-Catherine_Zeta-Jones_2011.jpg' },
  { id: 'andie-macdowell', name: 'Andie MacDowell', archetype: 'The Grace', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Andie_MacDowell_2014.jpg/256px-Andie_MacDowell_2014.jpg' },
  { id: 'audrey-hepburn', name: 'Audrey Hepburn', archetype: 'The Icon', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Audrey_Hepburn_1956.jpg/256px-Audrey_Hepburn_1956.jpg' },
  { id: 'sophia-loren', name: 'Sophia Loren', archetype: 'The Fire', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sophia_Loren_1960.jpg/256px-Sophia_Loren_1960.jpg' },
];

export default function TheOfficePage() {
  const [selectedName, setSelectedName] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    // Set greeting
    setGreeting(getGreeting());
    
    // Randomly select a name for this session
    const randomName = names[Math.floor(Math.random() * names.length)];
    setSelectedName(randomName);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Splash Screen / Dedication */}
      <SplashScreen />

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        {/* Dynamic Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-headline text-[#2E6B8A] mb-2">
            {greeting}, {selectedName}
          </h2>
          <p className="text-lg text-[#2D2D2D] font-body">Welcome to your sanctuary</p>
          
          {/* Start Session Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-6"
          >
            <button
              onClick={() => {
                const firstPersona = gentlemen[0];
                window.location.href = `/office/chat/${firstPersona.id}`;
              }}
              className="px-8 py-4 bg-[#C9A227] text-white rounded-lg elegant-shadow-lg hover:elegant-shadow-xl transition-all text-lg font-headline"
            >
              Start Session
            </button>
          </motion.div>
        </motion.div>

        {/* The Salon Grid */}
        <div className="space-y-12">
          {/* Gentlemen Section */}
          <div>
            <h3 className="text-2xl font-headline text-[#2E6B8A] mb-6 text-center">GENTLEMEN</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {gentlemen.map((persona, index) => (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.05, duration: 0.4 }}
                >
                  <Link href={`/office/chat/${persona.id}`}>
                    <div className="bg-white rounded-lg elegant-shadow p-4 hover:elegant-shadow-lg transition-all cursor-pointer group">
                      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg">
                        <Image
                          src={persona.imageUrl}
                          alt={persona.name}
                          fill
                          className="object-cover persona-image group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full bg-[#E8F4F8] flex items-center justify-center';
                            fallback.innerHTML = `<span class="text-[#2E6B8A] font-headline text-2xl">${persona.name.charAt(0)}</span>`;
                            target.parentElement?.appendChild(fallback);
                          }}
                        />
                      </div>
                      <h4 className="font-headline text-[#2D2D2D] text-center text-sm mb-1">{persona.name}</h4>
                      <p className="text-xs text-[#2E6B8A] text-center">{persona.archetype}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ladies Section */}
          <div>
            <h3 className="text-2xl font-headline text-[#2E6B8A] mb-6 text-center">LADIES</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {ladies.map((persona, index) => (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.05, duration: 0.4 }}
                >
                  <Link href={`/office/chat/${persona.id}`}>
                    <div className="bg-white rounded-lg elegant-shadow p-4 hover:elegant-shadow-lg transition-all cursor-pointer group">
                      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg">
                        <Image
                          src={persona.imageUrl}
                          alt={persona.name}
                          fill
                          className="object-cover persona-image group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full bg-[#E8F4F8] flex items-center justify-center';
                            fallback.innerHTML = `<span class="text-[#2E6B8A] font-headline text-2xl">${persona.name.charAt(0)}</span>`;
                            target.parentElement?.appendChild(fallback);
                          }}
                        />
                      </div>
                      <h4 className="font-headline text-[#2D2D2D] text-center text-sm mb-1">{persona.name}</h4>
                      <p className="text-xs text-[#2E6B8A] text-center">{persona.archetype}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/office/comedy" className="px-6 py-3 bg-[#2E6B8A] text-white rounded-lg elegant-shadow hover:elegant-shadow-lg transition-all">
            Comedy Club
          </Link>
          <Link href="/office/wisdom" className="px-6 py-3 bg-[#2E6B8A] text-white rounded-lg elegant-shadow hover:elegant-shadow-lg transition-all">
            Business Wisdom
          </Link>
          <Link href="/office/news" className="px-6 py-3 bg-[#2E6B8A] text-white rounded-lg elegant-shadow hover:elegant-shadow-lg transition-all">
            News Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
