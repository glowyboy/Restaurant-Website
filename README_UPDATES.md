# 🎉 Restaurant Website - Supabase + Stripe Integration

## What's New

This restaurant website now features complete Supabase database integration and Stripe payment processing (test mode).

## 🚀 Quick Start

1. **Setup Database**
   ```bash
   # Copy content from supabase-schema.sql
   # Paste into Supabase SQL Editor
   # Click Run
   ```

2. **Start Development**
   ```bash
   npm install
   npm run dev
   ```

3. **Test the Flow**
   - Visit http://localhost:8080
   - Choose a meal plan
   - Add dishes to cart
   - Complete checkout with Stripe (test mode)

## 📚 Documentation

| File | Description |
|------|-------------|
| `QUICK_START.md` | Step-by-step setup guide |
| `STRIPE_SETUP.md` | Stripe integration details |
| `FINAL_SUMMARY.md` | Complete implementation overview |
| `TEST_CHECKLIST.md` | Testing checklist |
| `SUPABASE_SETUP.md` | Database setup guide |
| `DATA_FLOW.md` | Data flow diagrams |

## ✨ Features

### Order Management
- ✅ Track selected meal plan
- ✅ Save number of people (1 or 2)
- ✅ Save meals per day (1 or 2)
- ✅ Complete cart with all dishes
- ✅ Total amount calculation

### Payment Processing
- ✅ Stripe integration (test mode)
- ✅ Simulated payment flow
- ✅ Order status tracking (pending → paid)
- ✅ No email/phone required
- ✅ Secure payment button

### Database Integration
- ✅ Dishes loaded from Supabase
- ✅ Plans loaded from Supabase
- ✅ Orders saved to Supabase
- ✅ Real-time cart updates
- ✅ Complete order history

## 🗄️ Database Schema

### Tables
- **dishes**: Menu items (12 Moroccan dishes)
- **plans**: Meal plans (2-8 meals/week)
- **orders**: Customer orders with full details

### Order Structure
```json
{
  "plan_name": "3 repas / semaine",
  "number_of_people": 2,
  "meals_per_day": 1,
  "items": [...],
  "total": 34.00,
  "status": "paid"
}
```

## 🎯 User Flow

```
Homepage → Menu Selection → Choose Plan → 
Browse Dishes → Add to Cart → Review Order → 
Pay with Stripe → Order Confirmed ✅
```

## 🔧 Environment Variables

Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_test_key
```

## 🧪 Test Mode

The app currently runs in test mode:
- Simulates Stripe payment (2 seconds)
- No real charges
- Generates test session IDs
- Perfect for development

## 📦 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payment**: Stripe (test mode)
- **State**: React Context API
- **Storage**: localStorage (cart)

## 🎨 Key Components

- `OrderContext`: Tracks plan selection
- `CartPopup`: Checkout with Stripe
- `Menu`: Plan selection flow
- `AvailableDishes`: Browse and add to cart
- `Header`: Cart icon with count

## 📊 Sample Data

### Dishes (12 total)
- Msemen ($8)
- Harira ($10)
- Briouats ($12)
- Couscous Royal ($18)
- Tagine d'Agneau ($20)
- Pastilla ($16)
- And 6 more...

### Plans (7 total)
- 2-8 meals per week
- $12.20 - $14.00 per meal
- "3 repas / semaine" marked as popular

## 🚀 Production Deployment

For production with real Stripe:
1. Set up backend API
2. Create Stripe Checkout sessions
3. Configure webhooks
4. Update environment variables
5. Deploy!

See `STRIPE_SETUP.md` for details.

## 🐛 Troubleshooting

**Dishes not loading?**
- Check Supabase connection
- Verify SQL script ran
- Check browser console

**Payment not working?**
- Check order creation in Supabase
- Verify context has plan data
- Check browser console

**Cart not updating?**
- Clear localStorage
- Refresh page
- Check event listeners

## 📝 Testing

Use `TEST_CHECKLIST.md` for complete testing guide.

Quick test:
```bash
npm run dev
# 1. Go to Menu
# 2. Select plan
# 3. Add dishes
# 4. Checkout
# 5. Check Supabase
```

## 🎓 Learn More

- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [React Context](https://react.dev/reference/react/useContext)
- [Vite Docs](https://vitejs.dev)

## 📄 License

This project was created with [Lovable](https://lovable.dev)

## 🤝 Support

Check the documentation files for detailed guides and troubleshooting.

---

**Ready to test?** Start with `QUICK_START.md`! 🚀
