<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1wVome_lO1cnpOght1jgvxeXZ20ZGrZcO

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` (or create a new `.env` file)
   - Set the `GEMINI_API_KEY` to your Gemini API key
   - Configure Firebase credentials (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions)

3. Run the app:
   ```bash
   npm run dev
   ```

## Authentication Setup

This app includes Email & Password Sign-In functionality powered by Firebase Authentication. 

**To enable authentication:**
1. Follow the [Firebase Setup Guide](FIREBASE_SETUP.md)
2. Configure your Firebase credentials in the `.env` file
3. Restart your development server

The login modal can be accessed via the "PORTAL LOGIN" button in the navbar.
