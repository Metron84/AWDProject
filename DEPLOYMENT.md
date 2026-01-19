# The Office PWA - Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
1. GitHub repository created and code pushed
2. Vercel account (free tier works)
3. Supabase project set up
4. Anthropic API key

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `https://github.com/Metron84/AWDProject`
4. Vercel will auto-detect Next.js 15

### Step 2: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### Step 3: Run Database Migration

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the migration file: `supabase/migrations/20250120000000_the_office_pwa.sql`
4. Verify tables are created: `personas`, `chat_sessions`, `messages`, `jokes`, `quotes`

### Step 4: Deploy

1. Click "Deploy" in Vercel
2. Wait for build to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-app.vercel.app`

### Step 5: Seed Initial Data (Optional)

You can seed personas, jokes, and quotes via Supabase SQL Editor or create a seed script.

## 📱 PWA Installation on Phone

### iOS (iPhone/iPad)
1. Open Safari (not Chrome)
2. Visit your Vercel URL
3. Tap Share button (square with arrow)
4. Select "Add to Home Screen"
5. Name it "The Office"
6. Tap "Add"

### Android
1. Open Chrome
2. Visit your Vercel URL
3. Tap menu (⋮) → "Add to Home screen" or "Install app"
4. Confirm installation

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your keys

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run serve
```

## 📋 Checklist Before Deployment

- [ ] All environment variables set in Vercel
- [ ] Database migration run in Supabase
- [ ] `npm run build` succeeds locally
- [ ] PWA manifest.json exists in `/public`
- [ ] Service worker configured (via next-pwa)
- [ ] App icons created (place in `/public/icons/`)
- [ ] Logo added to `/public/logo.png`
- [ ] Test on mobile device

## 🎨 Creating App Icons

You'll need to create app icons in these sizes:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

**Quick method:**
```bash
# After adding logo.png to /public
npm run generate-icons
```

Or use the shell script:
```bash
chmod +x scripts/generate-icons.sh
./scripts/generate-icons.sh
```

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (should be ≥18)
- Verify all dependencies in package.json
- Check for TypeScript errors

### PWA Not Installing
- Ensure HTTPS (Vercel provides this automatically)
- Check manifest.json is accessible at `/manifest.json`
- Verify service worker is registered

### API Errors
- Check environment variables in Vercel
- Verify Supabase RLS policies allow public access
- Check Anthropic API key is valid

## 📞 Support

For issues, check:
- Vercel deployment logs
- Supabase logs
- Browser console (F12)
