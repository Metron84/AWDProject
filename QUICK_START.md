# Quick Start Guide - The Office PWA

## ✅ Logo Status
Logo file is placed at `/public/logo.png` ✓

## 🚀 Next Steps

### 1. Install Dependencies
```bash
cd "AWD PROJECT"
npm install
```

This will install all dependencies including `sharp` for icon generation.

### 2. Generate App Icons
```bash
npm run generate-icons
```

This will create all required icon sizes (72x72 through 512x512) in `/public/icons/`

### 3. Set Environment Variables
Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 4. Run Database Migration
1. Go to Supabase Dashboard → SQL Editor
2. Run the file: `supabase/migrations/20250120000000_the_office_pwa.sql`
3. Verify tables are created

### 5. Test Locally
```bash
npm run dev
```

Visit `http://localhost:4028` - you should see:
- Splash screen with logo
- Welcome page with persona grid
- All features working

### 6. Deploy to Vercel
1. Push to GitHub: `https://github.com/Metron84/AWDProject`
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📱 PWA Installation

After deployment:
- **iOS:** Safari → Share → "Add to Home Screen"
- **Android:** Chrome → Menu → "Add to Home screen"

## ✅ Checklist

- [x] Logo file added (`/public/logo.png`)
- [ ] Dependencies installed (`npm install`)
- [ ] App icons generated (`npm run generate-icons`)
- [ ] Environment variables set (`.env` file)
- [ ] Database migration run (Supabase)
- [ ] Test locally (`npm run dev`)
- [ ] Push to GitHub
- [ ] Deploy to Vercel

---

**You're almost ready! Just install dependencies and generate icons.**
