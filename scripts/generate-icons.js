#!/usr/bin/env node

/**
 * Script to generate app icons from logo.png
 * Alternative to ImageMagick - uses sharp if available, otherwise provides instructions
 */

const fs = require('fs');
const path = require('path');

const LOGO_PATH = path.join(process.cwd(), 'public', 'logo.png');
const ICONS_DIR = path.join(process.cwd(), 'public', 'icons');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Check if logo exists
if (!fs.existsSync(LOGO_PATH)) {
  console.error('❌ Error: public/logo.png not found!');
  console.error('Please add your logo.png file to the /public folder first.');
  process.exit(1);
}

// Try to use sharp if available
try {
  const sharp = require('sharp');
  
  console.log('🖼️  Generating app icons from logo.png using sharp...');
  
  // Ensure icons directory exists
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }
  
  // Generate all icons
  Promise.all(
    sizes.map((size) => {
      const outputPath = path.join(ICONS_DIR, `icon-${size}x${size}.png`);
      console.log(`Creating icon-${size}x${size}.png...`);
      return sharp(LOGO_PATH)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 250, g: 247, b: 242, alpha: 1 }, // Warm cream background
        })
        .png({ quality: 100, compressionLevel: 9 })
        .toFile(outputPath);
    })
  )
    .then(() => {
      console.log('✅ All icons generated successfully!');
      console.log(`📁 Icons saved to: ${ICONS_DIR}`);
    })
    .catch((error) => {
      console.error('❌ Error generating icons:', error.message);
      console.log('\n💡 Alternative: Use the shell script with ImageMagick:');
      console.log('   chmod +x scripts/generate-icons.sh');
      console.log('   ./scripts/generate-icons.sh');
      process.exit(1);
    });
} catch (error) {
  console.log('⚠️  Sharp not installed. Installing...');
  console.log('   Run: npm install sharp --save-dev');
  console.log('\n💡 Alternative: Use ImageMagick with the shell script:');
  console.log('   chmod +x scripts/generate-icons.sh');
  console.log('   ./scripts/generate-icons.sh');
  process.exit(1);
}
