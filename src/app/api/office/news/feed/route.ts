import { NextResponse } from 'next/server';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

const rssFeeds = [
  { id: 'annahar', url: 'https://www.annahar.com/rss', name: 'Annahar', color: 'bg-green-500' },
  { id: 'bbc', url: 'https://feeds.bbci.co.uk/news/rss.xml', name: 'BBC News', color: 'bg-red-500' },
  { id: 'cnn', url: 'http://rss.cnn.com/rss/edition.rss', name: 'CNN', color: 'bg-red-500' },
  { id: 'reuters', url: 'https://www.reuters.com/tools/rss', name: 'Reuters', color: 'bg-orange-500' },
  { id: 'ft', url: 'https://www.ft.com/?format=rss', name: 'Financial Times', color: 'bg-pink-500' },
  { id: 'bloomberg', url: 'https://feeds.bloomberg.com/markets/news.rss', name: 'Bloomberg', color: 'bg-purple-500' },
  { id: 'time', url: 'https://feeds.feedburner.com/time/topstories', name: 'TIME', color: 'bg-red-500' },
  { id: 'variety', url: 'https://variety.com/feed/', name: 'Variety', color: 'bg-blue-500' },
];

export async function GET() {
  try {
    const allNews: Array<{
      id: string;
      title: string;
      description: string;
      link: string;
      source: string;
      pubDate: string;
      color: string;
    }> = [];

    // Fetch from all RSS feeds in parallel
    const feedPromises = rssFeeds.map(async (feed) => {
      try {
        const feedData = await parser.parseURL(feed.url);
        const items = feedData.items.slice(0, 5).map((item, index) => ({
          id: `${feed.id}-${index}`,
          title: item.title || 'No title',
          description: item.contentSnippet || item.content || item.description || '',
          link: item.link || '',
          source: feed.name,
          pubDate: item.pubDate || new Date().toISOString(),
          color: feed.color,
        }));
        return items;
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    allNews.push(...results.flat());

    // Sort by date (newest first)
    allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({ news: allNews.slice(0, 30) }); // Limit to 30 items
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', news: [] },
      { status: 500 }
    );
  }
}
