# 🚀 Quick Start Guide

## Step 1: Setup Supabase Database

### If this is your FIRST time:
1. Open your Supabase dashboard: https://supabase.com/dashboard/project/ecfrmrhokwtvicvucang
2. Click on "SQL Editor" in the left sidebar
3. Open the file `supabase-schema.sql` in this project
4. Copy ALL the SQL code and paste it into the Supabase SQL Editor
5. Click the "Run" button (or press Ctrl+Enter)
6. You should see success messages - your database is now ready! ✅

### If you ALREADY ran the SQL before:
1. Open your Supabase dashboard: https://supabase.com/dashboard/project/ecfrmrhokwtvicvucang
2. Click on "SQL Editor" in the left sidebar
3. Open the file `supabase-update-orders.sql` in this project
4. Copy ALL the SQL code and paste it into the Supabase SQL Editor
5. Click the "Run" button (or press Ctrl+Enter)
6. This will update ONLY the orders table with the new structure! ✅

## Step 1.5: Setup Stripe (Optional - Test Mode)

1. Go to https://dashboard.stripe.com/test/apikeys

2. Copy your "Publishable key" (starts with `pk_test_`)

3. Open `Restaurant Website/.env` file

4. Replace `pk_test_your_stripe_test_key_here` with your actual test key

**Note:** The app works in test mode without a real Stripe key - it simulates payment processing.

## Step 2: Start the Application

```bash
cd "Restaurant Website"
npm run dev
```

The app will open at: http://localhost:8080

## Step 3: Test the Integration

### Test Menu Plans
1. Click "Voir le menu complet" on homepage
2. Follow the steps to choose number of people and meals
3. You should see 7 plans loaded from Supabase
4. The "3 repas / semaine" plan shows "Populaire" badge

### Test Dishes
1. Click "Choisir le repas" on any plan
2. You should see 12 dishes loaded from Supabase with images
3. All images come from the database

### Test Cart & Orders
1. Click "Ajouter au panier" on any dish
2. Watch the flying animation
3. Click the cart icon (top right)
4. Review your order summary showing:
   - Your selected plan
   - Number of people
   - Meals per day
   - All cart items
5. Click "Payer avec Stripe"
6. Watch the simulated payment (2 seconds)
7. You should see a success message with order ID

### Verify Order in Supabase
1. Go back to Supabase dashboard
2. Click "Table Editor" → "orders"
3. You should see your order with:
   - Plan name and details
   - Number of people
   - Meals per day
   - All items in JSON format
   - Total amount
   - Status: "paid"

## 🎉 That's It!

Your restaurant website is now fully integrated with Supabase:
- ✅ Menu plans loaded from database
- ✅ Dishes loaded from database
- ✅ Orders saved to database
- ✅ Cart functionality working
- ✅ Customer contact info captured

## 📝 What's in the Database?

### Sample Dishes (12 total)
- Msemen ($8)
- Harira ($10)
- Briouats ($12)
- Couscous Royal ($18)
- Tagine d'Agneau ($20)
- Pastilla ($16)
- And 6 more...

### Meal Plans (7 total)
- 2 repas/semaine ($14/meal)
- 3 repas/semaine ($13.70/meal) ⭐ Popular
- 4 repas/semaine ($13.30/meal)
- Up to 8 repas/semaine ($12.20/meal)

## 🔧 Need to Customize?

### Add a New Dish
Go to Supabase SQL Editor and run:
```sql
INSERT INTO dishes (name, image, price) VALUES
  ('Zaalouk', 'https://images.unsplash.com/photo-xxxxx', 9.00);
```

### Change Popular Plan
```sql
UPDATE plans SET is_popular = false WHERE is_popular = true;
UPDATE plans SET is_popular = true WHERE meals = 5;
```

### View All Orders
```sql
SELECT * FROM orders ORDER BY created_at DESC;
```

## 🆘 Troubleshooting

**Problem**: Dishes not loading
- Check browser console for errors
- Verify SQL script ran successfully in Supabase
- Check .env file has correct credentials

**Problem**: Can't create order
- Check browser console for errors
- Verify orders table exists in Supabase
- Check RLS policies are enabled

**Problem**: Images not showing
- The SQL script uses Unsplash URLs
- If images don't load, you can update them in Supabase Table Editor
