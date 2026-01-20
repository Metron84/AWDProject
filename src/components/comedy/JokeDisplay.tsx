'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common/Button';
import { ShareCard } from '@/components/shared/ShareCard';
import { comedians } from '@/lib/constants/comedians';

interface JokeDisplayProps {
  comedian: string;
  category: string;
}

interface Joke {
  id: string;
  text: string;
  attribution: string;
}

export function JokeDisplay({ comedian, category }: JokeDisplayProps) {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showShareCard, setShowShareCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const comedianData = comedians.find(c => c.id === comedian);
  const comedianName = comedianData?.name || 'Comedian';

  // Fetch a new joke from the API
  const fetchJoke = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/office/comedy/joke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comedian, category }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to fetch joke`);
      }

      // Validate response has joke
      if (!data.joke || typeof data.joke !== 'string' || data.joke.trim().length === 0) {
        console.error('Invalid API response:', data);
        throw new Error('Invalid response: joke content is missing or empty');
      }

      const newJoke: Joke = {
        id: Date.now().toString(),
        text: data.joke,
        attribution: comedianName,
      };

      setJokes(prev => {
        const updated = [...prev, newJoke];
        // FIX: Set index to the new joke (last item in array)
        setCurrentJokeIndex(updated.length - 1);
        return updated;
      });
    } catch (err: any) {
      console.error('Error fetching joke:', err);
      console.error('Error details:', {
        message: err.message,
        comedian,
        category
      });
      setError(err.message || 'Failed to load joke');
    } finally {
      setIsLoading(false);
    }
  }, [comedian, category, comedianName]);

  // Load initial joke on mount
  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  const currentJoke = jokes[currentJokeIndex];

  const handleNext = useCallback(() => {
    // If we're at the last joke, fetch a new one
    if (currentJokeIndex === jokes.length - 1) {
      fetchJoke();
    } else {
      setCurrentJokeIndex(prev => prev + 1);
    }
  }, [currentJokeIndex, jokes.length, fetchJoke]);

  const handlePrevious = () => {
    if (currentJokeIndex > 0) {
      setCurrentJokeIndex(prev => prev - 1);
    }
  };

  const handleShare = () => {
    setShowShareCard(true);
  };

  // Auto-advance joke after 30 seconds
  useEffect(() => {
    if (jokes.length === 0) return;
    
    const timer = setTimeout(() => {
      handleNext();
    }, 30000);

    return () => clearTimeout(timer);
  }, [currentJokeIndex, jokes.length, handleNext]);

  if (isLoading && jokes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-[#2D2D2D] mt-4">Loading joke...</p>
      </div>
    );
  }

  if (error && jokes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">⚠️ {error}</p>
        <Button variant="outline" onClick={fetchJoke} className="mr-4">
          Try Again
        </Button>
        <Link href={`/office/comedy/${comedian}`} className="inline-block">
          <Button variant="outline">Back to Categories</Button>
        </Link>
      </div>
    );
  }

  if (!currentJoke) {
    return (
      <div className="text-center py-12">
        <p className="text-[#2D2D2D]">No jokes available.</p>
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
          {currentJokeIndex + 1} {jokes.length > currentJokeIndex + 1 ? `of ${jokes.length}` : '(new)'}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentJokeIndex === 0 || isLoading}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 inline" />
          Previous
        </Button>
        
        <Button onClick={handleShare} disabled={isLoading}>
          <ShareIcon className="w-4 h-4 mr-2 inline" />
          Share
        </Button>
        
        <Button onClick={handleNext} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Next'}
          {!isLoading && <ArrowRightIcon className="w-4 h-4 ml-2 inline" />}
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