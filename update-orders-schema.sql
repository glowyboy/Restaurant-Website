-- Add customer information columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS customer_name TEXT,
ADD COLUMN IF NOT EXISTS customer_phone TEXT,
ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- Add comment
COMMENT ON COLUMN orders.customer_name IS 'Customer full name';
COMMENT ON COLUMN orders.customer_phone IS 'Customer phone number with country code';
COMMENT ON COLUMN orders.delivery_address IS 'Full delivery address';
