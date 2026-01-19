-- Location: supabase/migrations/20250120000000_the_office_pwa.sql
-- Module: The Office PWA - Core Tables
-- Dependencies: None

-- Personas table
CREATE TABLE IF NOT EXISTS public.personas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  archetype TEXT,
  system_prompt TEXT NOT NULL,
  opening_lines TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_url TEXT,
  gender TEXT CHECK (gender IN ('male', 'female')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Sessions table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  persona_id TEXT REFERENCES personas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jokes table
CREATE TABLE IF NOT EXISTS public.jokes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comedian TEXT NOT NULL CHECK (comedian IN ('rodney', 'george', 'don')),
  category TEXT NOT NULL CHECK (category IN ('marriage', 'aging', 'money', 'family', 'no_respect', 'truth', 'roast', 'wajed')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quotes table
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_persona_id ON public.chat_sessions(persona_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON public.chat_sessions(updated_at);
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON public.messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
CREATE INDEX IF NOT EXISTS idx_jokes_comedian_category ON public.jokes(comedian, category);
CREATE INDEX IF NOT EXISTS idx_quotes_category ON public.quotes(category);

-- Enable RLS (Row Level Security)
ALTER TABLE public.personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jokes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Public read access for personas (they're public data)
CREATE POLICY "allow_public_read_personas"
ON public.personas
FOR SELECT
TO public
USING (true);

-- Public access for chat sessions (single user app)
CREATE POLICY "allow_public_chat_sessions"
ON public.chat_sessions
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Public access for messages
CREATE POLICY "allow_public_messages"
ON public.messages
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Public read access for jokes
CREATE POLICY "allow_public_read_jokes"
ON public.jokes
FOR SELECT
TO public
USING (true);

-- Public read access for quotes
CREATE POLICY "allow_public_read_quotes"
ON public.quotes
FOR SELECT
TO public
USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for chat_sessions updated_at
CREATE TRIGGER update_chat_sessions_updated_at
BEFORE UPDATE ON public.chat_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for personas updated_at
CREATE TRIGGER update_personas_updated_at
BEFORE UPDATE ON public.personas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
