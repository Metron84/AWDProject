# Logo File Location

## Add Your Logo Here

1. **Save your logo image as:** `logo.png`
2. **Place it in this folder:** `/public/logo.png`
3. **The logo should be:**
   - PNG format
   - Square aspect ratio (recommended: 512x512 or larger)
   - Contains: AWD monogram + Twin Faces Gemini symbol
   - Golden line art style

## After Adding Logo

Once you've added `logo.png` to this folder:

1. **Generate app icons:**
   ```bash
   npm run generate-icons
   ```

2. **Or manually create icons** in sizes:
   - 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
   - Place them in `/public/icons/`

## Logo Display

The logo will automatically appear on:
- Splash screen (when app loads)
- Anywhere the `<Logo />` component is used

## Background Note

Your logo has a dark blue background. This will create a nice contrast against the light cream app background (#FAF7F2). If you prefer a seamless look, you can:
- Remove the dark blue background (make it transparent)
- Replace with light blue/cream to match app theme
