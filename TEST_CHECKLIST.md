# ✅ Testing Checklist

## Before You Start

- [ ] Run SQL script in Supabase SQL Editor (`supabase-schema.sql`)
- [ ] Verify tables created: `dishes`, `plans`, `orders`
- [ ] Start dev server: `npm run dev`

## Test Flow

### 1. Menu Selection
- [ ] Navigate to Menu page
- [ ] Click "Juste moi" (1 person)
- [ ] Click "1 seul repas"
- [ ] Choose "3 repas / semaine" plan
- [ ] Redirected to Available Dishes page

### 2. Add to Cart
- [ ] See 12 dishes loaded from Supabase
- [ ] Click "Ajouter au panier" on Msemen
- [ ] See flying animation
- [ ] Cart count updates to 1
- [ ] Add 2 more dishes
- [ ] Cart count shows 3

### 3. Review Cart
- [ ] Click cart icon (top right)
- [ ] See all 3 items in cart
- [ ] See "Votre Plan" section showing:
  - [ ] Plan: "3 repas / semaine"
  - [ ] Prix par plat: $13.70
  - [ ] Personnes: 1
  - [ ] Repas par jour: 1
- [ ] See correct total amount
- [ ] Test quantity buttons (+/-)
- [ ] Test remove button (trash icon)

### 4. Checkout
- [ ] Click "Payer avec Stripe"
- [ ] See "Mode Test Stripe" toast
- [ ] Button shows "Traitement..."
- [ ] Wait 2 seconds
- [ ] See "Paiement réussi! 🎉" message
- [ ] Cart closes automatically
- [ ] Cart count resets to 0

### 5. Verify in Supabase
- [ ] Open Supabase Table Editor
- [ ] Go to `orders` table
- [ ] See new order with:
  - [ ] `plan_name`: "3 repas / semaine"
  - [ ] `number_of_people`: 1
  - [ ] `meals_per_day`: 1
  - [ ] `items`: JSON array with all dishes
  - [ ] `total`: Correct amount
  - [ ] `status`: "paid"
  - [ ] `stripe_session_id`: test_session_xxxxx

## Edge Cases to Test

### Empty Cart
- [ ] Open cart without adding items
- [ ] See "Votre panier est vide" message
- [ ] Click "Continuer vos achats"

### Without Selecting Plan
- [ ] Go directly to Available Dishes (skip Menu)
- [ ] Add items to cart
- [ ] Open cart
- [ ] Plan section should not show (or show null)
- [ ] Payment should still work

### Multiple Items Same Dish
- [ ] Add same dish 3 times
- [ ] Cart should show quantity: 3
- [ ] Not 3 separate items

### Update Quantities
- [ ] Add dish to cart
- [ ] Open cart
- [ ] Click + button multiple times
- [ ] Verify quantity increases
- [ ] Click - button
- [ ] Verify quantity decreases
- [ ] Click - when quantity is 1
- [ ] Item should be removed

## Browser Console Checks

### No Errors
- [ ] Open browser DevTools (F12)
- [ ] Go through entire flow
- [ ] No red errors in console
- [ ] Only info/log messages

### Network Requests
- [ ] Check Network tab
- [ ] See Supabase API calls
- [ ] All return 200/201 status
- [ ] No 400/500 errors

## Database Verification Queries

### Check Dishes
```sql
SELECT COUNT(*) FROM dishes;
-- Should return: 12
```

### Check Plans
```sql
SELECT name, is_popular FROM plans;
-- Should show 7 plans, one marked popular
```

### Check Latest Order
```sql
SELECT 
  id,
  plan_name,
  number_of_people,
  meals_per_day,
  jsonb_array_length(items) as item_count,
  total,
  status
FROM orders
ORDER BY created_at DESC
LIMIT 1;
```

### Check Order Items Detail
```sql
SELECT 
  id,
  plan_name,
  jsonb_pretty(items) as items_detail
FROM orders
ORDER BY created_at DESC
LIMIT 1;
```

## Performance Checks

- [ ] Dishes load in < 1 second
- [ ] Plans load in < 1 second
- [ ] Cart opens instantly
- [ ] Flying animation is smooth
- [ ] No lag when adding items

## Mobile Testing (Optional)

- [ ] Open in mobile browser or DevTools mobile view
- [ ] All buttons are clickable
- [ ] Cart popup is readable
- [ ] Images load properly
- [ ] Checkout flow works

## Success Criteria

✅ All checkboxes above are checked
✅ No console errors
✅ Order appears in Supabase with all data
✅ Cart clears after payment
✅ User sees success message

## If Something Fails

1. Check browser console for errors
2. Verify SQL script ran completely
3. Check `.env` file exists with correct values
4. Verify Supabase URL and key are correct
5. Try clearing localStorage: `localStorage.clear()`
6. Refresh page and try again

## Quick Reset

To start fresh:
```javascript
// In browser console
localStorage.clear();
location.reload();
```

To reset database:
```sql
-- In Supabase SQL Editor
TRUNCATE orders RESTART IDENTITY CASCADE;
```

## Report Issues

If you find bugs, check:
- Browser console errors
- Network tab for failed requests
- Supabase logs
- Order data in database

Document:
- What you did
- What you expected
- What actually happened
- Any error messages
