'use client';

import Link from 'next/link';
import Image from 'next/image';
import { comedians } from '@/lib/constants/comedians';

export function ComedianGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {comedians.map((comedian) => (
        <Link
          key={comedian.id}
          href={`/office/comedy/${comedian.id}`}
          className="group relative bg-white rounded-lg elegant-shadow overflow-hidden transform transition-all duration-300 hover:scale-105 hover:elegant-shadow-lg"
        >
          <div className="aspect-square relative">
            <Image
              src={comedian.image_url}
              alt={comedian.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-headline text-[#2D2D2D] mb-2 group-hover:text-[#2E6B8A] transition-colors">
              {comedian.name}
            </h3>
            <p className="text-[#2E6B8A] text-sm italic">
              "{comedian.tagline}"
            </p>
          </div>
          
          <div className="absolute top-4 right-4 bg-[#2E6B8A] text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Tap to enter
          </div>
        </Link>
      ))}
    </div>
  );
}