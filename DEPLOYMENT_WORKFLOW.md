# Deployment Workflow Guide

This guide outlines the recommended workflow for making changes and deploying to Vercel via GitHub.

## Quick Start Workflow

### 1. Pre-Flight Checks
```bash
# Check current branch (should be master)
git branch

# Check git status - ensure clean working directory
git status

# Pull latest changes (if working with others)
git pull origin master
```

### 2. Make Your Changes
- Edit files as needed
- Test locally: `npm run dev`
- Verify build works: `npm run build`

### 3. Commit and Push
```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Description of your changes"

# Push to GitHub (triggers Vercel auto-deployment)
git push origin master
```

### 4. Verify Deployment
- Check Vercel dashboard: https://vercel.com/dashboard
- Or run: `vercel ls` to see deployment status
- Visit: https://socon-nu.vercel.app

## Git Remotes

Your project has multiple remotes configured:
- `origin`: https://github.com/mrmoe28/eko-solar-distribution.git
- `socon`: https://github.com/mrmoe28/socon.git
- `socon2`: https://github.com/mrmoe28/socon2.git

**Note:** Make sure you're pushing to the correct remote that's connected to your Vercel project.

## Pre-Push Checklist

Before pushing, ensure:
- [ ] `npm run build` succeeds locally
- [ ] No TypeScript errors
- [ ] App works locally (`npm run dev`)
- [ ] All changes are committed
- [ ] You're on the correct branch (`master`)

## Vercel Configuration

The project includes `vercel.json` with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`

Vercel will automatically:
1. Detect the push to GitHub
2. Run `npm install`
3. Run `npm run build`
4. Deploy to production
5. Update the live site within 1-2 minutes

## Environment Variables

If you use environment variables (like `GEMINI_API_KEY`):
1. Add them in Vercel Dashboard → Project Settings → Environment Variables
2. Never commit `.env.local` files (already in `.gitignore`)

## Troubleshooting

### Build Fails on Vercel
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Ensure all dependencies are in `package.json`

### Deployment Not Triggering
1. Verify GitHub integration in Vercel dashboard
2. Check that you're pushing to the correct branch
3. Ensure the remote is connected to Vercel

### Quick Commands Reference
```bash
# Full workflow
git add . && git commit -m "Your message" && git push origin master

# Check deployment status
vercel ls

# View latest deployment logs
vercel logs

# Test build locally
npm run build

# Run dev server
npm run dev
```

