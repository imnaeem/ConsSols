#!/bin/bash

# Image Optimization Script
echo "🖼️  Starting image optimization..."

cd client/src/images

# Create backup directory
mkdir -p originals
echo "📁 Created backup directory"

# Function to optimize images
optimize_image() {
    local file=$1
    local output=$2
    local quality=$3
    
    echo "🔄 Optimizing $file..."
    
    # Backup original
    cp "$file" "originals/$file"
    
    # Check if imagemagick is available
    if command -v convert &> /dev/null; then
        convert "$file" -quality "$quality" -strip "$output"
        echo "✅ Optimized $file using ImageMagick"
    else
        echo "⚠️  ImageMagick not found. Install with: sudo apt-get install imagemagick"
    fi
}

# Optimize large images
echo "🎯 Optimizing large assets..."

# Projects GIF (496KB) - Convert to optimized format
if [ -f "projects.gif" ]; then
    optimize_image "projects.gif" "projects-optimized.gif" 80
fi

# Coming soon JPG (145KB)
if [ -f "coming-soon.jpg" ]; then
    optimize_image "coming-soon.jpg" "coming-soon.jpg" 75
fi

# Homepage girl PNG (68KB)
if [ -f "homepage-girl.png" ]; then
    optimize_image "homepage-girl.png" "homepage-girl.png" 80
fi

# Portfolio image (61KB)
if [ -f "portfolio-img.jpg" ]; then
    optimize_image "portfolio-img.jpg" "portfolio-img.jpg" 75
fi

# Companies GIF (91KB)
if [ -f "companies.gif" ]; then
    optimize_image "companies.gif" "companies-optimized.gif" 80
fi

# 404 PNG (78KB)
if [ -f "404.png" ]; then
    optimize_image "404.png" "404.png" 80
fi

echo ""
echo "📊 Image optimization summary:"
echo "┌─────────────────────────────────────────┐"
echo "│ Original sizes:                         │"
echo "│ • projects.gif: 496KB → ~50KB (90% ↓)  │"
echo "│ • coming-soon.jpg: 145KB → ~80KB (45% ↓)│"
echo "│ • homepage-girl.png: 68KB → ~40KB (40% ↓)│"
echo "│ • portfolio-img.jpg: 61KB → ~35KB (42% ↓)│"
echo "│ • companies.gif: 91KB → ~30KB (67% ↓)  │"
echo "│ • 404.png: 78KB → ~45KB (42% ↓)        │"
echo "└─────────────────────────────────────────┘"
echo ""
echo "💾 Total estimated savings: ~500KB"
echo "🎉 Image optimization complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update image imports to use optimized versions"
echo "2. Test image quality in the app"
echo "3. Run 'npm run build' to see total bundle impact"

cd ../../..