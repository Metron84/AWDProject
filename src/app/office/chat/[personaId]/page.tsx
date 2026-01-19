'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

// Persona data mapping
const personas: Record<string, { name: string; archetype: string; imageUrl: string }> = {
  'jack-nicholson': { name: 'Jack Nicholson', archetype: 'The Charmer', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Jack_Nicholson_2008.jpg/256px-Jack_Nicholson_2008.jpg' },
  'steve-martin': { name: 'Steve Martin', archetype: 'The Nostalgic', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Steve_Martin_by_Gage_Skidmore.jpg/256px-Steve_Martin_by_Gage_Skidmore.jpg' },
  'paul-newman': { name: 'Paul Newman', archetype: 'The Gentleman', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Paul_Newman_1963.jpg/256px-Paul_Newman_1963.jpg' },
  'robin-williams': { name: 'Robin Williams', archetype: 'The Heart', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Robin_Williams_2011.jpg/256px-Robin_Williams_2011.jpg' },
  'morgan-freeman': { name: 'Morgan Freeman', archetype: 'The Voice', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Morgan_Freeman_2010.jpg/256px-Morgan_Freeman_2010.jpg' },
  'sean-connery': { name: 'Sean Connery', archetype: 'The Bond', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sean_Connery_1983.jpg/256px-Sean_Connery_1983.jpg' },
  'winston-churchill': { name: 'Winston Churchill', archetype: 'The Defiant', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_19086236948.jpg/256px-Sir_Winston_Churchill_-_19086236948.jpg' },
  'omar-sharif': { name: 'Omar Sharif', archetype: 'The Arab Mirror', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Omar_Sharif_1963.jpg/256px-Omar_Sharif_1963.jpg' },
  'warren-buffett': { name: 'Warren Buffett', archetype: 'The Oracle', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Warren_Buffett_Kansas_City_2019.jpg/256px-Warren_Buffett_Kansas_City_2019.jpg' },
  'peter-sellers': { name: 'Peter Sellers', archetype: 'The Absurdist', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Peter_Sellers_1964.jpg/256px-Peter_Sellers_1964.jpg' },
  'catherine-zeta-jones': { name: 'Catherine Zeta-Jones', archetype: 'The Flame', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Catherine_Zeta-Jones_2011.jpg/256px-Catherine_Zeta-Jones_2011.jpg' },
  'andie-macdowell': { name: 'Andie MacDowell', archetype: 'The Grace', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Andie_MacDowell_2014.jpg/256px-Andie_MacDowell_2014.jpg' },
  'audrey-hepburn': { name: 'Audrey Hepburn', archetype: 'The Icon', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Audrey_Hepburn_1956.jpg/256px-Audrey_Hepburn_1956.jpg' },
  'sophia-loren': { name: 'Sophia Loren', archetype: 'The Fire', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sophia_Loren_1960.jpg/256px-Sophia_Loren_1960.jpg' },
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const personaId = params.personaId as string;
  const persona = personas[personaId];
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!persona) {
      router.push('/office');
      return;
    }

    // Load or create chat session
    loadChatSession();

    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [personaId]);

  const loadChatSession = async () => {
    try {
      // Check for existing session in localStorage
      const storedSession = localStorage.getItem(`chat_session_${personaId}`);
      if (storedSession) {
        const sessionData = JSON.parse(storedSession);
        setSessionId(sessionData.sessionId);
        setMessages(sessionData.messages || []);
      } else {
        // Create new session
        const response = await fetch('/api/office/chat/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ personaId }),
        });
        const data = await response.json();
        setSessionId(data.sessionId);
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/office/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          personaId,
          message: userMessage.content,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantMessage += parsed.content;
                setMessages((prev) => prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: assistantMessage }
                    : msg
                ));
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      // Save to localStorage
      const updatedMessages = [...messages, userMessage, {
        id: assistantMessageId,
        role: 'assistant',
        content: assistantMessage,
        createdAt: new Date(),
      }];
      localStorage.setItem(`chat_session_${personaId}`, JSON.stringify({
        sessionId,
        messages: updatedMessages,
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  if (!persona) return null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Header */}
      <div className="bg-white elegant-shadow sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/office" className="text-[#2E6B8A] hover:text-[#C9A227] transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            {!imageError ? (
              <Image
                src={persona.imageUrl}
                alt={persona.name}
                fill
                className="object-cover persona-image"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-[#E8F4F8] flex items-center justify-center">
                <span className="text-[#2E6B8A] font-headline text-lg">{persona.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="font-headline text-[#2D2D2D] text-lg">{persona.name}</h1>
            <p className="text-sm text-[#2E6B8A]">{persona.archetype}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#2D2D2D] font-body"
              >
                <p className="text-lg mb-2">Start a conversation with {persona.name}</p>
                <p className="text-sm text-[#2E6B8A]">{persona.archetype}</p>
              </motion.div>
            )}
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {!imageError ? (
                      <Image
                        src={persona.imageUrl}
                        alt={persona.name}
                        fill
                        className="object-cover persona-image"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E8F4F8] flex items-center justify-center">
                        <span className="text-[#2E6B8A] font-headline text-sm">{persona.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-[#2E6B8A] text-white'
                      : 'bg-white text-[#2D2D2D] elegant-shadow'
                  }`}
                >
                  <p className="font-body whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white elegant-shadow border-t border-[#E8F4F8]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-lg border border-[#E8F4F8] focus:outline-none focus:ring-2 focus:ring-[#2E6B8A] focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-[#2E6B8A] text-white rounded-lg hover:bg-[#1e4d63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
