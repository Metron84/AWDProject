# The Office - A Digital Sanctuary

A deeply personal Progressive Web App (PWA) built as a 70th birthday gift. The app serves as a digital sanctuary featuring AI conversations with historical/entertainment figures, curated news, business wisdom, and a personalized comedy club.

## 🎯 Project Overview

**Target Audience:** A 70-year-old Lebanese man, "Godfather" mentality, heart-leaning, appreciates elegance, wit, and respect.

**Tone:** "The Godfather" meets "Mediterranean Luxury." Warm, respectful, masculine, and playful.

## ✨ Features

### 1. Welcome System
- Dynamic time-based greeting (Morning/Afternoon/Evening)
- Rotating names: Ahmad, Armando, Chef Armando, Mr. Doumani, Chef
- "The Salon" style grid layout with 10 Gentlemen + 4 Ladies

### 2. Personas (14 AI Conversations)
- Chat with historical and entertainment figures
- Real portrait photos (black & white with gold border)
- Chat history saved in Supabase
- Branded "Share Card" functionality

**The Roster:**
- **Gentlemen:** Jack Nicholson, Steve Martin, Paul Newman, Robin Williams, Morgan Freeman, Sean Connery, Winston Churchill, Omar Sharif, Warren Buffett, Peter Sellers
- **Ladies:** Catherine Zeta-Jones, Andie MacDowell, Audrey Hepburn, Sophia Loren

### 3. Comedy Club
- 3 Comedians: Rodney Dangerfield, George Carlin, Don Rickles
- 8 Topics: Marriage, Aging, Money, Family, No Respect, Truth, The Roast, Wajed
- Special "Wajed" category with personalized roasts

### 4. Business Wisdom
- Quotes from Business Titans (Buffett, Drucker)
- Godfather quotes (Don/Michael Corleone)
- "Quote of the Day" format + Browse Archive

### 5. News Feed
- RSS integration from 8 sources:
  - Annahar (Lebanon)
  - BBC News, CNN, Reuters
  - Financial Times, Bloomberg
  - TIME Magazine, Variety

### 6. Special Events
- Birthday Mode: On May 25th, special birthday opening
- Daily Notification: Push notification at 8:00 AM with "Joke of the Day"

## 🛠️ Tech Stack

- **Framework:** Next.js 15.1.11 (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Supabase (PostgreSQL)
- **AI:** Anthropic Claude API (Claude 3.5 Sonnet)
- **Deployment:** Vercel
- **Platform:** PWA (Progressive Web App)

## 🎨 Design System

**Color Palette:**
- Primary Background: Warm Cream (#FAF7F2)
- Primary Accent: Mediterranean Blue (#2E6B8A)
- Highlight/Luxury: Warm Gold (#C9A227)
- Text: Deep Charcoal (#2D2D2D)

**Typography:**
- Headings: Cormorant Garamond (elegant Serif)
- Body: Inter (Clean Sans-Serif)

**Branding:**
- App Name: "The Office"
- Logo: "AWD" monogram + Twin Faces Gemini symbol
- Dedication: "Built with purpose and love by Wajed"

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Run database migration in Supabase SQL Editor
# File: supabase/migrations/20250120000000_the_office_pwa.sql

# Run development server
npm run dev
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

## 📱 PWA Installation

### iOS
1. Open Safari
2. Visit app URL
3. Share → "Add to Home Screen"

### Android
1. Open Chrome
2. Visit app URL
3. Menu → "Add to Home screen"

## 🔑 Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`

See `.env.example` for full list.

## 📝 Database Schema

Tables:
- `personas` - AI persona definitions
- `chat_sessions` - Chat session tracking
- `messages` - Chat message history
- `jokes` - Comedy club jokes
- `quotes` - Business wisdom quotes

## 🎨 Logo Setup

1. Add your logo as `public/logo.png`
2. Generate app icons: `npm run generate-icons`
3. See [LOGO_SETUP.md](./LOGO_SETUP.md) for details

## 📄 License

Private project - Built with purpose and love.

---

**Built with purpose and love by Wajed**
