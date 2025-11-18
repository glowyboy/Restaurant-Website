# Google Maps API Setup Guide

## Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key

## Configure the API Key

### Option 1: Update index.html (Recommended for production)
Replace `YOUR_GOOGLE_MAPS_API_KEY` in `index.html` with your actual API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places" async defer></script>
```

### Option 2: Use Environment Variable (More secure)
1. Add to `.env`:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

2. Update `index.html` to use the env variable (requires build-time replacement)

## Restrict Your API Key (Important!)

1. In Google Cloud Console, go to your API key
2. Click "Edit API key"
3. Under "Application restrictions":
   - Choose "HTTP referrers (web sites)"
   - Add your domain: `https://yourdomain.com/*`
   - For development: `http://localhost:*`
4. Under "API restrictions":
   - Choose "Restrict key"
   - Select only "Places API"
5. Save

## Pricing

- Google Maps Places API has a free tier
- First $200/month is free (covers ~28,000 autocomplete requests)
- After that: $2.83 per 1,000 requests
- Monitor usage in Google Cloud Console

## Testing

The address autocomplete will:
- Show suggestions as you type
- Auto-fill city and postal code
- Work for Canada and US addresses
- Fallback to manual input if API fails

## Troubleshooting

If autocomplete doesn't work:
1. Check browser console for errors
2. Verify API key is correct
3. Ensure Places API is enabled
4. Check API key restrictions
5. Verify billing is enabled (required even for free tier)
