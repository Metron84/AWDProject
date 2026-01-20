import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { JokeDisplay } from '@/components/comedy/JokeDisplay';
import { comedians } from '@/lib/constants/comedians';

interface JokePageProps {
  params: Promise<{
    comedian: string;
    category: string;
  }>;
}

const categoryNames: Record<string, string> = {
  marriage: "Marriage 💍",
  aging: "Aging 👴",
  money: "Money 💰",
  family: "Family 👨‍👩‍👧",
  no_respect: "No Respect 😤",
  truth: "Truth 🎯",
  roast: "The Roast 🔥",
  wajed: "Wajed 👦"
};

export default async function JokePage({ params }: JokePageProps) {
  const { comedian: comedianId, category } = await params;
  const comedian = comedians.find(c => c.id === comedianId);
  
  if (!comedian || !comedian.categories.includes(category as any)) {
    notFound();
  }

  const categoryName = categoryNames[category] || category;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E8F4F8] to-white elegant-shadow sticky top-0 z-10 border-b-2 border-[#C9A227]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href={`/office/comedy/${comedian.id}`} className="text-[#2E6B8A] hover:text-[#C9A227] transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-headline text-[#2D2D2D]">{comedian.name}</h1>
            <p className="text-xs text-[#2E6B8A] font-body">{categoryName}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-3">
              <Image
                src={comedian.image_url}
                alt={comedian.name}
                fill
                className="object-cover grayscale"
              />
            </div>
            <div>
              <h2 className="text-2xl font-headline text-[#2E6B8A]">{comedian.name}</h2>
              <p className="text-[#2D2D2D]">{categoryName}</p>
            </div>
          </div>
        </div>
        
        <JokeDisplay comedian={comedian.id} category={category} />
      </div>
    </div>
  );
}