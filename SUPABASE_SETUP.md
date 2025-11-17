# Supabase Setup Instructions

## Database Setup

1. Go to your Supabase project: https://ecfrmrhokwtvicvucang.supabase.co

2. Navigate to the SQL Editor in your Supabase dashboard

3. Copy and paste the entire content of `supabase-schema.sql` file into the SQL Editor

4. Click "Run" to execute the SQL script

This will create:
- **dishes** table: Stores all available dishes with name, image, and price
- **plans** table: Stores meal plans with pricing and popularity flag
- **orders** table: Stores customer orders with items and contact information

## What the SQL Script Does

### Creates Tables
- `dishes`: Menu items with images and prices
- `plans`: Subscription plans (2-8 meals per week)
- `orders`: Customer orders with JSON items array

### Inserts Sample Data
- 12 sample dishes with Unsplash images
- 7 meal plans (2-8 meals/week)
- The "3 repas / semaine" plan is marked as popular

### Security
- Enables Row Level Security (RLS) on all tables
- Allows public read access to dishes and plans
- Allows public insert and read on orders

## Environment Variables

The `.env` file has been created with your Supabase credentials:
```
VITE_SUPABASE_URL=https://ecfrmrhokwtvicvucang.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Features Implemented

### 1. Menu Page (Plans)
- Fetches meal plans from Supabase `plans` table
- Displays which plan is popular (from `is_popular` field)
- Shows loading state while fetching

### 2. Available Dishes Page
- Fetches all dishes from Supabase `dishes` table
- Displays dish images from database
- Shows loading state while fetching

### 3. Menu Carousel (Homepage)
- Fetches first 6 dishes from Supabase
- Auto-scrolling carousel with database images

### 4. Shopping Cart
- Stores items in localStorage
- When user clicks "Passer la commande":
  - Shows contact form (email/phone)
  - Saves order to Supabase `orders` table
  - Clears cart after successful order
  - Shows order confirmation with order ID

## Testing the Integration

1. Run the SQL script in Supabase
2. Start the development server: `npm run dev`
3. Navigate to the menu page
4. Add items to cart
5. Click cart icon and proceed to checkout
6. Enter email/phone and confirm order
7. Check your Supabase `orders` table to see the saved order

## Customizing Data

### Add More Dishes
```sql
INSERT INTO dishes (name, image, price) VALUES
  ('New Dish', 'https://images.unsplash.com/photo-xxxxx', 15.00);
```

### Change Popular Plan
```sql
UPDATE plans SET is_popular = false WHERE is_popular = true;
UPDATE plans SET is_popular = true WHERE meals = 5;
```

### View Orders
```sql
SELECT * FROM orders ORDER BY created_at DESC;
```
