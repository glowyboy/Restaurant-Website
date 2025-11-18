-- Check current RLS policies on dishes table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'dishes';

-- If no policies exist or they're too restrictive, run this:
-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON dishes;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON dishes;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON dishes;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON dishes;

-- Create new permissive policies
CREATE POLICY "Allow public read access" ON dishes
    FOR SELECT
    USING (true);

CREATE POLICY "Allow all operations for service role" ON dishes
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
