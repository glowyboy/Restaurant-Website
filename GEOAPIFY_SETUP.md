# Geoapify Address Autocomplete Setup

## Why Geoapify?
- ✅ **FREE** - 3,000 requests/day forever
- ✅ **No credit card** required
- ✅ **No billing** setup needed
- ✅ **Accurate** address validation
- ✅ **Auto-fills** city and postal code

## Get Your Free API Key (2 minutes)

1. Go to https://www.geoapify.com/
2. Click "Get Started for Free"
3. Sign up with email (no credit card needed)
4. Go to "My Projects" → "API Keys"
5. Copy your API key

## Add API Key to Your Project

### Option 1: Environment Variable (Recommended)
Add to `.env`:
```
VITE_GEOAPIFY_API_KEY=your_api_key_here
```

Then update `src/components/AddressAutocomplete.tsx`:
```typescript
const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY || '';
```

### Option 2: Direct in Code (Quick Test)
Replace in `src/components/AddressAutocomplete.tsx`:
```typescript
const apiKey = 'YOUR_ACTUAL_API_KEY';
```

## How It Works

1. **Customer types address**: "123 Main"
2. **Autocomplete suggests**: Real addresses from database
3. **Customer selects**: Address is validated
4. **Auto-fills**: City and postal code automatically filled
5. **Accurate delivery**: No typos, verified addresses only

## Features

- 🌍 Works for **Canada and US**
- 🏠 Validates **street addresses** only (no PO boxes)
- 🔍 Shows suggestions as you type
- ⚡ Fast response (< 100ms)
- 📍 Auto-fills city and postal code
- ✅ Prevents delivery errors

## Free Tier Limits

- **3,000 requests/day** = ~100 orders/day
- **No expiration** - free forever
- **No credit card** required
- **Upgrade available** if you need more

## Testing

1. Start typing: "123 Main"
2. See suggestions appear
3. Select an address
4. City and postal code auto-fill
5. ✅ Ready for delivery!

## Troubleshooting

### No suggestions appearing?
1. Check API key is correct
2. Check browser console for errors
3. Verify you have internet connection
4. Try a different address

### Wrong country suggestions?
The autocomplete is filtered to Canada and US only. If you need other countries, update the filter in `AddressAutocomplete.tsx`:
```typescript
filter: {
  countrycode: ['ca', 'us', 'fr'], // Add more countries
},
```

## Alternative: Google Maps Places API

If you prefer Google Maps (costs money after free tier):
- $200/month free
- Then $2.83 per 1,000 requests
- Requires credit card
- More features but more complex

Geoapify is recommended for most restaurants as it's completely free and works great!
