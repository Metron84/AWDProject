import { NextResponse } from 'next/server';
import { quotes } from '@/lib/constants/quotes';

export async function GET() {
  try {
    // Get today's date and use it to select a consistent quote
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    
    // Select quote based on day of year for consistency
    const quoteIndex = dayOfYear % quotes.length;
    const quoteOfTheDay = quotes[quoteIndex];
    
    return NextResponse.json({
      quoteOfTheDay: {
        id: quoteOfTheDay.id,
        author: quoteOfTheDay.author,
        content: quoteOfTheDay.text,
        category: quoteOfTheDay.category
      },
      allQuotes: quotes.map(q => ({
        id: q.id,
        author: q.author,
        content: q.text,
        category: q.category
      })),
      date: today.toISOString().split('T')[0],
      totalQuotes: quotes.length
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}
