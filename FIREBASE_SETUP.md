# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for the Email & Password Sign-In functionality.

## Prerequisites

- A Firebase account (sign up at https://firebase.google.com)
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Email/Password Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **Get started** (if you haven't enabled Authentication yet)
3. Click on the **Sign-in method** tab
4. Click on **Email/Password**
5. Enable the first toggle (Email/Password) and click **Save**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to the "Your apps" section
4. If you don't have a web app yet, click the **</>** (web) icon to add one
5. Register your app with a nickname (e.g., "Socon Distributors")
6. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example` if it exists)
2. Add your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

**Important:** All Firebase environment variables must be prefixed with `VITE_` for Vite to expose them to the client-side code.

## Step 5: Create Test Users (Optional)

1. In Firebase Console, go to **Authentication** > **Users**
2. Click **Add user** to manually create test accounts
3. Or use the sign-up functionality in the app (if implemented)

## Step 6: Test the Login

1. Start your development server: `npm run dev`
2. Click the "PORTAL LOGIN" button in the navbar
3. Enter your test user credentials
4. You should be successfully signed in!

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure all environment variables are set correctly
- Restart your dev server after adding/changing `.env` variables
- Verify the variable names start with `VITE_`

### "Firebase: Error (auth/invalid-api-key)"
- Double-check your API key in the `.env` file
- Ensure there are no extra spaces or quotes around the values

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add your local domain (e.g., `localhost`) if not already present

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- For production, set these variables in your hosting platform's environment settings (e.g., Vercel)

## Next Steps

After setting up authentication, you can:
- Add user profile management
- Implement role-based access control
- Add password reset functionality
- Integrate with protected routes/pages
