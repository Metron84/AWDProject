'use client';

import { Button } from '@/components/common/Button';

interface ShareCardProps {
  content: string;
  attribution: string;
  source: string;
  onClose?: () => void;
}

export function ShareCard({ content, attribution, source, onClose }: ShareCardProps) {
  const shareText = `${content}\n\n— ${attribution}\n\nShared from ${source}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Funny Joke',
          text: shareText,
        });
        onClose?.();
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Copied to clipboard!');
        onClose?.();
      } catch (error) {
        alert('Failed to copy. Please try again.');
      }
    }
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    onClose?.();
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#FAF7F2] rounded-lg p-4 border-2 border-[#E8F4F8]">
        <p className="text-[#2D2D2D] italic mb-2">"{content}"</p>
        <p className="text-sm text-[#2E6B8A]">— {attribution}</p>
        <p className="text-xs text-[#2E6B8A] mt-2 opacity-70">Shared from {source}</p>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleWhatsApp} className="flex-1">
          Share via WhatsApp
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex-1">
          Share
        </Button>
      </div>
    </div>
  );
}