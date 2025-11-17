# 🚀 Run This SQL Script

Since you already have the database set up, you only need to update the `orders` table.

## Copy and Run This in Supabase SQL Editor:

```sql
-- Drop existing orders table and recreate with new structure
DROP TABLE IF EXISTS orders CASCADE;

-- Create new orders table with plan information
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

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public update on orders" ON orders FOR UPDATE USING (true);
```

## Steps:

1. Go to: https://supabase.com/dashboard/project/ecfrmrhokwtvicvucang
2. Click "SQL Editor" in the left sidebar
3. Copy the SQL code above
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see: "Success. No rows returned"

## What This Does:

- ✅ Drops the old `orders` table (if it exists)
- ✅ Creates new `orders` table with:
  - `plan_id` - Reference to selected plan
  - `plan_name` - Name of the plan
  - `number_of_people` - 1 or 2
  - `meals_per_day` - 1 or 2
  - `items` - JSONB array of dishes
  - `total` - Order total
  - `status` - pending/paid
  - `stripe_session_id` - Payment tracking
- ✅ Sets up security policies

## After Running:

Your database is ready! Now test the app:

```bash
npm run dev
```

1. Go to Menu page
2. Select number of people
3. Select meals per day
4. Choose a plan
5. Add dishes to cart
6. Click cart icon
7. Click "Payer avec Stripe"
8. Wait 2 seconds
9. Check Supabase orders table - you'll see all the data! 🎉

## Verify It Worked:

Run this query in Supabase SQL Editor:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders'
ORDER BY ordinal_position;
```

You should see all the new columns including `plan_name`, `number_of_people`, `meals_per_day`, etc.
