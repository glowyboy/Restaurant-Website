import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Dish {
    id: number;
    name: string;
    image: string;
    price: number;
    is_featured?: boolean;
    created_at?: string;
}

export interface DeliveryZone {
    id: number;
    name: string;
    display_order: number;
}

export interface Setting {
    key: string;
    value: string;
}

export interface Plan {
    id: number;
    name: string;
    price: number;
    meals: number;
    is_popular: boolean;
    created_at?: string;
}

export interface Order {
    id?: number;
    customer_email?: string;
    customer_phone?: string;
    items: OrderItem[];
    total: number;
    status?: string;
    created_at?: string;
}

export interface OrderItem {
    dish_id: number;
    dish_name: string;
    quantity: number;
    price: number;
}
