'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 200, height = 200, className = '' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback: Show text logo if image fails to load
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-4xl font-headline text-[#C9A227] mb-2">AWD</div>
          <div className="text-sm text-[#2E6B8A] font-body">The Office</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`} 
      style={{ width, height }}
    >
      <Image
        src="/logo.png"
        alt="The Office - AWD Monogram with Twin Faces Gemini"
        fill
        className="object-contain"
        priority
        onError={() => setImageError(true)}
      />
    </div>
  );
}
