# Stripe Integration Setup Guide

## 🎯 Overview

The restaurant website now uses Stripe for payment processing. Currently configured for **TEST MODE** with a simulated payment flow.

## 📋 What's Included in Orders

When a customer completes checkout, the order saved to Supabase includes:

### Order Information
- **Plan Details**: Selected meal plan (name, price, number of meals)
- **Customer Preferences**: 
  - Number of people (1 or 2)
  - Meals per day (1 or 2)
- **Cart Items**: All dishes with quantities and prices
- **Total Amount**: Complete order total
- **Payment Status**: pending → paid
- **Stripe Session ID**: For tracking (test mode generates fake IDs)

## 🚀 Quick Start (Test Mode)

### 1. Update Your .env File

Open `Restaurant Website/.env` and add your Stripe test key:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_actual_test_key_here
```

**Get your test key:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy the "Publishable key" (starts with `pk_test_`)
3. Paste it in your `.env` file

### 2. Run the Updated SQL

The database schema has been updated. Run this in Supabase SQL Editor:

```sql
-- Drop old orders table
DROP TABLE IF EXISTS orders CASCADE;

-- Create new orders table with plan info
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  plan_id INTEGER REFERENCES plans(id),
  plan_name TEXT,
  number_of_people INTEGER,
  meals_per_day INTEGER,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on orders" ON orders FOR SELECT USING (true);
```

### 3. Test the Flow

```bash
npm run dev
```

**Complete User Journey:**

1. **Choose Plan**
   - Go to Menu page
   - Select number of people (1 or 2)
   - Select meals per day (1 or 2)
   - Choose a meal plan
   - Plan info is saved to context

2. **Select Dishes**
   - Browse available dishes
   - Add items to cart
   - Cart stores items in localStorage

3. **Checkout**
   - Click cart icon
   - Review order summary showing:
     - Selected plan details
     - Number of people
     - Meals per day
     - All cart items
     - Total amount
   - Click "Payer avec Stripe"

4. **Payment (Test Mode)**
   - Order saved to Supabase with status "pending"
   - Simulated 2-second payment processing
   - Order status updated to "paid"
   - Cart cleared
   - Success message shown

## 🔍 Verify in Supabase

After completing a test order, check your Supabase `orders` table:

```sql
SELECT 
  id,
  plan_name,
  number_of_people,
  meals_per_day,
  items,
  total,
  status,
  created_at
FROM orders
ORDER BY created_at DESC
LIMIT 5;
```

You should see:
- ✅ Plan name (e.g., "3 repas / semaine")
- ✅ Number of people (1 or 2)
- ✅ Meals per day (1 or 2)
- ✅ Items array with all dishes
- ✅ Total amount
- ✅ Status: "paid"

## 🎨 Current Implementation (Test Mode)

The current implementation simulates Stripe payment:

```typescript
// Saves order to database
const orderData = {
  plan_id: selectedPlan?.id,
  plan_name: selectedPlan?.name,
  number_of_people: numberOfPeople,
  meals_per_day: mealsPerDay,
  items: [...],
  total: total,
  status: 'pending'
};

// Simulates 2-second payment
setTimeout(() => {
  // Updates status to 'paid'
  // Clears cart
  // Shows success message
}, 2000);
```

## 🚀 Production Setup (Real Stripe)

To enable real Stripe payments, you'll need to:

### 1. Create Stripe Checkout Session (Backend Required)

You'll need a backend endpoint to create Stripe sessions. Here's a Node.js example:

```javascript
// backend/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  const { items, orderId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.dish_name,
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
    metadata: {
      order_id: orderId,
    },
  });

  res.json({ sessionId: session.id });
});
```

### 2. Update Frontend to Use Real Stripe

```typescript
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY);

// Create checkout session
const response = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items, orderId }),
});

const { sessionId } = await response.json();

// Redirect to Stripe Checkout
await stripe.redirectToCheckout({ sessionId });
```

### 3. Handle Webhooks

Set up Stripe webhooks to update order status:

```javascript
app.post('/webhook', async (req, res) => {
  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.order_id;

    // Update order in Supabase
    await supabase
      .from('orders')
      .update({ 
        status: 'paid',
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent
      })
      .eq('id', orderId);
  }

  res.json({ received: true });
});
```

## 🧪 Test Cards (Stripe Test Mode)

When you implement real Stripe Checkout, use these test cards:

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 9995 | Declined |
| 4000 0025 0000 3155 | Requires authentication |

- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

## 📊 Order Data Structure

Example order in Supabase:

```json
{
  "id": 1,
  "plan_id": 3,
  "plan_name": "3 repas / semaine",
  "number_of_people": 2,
  "meals_per_day": 1,
  "items": [
    {
      "dish_id": 1,
      "dish_name": "Msemen",
      "quantity": 2,
      "price": 8.00
    },
    {
      "dish_id": 4,
      "dish_name": "Couscous Royal",
      "quantity": 1,
      "price": 18.00
    }
  ],
  "total": 34.00,
  "status": "paid",
  "stripe_session_id": "test_session_1234567890",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## 🔒 Security Notes

- ✅ Never commit `.env` file (already in `.gitignore`)
- ✅ Use test keys for development
- ✅ Use live keys only in production
- ✅ Validate webhooks with Stripe signatures
- ✅ Never expose secret keys in frontend code

## 📚 Resources

- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Supabase + Stripe Guide](https://supabase.com/docs/guides/integrations/stripe)
