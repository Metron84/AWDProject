'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common/Button';
import { jokes } from '@/lib/constants/jokes';
import { ShareCard } from '@/components/shared/ShareCard';

interface JokeDisplayProps {
  comedian: string;
  category: string;
}

export function JokeDisplay({ comedian, category }: JokeDisplayProps) {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showShareCard, setShowShareCard] = useState(false);

  // Filter jokes for this comedian and category
  const filteredJokes = jokes.filter(
    joke => joke.comedian === comedian && joke.category === category
  );

  const currentJoke = filteredJokes[currentJokeIndex];

  const handleNext = () => {
    setCurrentJokeIndex((prev) => (prev + 1) % filteredJokes.length);
  };

  const handlePrevious = () => {
    setCurrentJokeIndex((prev) => (prev - 1 + filteredJokes.length) % filteredJokes.length);
  };

  const handleShare = () => {
    setShowShareCard(true);
  };

  // Auto-advance joke after 30 seconds
  useEffect(() => {
    if (filteredJokes.length <= 1) return;
    
    const timer = setTimeout(() => {
      handleNext();
    }, 30000);

    return () => clearTimeout(timer);
  }, [currentJokeIndex, filteredJokes.length]);

  if (!currentJoke || filteredJokes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#2D2D2D]">No jokes found in this category.</p>
        <Link href={`/office/comedy/${comedian}`} className="mt-4 inline-block">
          <Button variant="outline">Back to Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href={`/office/comedy/${comedian}`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeftIcon className="w-4 h-4 mr-2 inline" />
          Back to Categories
        </Button>
      </Link>

      {/* Joke Display */}
      <div className="bg-white rounded-lg elegant-shadow-lg p-8 text-center">
        <div className="mb-8">
          <p className="text-xl text-[#2D2D2D] leading-relaxed">
            "{currentJoke.text}"
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-[#2E6B8A]">
          <span>—</span>
          <span className="font-medium">{currentJoke.attribution}</span>
        </div>
        
        <div className="mt-8 text-sm text-[#2E6B8A]">
          {currentJokeIndex + 1} of {filteredJokes.length}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={filteredJokes.length <= 1}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 inline" />
          Previous
        </Button>
        
        <Button onClick={handleShare}>
          <ShareIcon className="w-4 h-4 mr-2 inline" />
          Share
        </Button>
        
        <Button onClick={handleNext} disabled={filteredJokes.length <= 1}>
          Next
          <ArrowRightIcon className="w-4 h-4 ml-2 inline" />
        </Button>
      </div>

      {/* Try Different Topic Button */}
      <div className="text-center mt-8">
        <Link href={`/office/comedy/${comedian}`}>
          <Button variant="ghost">
            Try Different Topic
          </Button>
        </Link>
      </div>

      {/* Share Card Modal */}
      {showShareCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 elegant-shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-headline text-[#2D2D2D]">Share This Joke</h3>
              <button
                onClick={() => setShowShareCard(false)}
                className="text-[#2E6B8A] hover:text-[#C9A227] text-2xl"
              >
                ✕
              </button>
            </div>
            
            <ShareCard
              content={currentJoke.text}
              attribution={currentJoke.attribution}
              source="The Office"
              onClose={() => setShowShareCard(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}