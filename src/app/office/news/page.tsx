'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon, NewspaperIcon } from '@heroicons/react/24/outline';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  source: string;
  pubDate: string;
  color: string;
}

const newsSources = [
  { id: 'annahar', name: 'Annahar', color: 'bg-green-500' },
  { id: 'bbc', name: 'BBC News', color: 'bg-red-500' },
  { id: 'cnn', name: 'CNN', color: 'bg-red-500' },
  { id: 'reuters', name: 'Reuters', color: 'bg-orange-500' },
  { id: 'ft', name: 'Financial Times', color: 'bg-pink-500' },
  { id: 'bloomberg', name: 'Bloomberg', color: 'bg-purple-500' },
  { id: 'time', name: 'TIME', color: 'bg-red-500' },
  { id: 'variety', name: 'Variety', color: 'bg-blue-500' },
];

export default function NewsFeedPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/office/news/feed');
      const data = await response.json();
      setNewsItems(data.news || []);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNews = selectedSource
    ? newsItems.filter((item) => item.source === selectedSource)
    : newsItems;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header - Newsroom Theme */}
      <div className="bg-gradient-to-r from-[#F0F8F4] to-white elegant-shadow sticky top-0 z-10 border-b-2 border-[#2E6B8A]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/office" className="text-[#2E6B8A] hover:text-[#C9A227] transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <NewspaperIcon className="w-6 h-6 text-[#2E6B8A]" />
          <div className="flex-1">
            <h1 className="text-2xl font-headline text-[#2D2D2D]">News Feed</h1>
            <p className="text-xs text-[#2E6B8A] font-body">Curated intelligence from trusted sources</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Source Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSource(null)}
              className={`px-4 py-2 rounded-lg elegant-shadow transition-all ${
                selectedSource === null
                  ? 'bg-[#2E6B8A] text-white'
                  : 'bg-white text-[#2D2D2D] hover:elegant-shadow-lg'
              }`}
            >
              All Sources
            </button>
            {newsSources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source.name)}
                className={`px-4 py-2 rounded-lg elegant-shadow transition-all ${
                  selectedSource === source.name
                    ? 'bg-[#2E6B8A] text-white'
                    : 'bg-white text-[#2D2D2D] hover:elegant-shadow-lg'
                }`}
              >
                {source.name}
              </button>
            ))}
          </div>
        </div>

        {/* News Items */}
        {isLoading ? (
          <div className="bg-white rounded-lg elegant-shadow p-12 text-center">
            <p className="text-[#2D2D2D] font-body">Loading news...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="bg-white rounded-lg elegant-shadow p-12 text-center">
            <p className="text-[#2D2D2D] font-body">No news available at this time</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg elegant-shadow p-6 hover:elegant-shadow-lg transition-all block"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-xs text-[#2E6B8A] font-body">{item.source}</span>
                </div>
                <h3 className="text-lg font-headline text-[#2D2D2D] mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#2D2D2D] font-body line-clamp-3 mb-3">
                  {item.description}
                </p>
                <p className="text-xs text-[#2E6B8A] font-body">
                  {new Date(item.pubDate).toLocaleDateString()}
                </p>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
