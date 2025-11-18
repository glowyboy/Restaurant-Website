# Checkout Form Features

## Phone Number Input

The checkout form uses `react-phone-number-input` which provides:
- **International phone numbers** with country flags
- **Automatic formatting** based on country
- **Country selection dropdown** with flags
- **Validation** for phone number format
- **Default country**: Canada (CA)

### Supported Countries
All countries are supported with their respective:
- Country flags
- Dialing codes (+1, +33, etc.)
- Phone number formats

## Address Input

The address input is a simple text field where customers can enter their full delivery address.

### Future Enhancement: Google Maps Autocomplete (Optional)

If you want to add address autocomplete in the future:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the **Places API**
3. Add the script to `index.html`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```
4. Update `CheckoutForm.tsx` to use Google Places Autocomplete

**Note**: Google Maps API has costs after the free tier ($200/month free, then $2.83 per 1,000 requests)

## Form Validation

The form validates:
- ✅ Full name (required)
- ✅ Phone number (required, with format validation)
- ✅ Complete address (required)
- ✅ City (required)
- ✅ Postal code (required)

All fields must be filled before proceeding to payment.
