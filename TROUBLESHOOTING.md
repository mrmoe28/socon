# Troubleshooting Guide

## Tailwind CSS CDN Warning Fix

### Problem
Console warning: "cdn.tailwindcss.com should not be used in production"

### Solution
Replace Tailwind CDN with proper installation:

1. **Install dependencies:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

2. **Create `tailwind.config.js`** with your custom theme configuration

3. **Create `postcss.config.js`** to process Tailwind CSS

4. **Create CSS file** (`src/index.css`) with Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Import CSS in entry point** (`index.tsx`):
   ```typescript
   import './src/index.css';
   ```

6. **Remove CDN script** from `index.html` and move inline styles to CSS file

## Vite WebSocket Connection Errors

### Problem
WebSocket connection to 'ws://localhost:3000/' failed

### Solution
Ensure proper HMR (Hot Module Replacement) configuration in `vite.config.ts`:

```typescript
server: {
  port: 3000,
  host: '0.0.0.0',
  hmr: {
    protocol: 'ws',
    host: 'localhost',
  },
}
```

This explicitly configures the WebSocket protocol for HMR connections.

### Additional Notes
- Make sure the dev server is running: `npm run dev`
- If port 3000 is in use, Vite will automatically try the next available port
- WebSocket errors can also occur if the server restarts - this is normal during development

