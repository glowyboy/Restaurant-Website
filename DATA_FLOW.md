# 📊 Data Flow Diagram

## How Data Flows Through the Application

```
┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE DATABASE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐     │
│  │ dishes   │    │  plans   │    │     orders       │     │
│  ├──────────┤    ├──────────┤    ├──────────────────┤     │
│  │ id       │    │ id       │    │ id               │     │
│  │ name     │    │ name     │    │ customer_email   │     │
│  │ image    │    │ price    │    │ customer_phone   │     │
│  │ price    │    │ meals    │    │ items (JSONB)    │     │
│  │          │    │is_popular│    │ total            │     │
│  └──────────┘    └──────────┘    │ status           │     │
│                                   │ created_at       │     │
│                                   └──────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ▲                    ▲
                          │                    │
                    READ  │                    │ WRITE
                          │                    │
┌─────────────────────────┼────────────────────┼──────────────┐
│                         │                    │               │
│              SUPABASE CLIENT (src/lib/supabase.ts)          │
│                         │                    │               │
└─────────────────────────┼────────────────────┼──────────────┘
                          │                    │
                          ▼                    │
        ┌─────────────────────────────────────┼──────────────┐
        │                                      │               │
        │         REACT COMPONENTS             │               │
        │                                      │               │
        │  ┌────────────────────┐             │               │
        │  │  MenuCarousel      │◄────────────┘               │
        │  │  (Homepage)        │  Fetch 6 dishes             │
        │  └────────────────────┘                             │
        │                                                      │
        │  ┌────────────────────┐                             │
        │  │  Menu Page         │                             │
        │  │  (Choose Plan)     │  Fetch all plans            │
        │  └────────────────────┘                             │
        │                                                      │
        │  ┌────────────────────┐                             │
        │  │ AvailableDishes    │                             │
        │  │ (Browse & Add)     │  Fetch all dishes           │
        │  └────────────────────┘                             │
        │           │                                          │
        │           │ Add to Cart                              │
        │           ▼                                          │
        │  ┌────────────────────┐                             │
        │  │   localStorage     │                             │
        │  │   (cart items)     │                             │
        │  └────────────────────┘                             │
        │           │                                          │
        │           │ View Cart                                │
        │           ▼                                          │
        │  ┌────────────────────┐                             │
        │  │   CartPopup        │                             │
        │  │   (Review & Buy)   │                             │
        │  └────────────────────┘                             │
        │           │                                          │
        │           │ Checkout                                 │
        │           ▼                                          │
        │  ┌────────────────────┐                             │
        │  │  Contact Form      │                             │
        │  │  (Email/Phone)     │                             │
        │  └────────────────────┘                             │
        │           │                                          │
        │           │ Submit Order ─────────────────────────────┘
        │           ▼
        │  ┌────────────────────┐
        │  │  Order Confirmed   │
        │  │  Cart Cleared      │
        │  └────────────────────┘
        │
        └──────────────────────────────────────────────────────┘
```

## User Journey

### 1. Browse Menu (Homepage)
```
User visits homepage
    ↓
MenuCarousel fetches 6 dishes from Supabase
    ↓
Displays auto-scrolling carousel with dish images
```

### 2. Choose Plan
```
User clicks "Voir le menu complet"
    ↓
Menu page fetches all plans from Supabase
    ↓
User selects number of people (1 or 2)
    ↓
User selects meals per day (1 or 2)
    ↓
Displays 7 plans with "Populaire" badge on popular plan
    ↓
User clicks "Choisir le repas"
```

### 3. Select Dishes
```
AvailableDishes page fetches all dishes from Supabase
    ↓
Displays grid of dishes with images and prices
    ↓
User clicks "Ajouter au panier"
    ↓
Flying animation plays
    ↓
Item saved to localStorage
    ↓
Cart count updates in header
```

### 4. Review Cart
```
User clicks cart icon in header
    ↓
CartPopup opens
    ↓
Displays all items from localStorage
    ↓
User can:
  - Adjust quantities (+/-)
  - Remove items (trash icon)
  - Continue shopping
  - Proceed to checkout
```

### 5. Checkout
```
User clicks "Passer la commande"
    ↓
Contact form appears
    ↓
User enters email and/or phone
    ↓
User clicks "Confirmer"
    ↓
Order data prepared:
  {
    customer_email: "user@email.com",
    customer_phone: "+1234567890",
    items: [
      {
        dish_id: 1,
        dish_name: "Msemen",
        quantity: 2,
        price: 8.00
      },
      ...
    ],
    total: 16.00,
    status: "pending"
  }
    ↓
Order inserted into Supabase orders table
    ↓
Success! Order ID returned
    ↓
Cart cleared from localStorage
    ↓
Success toast shown with order ID
    ↓
CartPopup closes
```

## Data Storage

### Client-Side (localStorage)
- **cart**: Array of cart items
  - Temporary storage
  - Cleared after order confirmation
  - Persists across page refreshes

### Server-Side (Supabase)
- **dishes**: Permanent menu items
- **plans**: Permanent meal plans
- **orders**: Permanent order records
  - Includes customer contact info
  - Full order details in JSONB
  - Timestamp for tracking

## Security

### Row Level Security (RLS)
- **dishes**: Public read access
- **plans**: Public read access
- **orders**: Public insert and read access

### Environment Variables
- Supabase URL and API key stored in `.env`
- Not committed to git (in `.gitignore`)
- Loaded via Vite's `import.meta.env`
