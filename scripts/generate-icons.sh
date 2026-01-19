#!/bin/bash

# Script to generate app icons from logo.png
# Requires ImageMagick: brew install imagemagick (on macOS)

LOGO_PATH="public/logo.png"
ICONS_DIR="public/icons"

# Check if logo exists
if [ ! -f "$LOGO_PATH" ]; then
    echo "❌ Error: $LOGO_PATH not found!"
    echo "Please add your logo.png file to the /public folder first."
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found!"
    echo "Install it with: brew install imagemagick"
    exit 1
fi

echo "🖼️  Generating app icons from logo.png..."

# Generate all required icon sizes
sizes=(72 96 128 144 152 192 384 512)

for size in "${sizes[@]}"; do
    echo "Creating icon-${size}x${size}.png..."
    convert "$LOGO_PATH" -resize "${size}x${size}" -quality 100 "$ICONS_DIR/icon-${size}x${size}.png"
done

echo "✅ All icons generated successfully!"
echo "📁 Icons saved to: $ICONS_DIR"
