import { NextRequest, NextResponse } from 'next/server';
import { claudeClient } from '@/lib/claudeClient';
import { supabase } from '@/lib/supabase';

const getComedianPrompt = (comedian: string, category: string): string => {
  const basePrompts: Record<string, string> = {
    rodney: `You are Rodney Dangerfield. You are a legendary comedian known for "I don't get no respect!" Never break character. Deliver jokes in Rodney's style: self-deprecating, complaining about getting no respect, with his signature delivery.`,
    george: `You are George Carlin. You are a legendary comedian known for social commentary and truth-telling. Never break character. Deliver jokes in Carlin's style: sharp, observational, unapologetically honest, with biting social commentary.`,
    don: `You are Don Rickles. You are a legendary comedian known as "Mr. Warmth" and the master of insult comedy. Never break character. Deliver jokes in Rickles' style: sharp roasts, playful insults, with his signature wit and timing.`,
  };

  let prompt = basePrompts[comedian] || basePrompts.rodney;

  if (category === 'wajed') {
    prompt += `\n\nSpecial Instructions for "Wajed" category:
- Roast Wajed (Ahmad's son) about being "Hoover" (eating everything)
- Refer to him as "entrepreneur" (which means unemployed)
- Mention his "Melo" nickname (which Ahmad hates)
- Sarcastically mention he makes the "best eggs" in UAE
- CRITICAL: Refer to Wajed's partner as "fiancée" or "engagement" ONLY. Do NOT say he is married.
- Roast his philosophical speaking style and political satire posts
- Keep it playful and affectionate, like family humor`;
  }

  return prompt;
};

export async function POST(request: NextRequest) {
  try {
    const { comedian, category } = await request.json();

    if (!comedian || !category) {
      return NextResponse.json(
        { error: 'Comedian and category are required' },
        { status: 400 }
      );
    }

    // Check if joke exists in database
    const { data: existingJoke } = await supabase
      .from('jokes')
      .select('content')
      .eq('comedian', comedian as 'rodney' | 'george' | 'don')
      .eq('category', category as 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed')
      .limit(1)
      .single();

    if (existingJoke && 'content' in existingJoke) {
      return NextResponse.json({ joke: existingJoke.content });
    }

    // Generate new joke using Claude
    const systemPrompt = getComedianPrompt(comedian, category);
    const userPrompt = category === 'wajed'
      ? 'Tell me a roast joke about Wajed, Ahmad\'s son. Keep it playful and family-friendly.'
      : `Tell me a joke about ${category}. Keep it clean and funny.`;

    try {
      const message = await claudeClient.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      });

      const jokeContent = message.content[0].type === 'text' ? message.content[0].text : '';

      if (!jokeContent || jokeContent.trim().length === 0) {
        throw new Error('Empty joke content from Claude API');
      }

      // Save to database
      const { error: insertError } = await supabase.from('jokes').insert({
        comedian: comedian as 'rodney' | 'george' | 'don',
        category: category as 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed',
        content: jokeContent,
      });

      if (insertError) {
        console.error('Error saving joke to database:', insertError);
        // Still return the joke even if DB save fails
      }

      return NextResponse.json({ joke: jokeContent });
    } catch (apiError: any) {
      console.error('Claude API error:', apiError);
      const errorMessage = apiError?.message || 'Failed to generate joke';
      return NextResponse.json(
        { error: errorMessage, joke: null },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating joke:', error);
    return NextResponse.json(
      { error: 'Failed to generate joke' },
      { status: 500 }
    );
  }
}
