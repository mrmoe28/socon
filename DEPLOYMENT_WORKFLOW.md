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

**If Vercel is not auto-deploying from GitHub pushes:**

1. **Check Vercel Dashboard GitHub Integration:**
   - Go to https://vercel.com/dashboard
   - Select your project: **socon**
   - Navigate to **Settings** → **Git**
   - Verify the repository is connected to: `mrmoe28/eko-solar-distribution`
   - Ensure **Production Branch** is set to `master`

2. **If repository is NOT connected:**
   - Click **"Connect Git Repository"** or **"Change Git Repository"**
   - Select `mrmoe28/eko-solar-distribution` from the list
   - Confirm the branch is `master`
   - Save the changes

3. **If repository IS connected but still not deploying:**
   - Disconnect and reconnect the repository
   - Check GitHub webhook status in Vercel dashboard
   - Verify you're pushing to the correct remote: `origin` (https://github.com/mrmoe28/eko-solar-distribution.git)

4. **Manual Redeploy (Quick Fix):**
   - In Vercel Dashboard → **Deployments** tab
   - Click **"Redeploy"** on the latest deployment
   - This will deploy the latest code from GitHub

5. **Verify Git Remote:**
   ```bash
   git remote -v
   # Should show: origin → https://github.com/mrmoe28/eko-solar-distribution.git
   ```

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

