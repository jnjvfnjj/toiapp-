# Google OAuth Configuration Guide

## Obtain Google Client ID

Follow these steps to get your Google OAuth 2.0 credentials:

### 1. Create a Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Click the project dropdown at the top
- Click "New Project"
- Enter project name (e.g., "ToiApp")
- Click "Create"

### 2. Enable Google Identity Services API
- In the Console, go to "APIs & Services" > "Library"
- Search for "Google Identity"
- Click on "Google Identity Services"
- Click "Enable"

### 3. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth client ID"
- Select "Web application"
- Under "Authorized redirect URIs", add:
  - `http://localhost:3000`
  - `http://127.0.0.1:3000`
  - `https://your-domain.com` (production domain)
- Click "Create"
- Copy the **Client ID** (you'll need it)

### 4. Configure Your Application

#### Development:
Create a `.env` file in `templates/` directory:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

#### Production:
Set the environment variable on your hosting platform:
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 5. Test the Integration
- Run `npm run dev` in the `templates/` directory
- Try to register or sign in with Google
- You should see real Google account selection

## Troubleshooting

### "Google Client ID not set" error
- Make sure `.env` file exists in `templates/` directory
- Verify the environment variable is `VITE_GOOGLE_CLIENT_ID`
- Run `npm run dev` to restart the dev server

### Google button not showing
- Check browser console for errors
- Verify Client ID is correct
- Make sure Google Identity Services script loaded in HTML

### "Unauthorized redirect URI" error
- Go to Google Cloud Console > Credentials
- Check your OAuth 2.0 credential settings
- Add the current URL to "Authorized redirect URIs"
- Wait a few minutes for changes to propagate

## Architecture

The Google OAuth integration uses:
- **Frontend**: Google Identity Services SDK
- **Backend**: JWT token generation with email-based user creation
- **Flow**: 
  1. User clicks Google Sign-In button
  2. Google SDK opens authentication dialog
  3. Returns JWT credential token
  4. Frontend sends email + name to backend
  5. Backend creates/updates user and returns access token

## Security Notes

- Tokens are parsed only on frontend (JWT decoding)
- Backend never stores Google tokens
- Backend creates local User objects for all OAuth users
- Passwords are not required for Google OAuth users
