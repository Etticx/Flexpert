# Simple Deployment Guide for Flexpert with AI Chat

## Quick Setup (2 Steps!)

### 1. Get Your Gemini API Key
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a new API key (it's free!)
- Copy the key

### 2. Update the Code
Open `app.js` and replace this line:
```javascript
const GEMINI_API_KEY = 'AIzaSyBHcWJYQJYQJYQJYQJYQJYQJYQJYQJYQJY'; // Replace with your actual API key
```

With your actual API key:
```javascript
const GEMINI_API_KEY = 'your_actual_api_key_here';
```

## Deploy Anywhere! 🚀

Since this is now a pure client-side app, you can deploy it anywhere:

### Option 1: Vercel (Recommended)
```bash
vercel --prod
```

### Option 2: Netlify
- Drag and drop your folder to [netlify.com/drop](https://netlify.com/drop)

### Option 3: GitHub Pages
- Push to GitHub
- Enable Pages in repository settings

### Option 4: Any Static Host
- Upload files to any web server
- Works with Surge, Firebase Hosting, etc.

## Testing the Chat Feature

1. Complete the fitness questionnaire
2. On the results page, scroll down to see the AI chat section
3. Try asking questions like:
   - "How do I perform squats correctly?"
   - "What should I eat before my workout?"
   - "Can you explain my workout plan?"
   - "How often should I rest?"

## Why This Approach?

✅ **Super Simple**: No environment variables or serverless functions  
✅ **Deploy Anywhere**: Works on any static hosting platform  
✅ **Free**: Gemini free tier is very generous  
✅ **Fast**: Direct API calls, no middleware  
✅ **Reliable**: Fewer moving parts = fewer things to break  

## Security Note

Since you're using the free tier anyway, having the API key in client-side code is totally fine. Google's free tier has built-in rate limiting and quotas that prevent abuse.

## Troubleshooting

**Chat not working?**
- Check browser console for errors
- Make sure you replaced the API key correctly
- Verify you have internet connection

**API quota exceeded?**
- Gemini free tier is very generous, but if you hit limits, just wait or upgrade

## Cost Considerations

- Gemini 1.5 Flash free tier: 15 requests per minute, 1,500 requests per day
- Perfect for personal projects and demos
- Monitor usage in [Google AI Studio](https://makersuite.google.com)