# Logo Setup Instructions

## Adding Your Logo to The Office PWA

You've provided the logo image with:
- Twin Faces Gemini symbol (two intertwined head profiles)
- AWD monogram in the center
- Golden line art style
- Dark blue background

## Steps to Add Logo

### 1. Save the Logo File

1. Save your logo image as `logo.png`
2. Place it in the `/public` folder:
   ```
   /public/logo.png
   ```

### 2. Create App Icons (Required for PWA)

You'll need to create app icons from your logo in these sizes:

- 72x72 pixels
- 96x96 pixels
- 128x128 pixels
- 144x144 pixels
- 152x152 pixels
- 192x192 pixels
- 384x384 pixels
- 512x512 pixels

**Recommended approach:**
1. Use your logo image
2. Remove or lighten the dark blue background (make it transparent or light)
3. Resize to each required size
4. Save as PNG files

**File naming:**
```
/public/icons/icon-72x72.png
/public/icons/icon-96x96.png
/public/icons/icon-128x128.png
/public/icons/icon-144x144.png
/public/icons/icon-152x152.png
/public/icons/icon-192x192.png
/public/icons/icon-384x384.png
/public/icons/icon-512x512.png
```

### 3. Quick Method: Use Icon Generation Script

After adding `logo.png` to `/public`:

```bash
# Option 1: Using Node.js script (requires sharp)
npm install sharp --save-dev
npm run generate-icons

# Option 2: Using ImageMagick shell script
chmod +x scripts/generate-icons.sh
./scripts/generate-icons.sh
```

### 4. Create Favicon

1. Create a 32x32 or 64x64 version of your logo
2. Save as `/public/favicon.ico` (or use PNG and update layout.tsx)

### 5. Logo Background Consideration

Since your logo has a dark blue background but the app uses a light theme:

**Option A: Use logo as-is**
- The logo will display with its dark background
- Works well on the light cream background (#FAF7F2)
- Creates nice contrast

**Option B: Create transparent version**
- Remove the dark blue background
- Make it transparent
- The golden AWD + Twin Faces will show on the light background
- More seamless integration

**Option C: Create light version**
- Replace dark blue with light blue (#E8F4F8) or cream (#FAF7F2)
- Maintains the logo's structure but matches the app theme

### 6. Update Favicon in Layout (if using PNG)

If you use a PNG favicon instead of ICO, update `src/app/layout.tsx`:

```tsx
icons: {
  icon: [
    { url: '/favicon.png', type: 'image/png' }
  ],
}
```

## Current Logo Usage

The logo is now integrated in:
- ✅ Splash screen (`/office` page)
- ✅ Logo component created (`src/components/common/Logo.tsx`)
- ⏳ App icons (you need to create these)
- ⏳ Favicon (you need to create this)

## Tools for Creating Icons

- **Online:** [Favicon.io](https://favicon.io/), [RealFaviconGenerator](https://realfavicongenerator.net/)
- **Photoshop/GIMP:** Resize and export as PNG
- **Command line:** Use ImageMagick or similar tools

## Quick Command Line (if you have ImageMagick)

```bash
# Create icons from logo.png
convert logo.png -resize 72x72 public/icons/icon-72x72.png
convert logo.png -resize 96x96 public/icons/icon-96x96.png
convert logo.png -resize 128x128 public/icons/icon-128x128.png
convert logo.png -resize 144x144 public/icons/icon-144x144.png
convert logo.png -resize 152x152 public/icons/icon-152x152.png
convert logo.png -resize 192x192 public/icons/icon-192x192.png
convert logo.png -resize 384x384 public/icons/icon-384x384.png
convert logo.png -resize 512x512 public/icons/icon-512x512.png
```

## Testing

After adding the logo:
1. Check splash screen shows logo
2. Verify app icons appear when installing PWA
3. Check favicon in browser tab

---

**Note:** The logo's dark blue background will create a nice contrast against the light cream background of the app. If you prefer a seamless look, create a transparent or light version.
