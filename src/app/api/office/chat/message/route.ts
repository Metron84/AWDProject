import { NextRequest } from 'next/server';
import { claudeClient } from '@/lib/claudeClient';
import { supabase } from '@/lib/supabase';
import { getPersonaPrompt } from '@/lib/personas/prompts';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, personaId, message } = await request.json();

    if (!sessionId || !personaId || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save user message to database
    await supabase.from('messages').insert({
      session_id: sessionId,
      role: 'user' as 'user' | 'assistant',
      content: message,
    });

    // Get conversation history (last 8 messages for context)
    const { data: history } = await supabase
      .from('messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(20);

    // Build conversation context (last 8 messages)
    const conversationHistory = (history?.slice(-8) || []).map((msg: { role: 'user' | 'assistant'; content: string }) => ({
      role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content,
    }));

    // Get system prompt from our prompts file
    const systemPrompt = getPersonaPrompt(personaId);

    // Create streaming response using Claude (Anthropic-compatible)
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messageStream = await claudeClient.messages.create({
            model: 'claude-3-5-sonnet-20241022', // Or use Claude's model name
            max_tokens: 1024,
            system: systemPrompt,
            messages: [
              ...conversationHistory,
              { role: 'user' as const, content: message },
            ],
            stream: true,
          });

          let fullResponse = '';
          for await (const chunk of messageStream) {
            if (chunk.type === 'content_block_delta' && 'delta' in chunk && chunk.delta && typeof chunk.delta === 'object' && 'type' in chunk.delta && chunk.delta.type === 'text' && 'text' in chunk.delta) {
              const text = chunk.delta.text as string;
              fullResponse += text;
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify({ content: text })}\n\n`)
              );
            }
          }

          // Save assistant response to database
          if (fullResponse.trim()) {
            await supabase.from('messages').insert({
              session_id: sessionId,
              role: 'assistant' as 'user' | 'assistant',
              content: fullResponse.trim(),
            });
          }

          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error: any) {
          console.error('Error in Claude stream:', error);
          console.error('Error details:', {
            message: error?.message,
            status: error?.status,
            error: error?.error,
          });
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in message route:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
