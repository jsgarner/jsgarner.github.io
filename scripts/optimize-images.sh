#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed"
    echo "To install ImageMagick:"
    echo "  With Homebrew: brew install imagemagick"
    echo "  With MacPorts: sudo port install imagemagick"
    exit 1
fi

BASEDIR="/Volumes/Home One/_PORTFOLIO/Code/Website_2025"

# Check if images directory exists
if [ ! -d "$BASEDIR/images" ]; then
    echo "Error: Images directory not found at $BASEDIR/images"
    exit 1
fi

cd "$BASEDIR/images" || exit 1

# Create output directories if they don't exist
mkdir -p compressed

# Process each AVIF file
for file in *.avif; do
  if [ -f "$file" ]; then
    basename="${file%.*}"
    
    # Create 500px width version
    convert "$file" -resize 500x500\> "compressed/${basename}-p-500.avif"
    
    # Create 800px width version
    convert "$file" -resize 800x800\> "compressed/${basename}-p-800.avif"
    
    # Optimize original
    convert "$file" -quality 85% "compressed/${basename}.avif"
  fi
done

echo "Image optimization complete!"
