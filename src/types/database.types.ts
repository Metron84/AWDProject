export interface Database {
  public: {
    Tables: {
      personas: {
        Row: {
          id: string;
          name: string;
          archetype: string | null;
          system_prompt: string;
          opening_lines: string[] | null;
          image_url: string | null;
          gender: 'male' | 'female' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          archetype?: string | null;
          system_prompt: string;
          opening_lines?: string[] | null;
          image_url?: string | null;
          gender?: 'male' | 'female' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          archetype?: string | null;
          system_prompt?: string;
          opening_lines?: string[] | null;
          image_url?: string | null;
          gender?: 'male' | 'female' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          persona_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          persona_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          persona_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          session_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          created_at?: string;
        };
      };
      jokes: {
        Row: {
          id: string;
          comedian: 'rodney' | 'george' | 'don';
          category: 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          comedian: 'rodney' | 'george' | 'don';
          category: 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          comedian?: 'rodney' | 'george' | 'don';
          category?: 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed';
          content?: string;
          created_at?: string;
        };
      };
      quotes: {
        Row: {
          id: string;
          author: string;
          content: string;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          author: string;
          content: string;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          author?: string;
          content?: string;
          category?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
