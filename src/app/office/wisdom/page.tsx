'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon, SparklesIcon, ShareIcon, CalendarIcon, TagIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common/Button';
import { ShareCard } from '@/components/shared/ShareCard';

interface Quote {
  id: string;
  author: string;
  content: string;
  category?: string;
}

interface QuoteOfTheDayData {
  quoteOfTheDay: Quote;
  allQuotes: Quote[];
  date: string;
  totalQuotes: number;
}

const categoryNames: Record<string, string> = {
  wealth: "Wealth 💰",
  wisdom: "Wisdom 🧠",
  investing: "Investing 📈",
  leadership: "Leadership 👑",
  management: "Management 📋",
  philosophy: "Philosophy 🤔",
  family: "Family 👨‍👩‍👧",
  business: "Business 💼",
  customer_focus: "Customer Focus 🎯",
  happiness: "Happiness 😊",
  opportunity: "Opportunity 🚀",
  passion: "Passion ❤️",
  courage: "Courage 💪",
  mindset: "Mindset 🧘",
  belief: "Belief ✨",
  relationships: "Relationships 🤝",
  perseverance: "Perseverance 🏃‍♂️",
  creativity: "Creativity 🎨",
  friendship: "Friendship 🤝"
};

export default function BusinessWisdomPage() {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState<Quote | null>(null);
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareCard, setShowShareCard] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayedQuotes, setDisplayedQuotes] = useState<Quote[]>([]);
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    loadQuotes();
  }, []);

  useEffect(() => {
    // Load initial quotes for archive
    const filtered = selectedCategory === 'all' 
      ? allQuotes 
      : allQuotes.filter(q => q.category === selectedCategory);
    setDisplayedQuotes(filtered.slice(0, 5));
  }, [selectedCategory, allQuotes]);

  const loadQuotes = async () => {
    try {
      const response = await fetch('/api/office/wisdom/quotes');
      const data: QuoteOfTheDayData = await response.json();
      setQuoteOfTheDay(data.quoteOfTheDay);
      setAllQuotes(data.allQuotes || []);
      setDate(data.date);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    setShowShareCard(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setDisplayedQuotes([]);
  };

  const loadMoreQuotes = () => {
    const filtered = selectedCategory === 'all' 
      ? allQuotes 
      : allQuotes.filter(q => q.category === selectedCategory);
    const newQuotes = filtered.slice(displayedQuotes.length, displayedQuotes.length + 5);
    setDisplayedQuotes(prev => [...prev, ...newQuotes]);
  };

  const formatCategory = (category?: string) => {
    if (!category) return '';
    return categoryNames[category] || category;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFF8E8] to-white elegant-shadow sticky top-0 z-10 border-b-2 border-[#C9A227]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/office" className="text-[#2E6B8A] hover:text-[#C9A227] transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-headline text-[#2D2D2D]">Business Wisdom</h1>
            <p className="text-xs text-[#2E6B8A] font-body">Timeless insights from the masters</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quote of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <SparklesIcon className="w-6 h-6 text-[#C9A227]" />
            <h2 className="text-2xl font-headline text-[#2E6B8A]">Quote of the Day</h2>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-lg elegant-shadow p-8 text-center">
              <p className="text-[#2D2D2D] font-body">Loading wisdom...</p>
            </div>
          ) : quoteOfTheDay ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#E8F4F8]/50 to-white rounded-lg elegant-shadow-lg p-8 border-l-4 border-[#C9A227]"
            >
              {date && (
                <div className="flex items-center gap-2 text-[#2E6B8A]/70 text-sm mb-4">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}

              <blockquote className="text-xl md:text-2xl text-[#2D2D2D] font-body leading-relaxed mb-6 italic">
                "{quoteOfTheDay.content}"
              </blockquote>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#2E6B8A]">
                  <TagIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {formatCategory(quoteOfTheDay.category)}
                  </span>
                </div>
                <p className="text-lg text-[#2E6B8A] font-headline text-right">
                  — {quoteOfTheDay.author}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button onClick={handleShare}>
                  <ShareIcon className="w-4 h-4 mr-2 inline" />
                  Share Wisdom
                </Button>
                <Button variant="outline" onClick={loadQuotes}>
                  <ArrowPathIcon className="w-4 h-4 mr-2 inline" />
                  Another Quote
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg elegant-shadow p-8 text-center">
              <p className="text-[#2D2D2D] font-body">No quote available</p>
            </div>
          )}
        </motion.div>

        {/* Archive */}
        <div>
          <h2 className="text-2xl font-headline text-[#2E6B8A] mb-6">Wisdom Archive</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'outline'}
              onClick={() => handleCategoryChange('all')}
              className="text-sm"
            >
              All ({allQuotes.length})
            </Button>
            {Object.keys(categoryNames).map((category) => {
              const count = allQuotes.filter(q => q.category === category).length;
              if (count === 0) return null;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  onClick={() => handleCategoryChange(category)}
                  className="text-sm"
                >
                  {categoryNames[category]} ({count})
                </Button>
              );
            })}
          </div>

          {/* Quotes List */}
          <div className="space-y-4">
            {displayedQuotes.length === 0 && !isLoading && (
              <div className="bg-white rounded-lg elegant-shadow p-8 text-center">
                <p className="text-[#2D2D2D] font-body">No quotes found in this category.</p>
              </div>
            )}
            {displayedQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg elegant-shadow p-6 hover:elegant-shadow-lg transition-all"
              >
                <blockquote className="text-lg text-[#2D2D2D] font-body leading-relaxed mb-3">
                  "{quote.content}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-base text-[#2E6B8A] font-headline">
                      — {quote.author}
                    </p>
                    {quote.category && (
                      <span className="text-xs text-[#2E6B8A]/70 px-2 py-1 bg-[#E8F4F8] rounded">
                        {formatCategory(quote.category)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#2E6B8A]/50">
                    #{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {(() => {
            const filtered = selectedCategory === 'all' 
              ? allQuotes 
              : allQuotes.filter(q => q.category === selectedCategory);
            const remaining = filtered.length - displayedQuotes.length;
            return remaining > 0 ? (
              <div className="text-center mt-6">
                <Button
                  onClick={loadMoreQuotes}
                  variant="outline"
                  className="px-8"
                >
                  Load More ({remaining} remaining)
                </Button>
              </div>
            ) : null;
          })()}
        </div>
      </div>

      {/* Share Card Modal */}
      {showShareCard && quoteOfTheDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 elegant-shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-headline text-[#2D2D2D]">Share This Wisdom</h3>
              <button
                onClick={() => setShowShareCard(false)}
                className="text-[#2E6B8A] hover:text-[#C9A227] text-2xl"
              >
                ✕
              </button>
            </div>
            
            <ShareCard
              content={quoteOfTheDay.content}
              attribution={quoteOfTheDay.author}
              source="The Office - Business Wisdom"
              onClose={() => setShowShareCard(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}