'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ComedianGrid } from '@/components/comedy/ComedianGrid';

export default function ComedyClubPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E8F4F8] to-white elegant-shadow sticky top-0 z-10 border-b-2 border-[#C9A227]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/office" className="text-[#2E6B8A] hover:text-[#C9A227] transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-headline text-[#2D2D2D]">Comedy Club</h1>
            <p className="text-xs text-[#2E6B8A] font-body">Where wit meets wisdom</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline text-[#2E6B8A] mb-2">The Comedy Club</h2>
          <p className="text-lg text-[#2D2D2D]">Who's making you laugh today?</p>
        </div>
        
        <ComedianGrid />
      </div>
    </div>
  );
}
