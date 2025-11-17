-- Update script for existing database
-- Run this if you already have dishes and plans tables

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

-- Verify the table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders'
ORDER BY ordinal_position;
