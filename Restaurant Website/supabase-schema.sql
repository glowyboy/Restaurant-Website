-- Create dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  meals INTEGER NOT NULL,
  is_popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
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

-- Insert sample dishes with random images
INSERT INTO dishes (name, image, price) VALUES
  ('Msemen', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800', 8.00),
  ('Harira', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800', 10.00),
  ('Briouats', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800', 12.00),
  ('Couscous Royal', 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800', 18.00),
  ('Tagine d''Agneau', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800', 20.00),
  ('Pastilla', 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800', 16.00),
  ('Zaalouk', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800', 9.00),
  ('Rfissa', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', 15.00),
  ('Mechoui', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800', 22.00),
  ('Kefta Tagine', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', 17.00),
  ('Chicken Bastilla', 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800', 19.00),
  ('Moroccan Salad', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 7.00)
ON CONFLICT DO NOTHING;

-- Insert plans
INSERT INTO plans (name, price, meals, is_popular) VALUES
  ('2 repas / semaine', 14.00, 2, FALSE),
  ('3 repas / semaine', 13.70, 3, TRUE),
  ('4 repas / semaine', 13.30, 4, FALSE),
  ('5 repas / semaine', 12.50, 5, FALSE),
  ('6 repas / semaine', 12.40, 6, FALSE),
  ('7 repas / semaine', 12.30, 7, FALSE),
  ('8 repas / semaine', 12.20, 8, FALSE)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on dishes" ON dishes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on plans" ON plans FOR SELECT USING (true);

-- Create policies for orders
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read on orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public update on orders" ON orders FOR UPDATE USING (true);
