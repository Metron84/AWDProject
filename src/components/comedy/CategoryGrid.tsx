'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common/Button';
import { comedians } from '@/lib/constants/comedians';

interface CategoryGridProps {
  comedian: string;
}

const categories = [
  { id: "marriage", name: "Marriage", emoji: "💍", description: "Wives, husbands, relationships" },
  { id: "aging", name: "Aging", emoji: "👴", description: "Getting older, the body failing" },
  { id: "money", name: "Money", emoji: "💰", description: "Wealth, poverty, business" },
  { id: "family", name: "Family", emoji: "👨‍👩‍👧", description: "Parents, kids, in-laws" },
  { id: "no_respect", name: "No Respect", emoji: "😤", description: "Self-deprecating humor" },
  { id: "truth", name: "Truth", emoji: "🎯", description: "Observations, philosophy" },
  { id: "roast", name: "The Roast", emoji: "🔥", description: "Insults, put-downs" },
  { id: "wajed", name: "Wajed", emoji: "👦", description: "Roasting the son" },
];

export function CategoryGrid({ comedian }: CategoryGridProps) {
  const [randomComedian] = useState(() => 
    comedians[Math.floor(Math.random() * comedians.length)].id
  );

  const comedianData = comedians.find(c => c.id === comedian);
  const availableCategories = categories.filter(cat => 
    comedianData?.categories.includes(cat.id as any)
  );

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/office/comedy">
        <Button variant="ghost" className="mb-4">
          <ArrowLeftIcon className="w-4 h-4 mr-2 inline" />
          Back to Comedians
        </Button>
      </Link>

      {/* Random Option */}
      <div className="text-center">
        <Button
          variant="outline"
          asChild
          className="mb-8"
        >
          <Link href={`/office/comedy/${randomComedian}/marriage`}>
            <ArrowPathIcon className="w-4 h-4 mr-2 inline" />
            Surprise Me!
          </Link>
        </Button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availableCategories.map((category) => (
          <Link
            key={category.id}
            href={`/office/comedy/${comedian}/${category.id}`}
            className="group bg-white rounded-lg border-2 border-transparent hover:border-[#C9A227] p-4 text-center transition-all hover:elegant-shadow"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              {category.emoji}
            </div>
            <h3 className="font-headline text-[#2D2D2D] group-hover:text-[#2E6B8A] transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-[#2E6B8A] mt-1">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}