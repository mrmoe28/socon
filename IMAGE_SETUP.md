# Image Setup Guide

This guide explains how to replace the SVG placeholder images with your own product images.

## Quick Start

1. Place your PNG images in the `public/` directory
2. Use the exact filenames listed below
3. The app will automatically use your images instead of the SVG placeholders

## Required Images

Place these 7 PNG files in the `public/` directory:

| Filename | Product | Used In |
|----------|---------|---------|
| `pv-wire.png` | PV Wire (10 AWG) | Hero section, Product card |
| `roof-mount.png` | Roof Attachments | Hero section, Product card |
| `t-bolt.png` | T-Bolts SS304 | Hero section, Product card, Benefits section |
| `universal-clamp.png` | Universal Clamps | Product card |
| `structural-rail.png` | Structural Rail | Hero section, Product card, Benefits section |
| `lux-inverter.png` | LuxPower 6000XP Inverter | Hero section, Product card |
| `enphase-micro.png` | Enphase IQ8AC Microinverter | Product card |

## Image Locations in the App

### Hero Section (Floating Product Montage)
- **Structural Rail** - Main diagonal element (500px width)
- **PV Wire** - Background element (300px width, blurred)
- **LuxPower Inverter** - Bottom left feature (240px width)
- **T-Bolt** - Floating particle (120px width, blurred)
- **Roof Mount** - Bottom anchor (180px width)

### Product Cards (Inventory Section)
All 7 images are displayed in product cards with:
- Maximum height: 85% of card (300px on desktop)
- Object-fit: contain (maintains aspect ratio)
- Hover effects: Scale to 1.15x on hover

### Benefits Section
- **Structural Rail** - Order preview thumbnail (48x48px)
- **T-Bolt** - Order preview thumbnail (48x48px)

## Image Recommendations

### Format
- **File Format**: PNG (required)
- **Color Space**: RGB
- **Transparency**: Supported (use transparent backgrounds for best results)

### Dimensions
While the app will scale images automatically, recommended dimensions for optimal quality:

- **Product Images**: 800x800px to 1200x1200px (square format works best)
- **Aspect Ratio**: 1:1 (square) recommended, but any ratio will work
- **File Size**: Keep under 500KB per image for fast loading

### Best Practices
1. **Transparent Backgrounds**: Use PNG with transparency for clean integration
2. **High Resolution**: Start with high-res images (the app will scale down)
3. **Consistent Lighting**: Use similar lighting across all product photos
4. **Centered Subjects**: Center your products in the frame
5. **White/Neutral Backgrounds**: Works best with the dark theme

## How It Works

The app uses an `ImageWithFallback` component that:
1. First tries to load your image from `/filename.png`
2. If the image fails to load or doesn't exist, automatically falls back to the SVG placeholder
3. No code changes needed - just add your images to the `public/` folder

## File Structure

```
eko-solar-distribution-main/
├── public/
│   ├── pv-wire.png
│   ├── roof-mount.png
│   ├── t-bolt.png
│   ├── universal-clamp.png
│   ├── structural-rail.png
│   ├── lux-inverter.png
│   └── enphase-micro.png
└── ...
```

## Testing

After placing your images:
1. Start the development server: `npm run dev`
2. Navigate to the app in your browser
3. Check the Hero section and Product cards
4. If images don't appear, check:
   - Filenames match exactly (case-sensitive)
   - Files are in the `public/` directory (not `src/` or elsewhere)
   - Images are valid PNG files
   - Browser console for any loading errors

## Troubleshooting

**Images not showing?**
- Verify filenames match exactly (including case)
- Check that files are in `public/` directory, not `public/images/`
- Ensure images are valid PNG files
- Clear browser cache and hard refresh (Ctrl+Shift+R)

**Images look pixelated?**
- Use higher resolution source images
- Ensure images are at least 800x800px

**Images load but look wrong?**
- Check aspect ratio - square images work best
- Consider using transparent backgrounds
- Verify image orientation is correct

