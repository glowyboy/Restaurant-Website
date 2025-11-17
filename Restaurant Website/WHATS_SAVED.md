# 📊 What Gets Saved to Supabase

## Complete Order Data Structure

When a customer completes checkout, here's EXACTLY what gets saved:

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
    },
    {
      "dish_id": 5,
      "dish_name": "Tagine d'Agneau",
      "quantity": 1,
      "price": 20.00
    }
  ],
  "total": 54.00,
  "status": "paid",
  "stripe_session_id": "test_session_1705318200000",
  "stripe_payment_intent": null,
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

## Field Breakdown

### Plan Information
| Field | Type | Example | Source |
|-------|------|---------|--------|
| `plan_id` | Integer | `3` | Selected plan ID from database |
| `plan_name` | Text | `"3 repas / semaine"` | Selected plan name |

### Customer Preferences
| Field | Type | Example | Source |
|-------|------|---------|--------|
| `number_of_people` | Integer | `2` | Menu page - Step 1 |
| `meals_per_day` | Integer | `1` | Menu page - Step 2 |

### Order Details
| Field | Type | Example | Source |
|-------|------|---------|--------|
| `items` | JSONB Array | `[{...}, {...}]` | Cart items from localStorage |
| `total` | Decimal | `54.00` | Calculated from all items |

### Payment & Status
| Field | Type | Example | Source |
|-------|------|---------|--------|
| `status` | Text | `"paid"` | Updated after payment |
| `stripe_session_id` | Text | `"test_session_..."` | Stripe session ID |
| `stripe_payment_intent` | Text | `null` | Stripe payment intent (future) |

### Metadata
| Field | Type | Example | Source |
|-------|------|---------|--------|
| `id` | BigInt | `1` | Auto-generated |
| `created_at` | Timestamp | `"2024-01-15T10:30:00Z"` | Auto-generated |

## Items Array Structure

Each item in the `items` array contains:

```json
{
  "dish_id": 1,
  "dish_name": "Msemen",
  "quantity": 2,
  "price": 8.00
}
```

### Item Fields
- **dish_id**: Reference to dish in `dishes` table
- **dish_name**: Name of the dish (for easy reading)
- **quantity**: How many of this dish
- **price**: Price per unit (not total)

## Example Scenarios

### Scenario 1: Single Person, One Meal
```json
{
  "plan_name": "2 repas / semaine",
  "number_of_people": 1,
  "meals_per_day": 1,
  "items": [
    {"dish_id": 1, "dish_name": "Msemen", "quantity": 1, "price": 8.00},
    {"dish_id": 2, "dish_name": "Harira", "quantity": 1, "price": 10.00}
  ],
  "total": 18.00
}
```

### Scenario 2: Two People, Two Meals
```json
{
  "plan_name": "5 repas / semaine",
  "number_of_people": 2,
  "meals_per_day": 2,
  "items": [
    {"dish_id": 4, "dish_name": "Couscous Royal", "quantity": 3, "price": 18.00},
    {"dish_id": 5, "dish_name": "Tagine d'Agneau", "quantity": 2, "price": 20.00}
  ],
  "total": 94.00
}
```

### Scenario 3: No Plan Selected (Direct to Dishes)
```json
{
  "plan_id": null,
  "plan_name": null,
  "number_of_people": null,
  "meals_per_day": null,
  "items": [
    {"dish_id": 6, "dish_name": "Pastilla", "quantity": 1, "price": 16.00}
  ],
  "total": 16.00
}
```

## How to View in Supabase

### View All Orders
```sql
SELECT * FROM orders ORDER BY created_at DESC;
```

### View Order with Pretty JSON
```sql
SELECT 
  id,
  plan_name,
  number_of_people,
  meals_per_day,
  jsonb_pretty(items) as items,
  total,
  status,
  created_at
FROM orders
ORDER BY created_at DESC;
```

### Count Orders by Plan
```sql
SELECT 
  plan_name,
  COUNT(*) as order_count,
  SUM(total) as total_revenue
FROM orders
WHERE plan_name IS NOT NULL
GROUP BY plan_name
ORDER BY order_count DESC;
```

### Get Order Details
```sql
SELECT 
  o.id,
  o.plan_name,
  o.number_of_people,
  o.meals_per_day,
  jsonb_array_length(o.items) as item_count,
  o.total,
  o.status,
  o.created_at
FROM orders o
WHERE o.id = 1;
```

### Extract Items from Order
```sql
SELECT 
  id,
  jsonb_array_elements(items) as item
FROM orders
WHERE id = 1;
```

## Data Flow

```
User Actions                    Saved To
─────────────────────────────────────────────────
1. Select "Juste moi"      →   OrderContext
2. Select "1 seul repas"   →   OrderContext
3. Choose plan             →   OrderContext
4. Add dishes to cart      →   localStorage
5. Click "Payer"           →   Supabase orders table
   - Plan info from context
   - Cart items from localStorage
   - Status: "pending"
6. Payment completes       →   Update Supabase
   - Status: "paid"
   - stripe_session_id
7. Cart cleared            →   localStorage.clear()
```

## What's NOT Saved

❌ Customer email (removed)
❌ Customer phone (removed)
❌ Shipping address (not implemented)
❌ Payment method details (handled by Stripe)
❌ Individual dish images (reference by dish_id)

## What IS Saved

✅ Complete plan selection
✅ User preferences (people, meals)
✅ All cart items with quantities
✅ Total order amount
✅ Payment status
✅ Stripe session tracking
✅ Order timestamp

## Privacy & Security

- No personal information stored
- No payment card details (handled by Stripe)
- Order data is anonymous
- Can be linked to user account in future
- RLS policies control access

## Future Enhancements

Possible additions to order data:
- Customer user_id (if auth added)
- Delivery address
- Delivery date/time
- Special instructions
- Promo code used
- Discount amount
- Tax amount
- Delivery fee

## Summary

Every order captures:
1. **What plan** they chose
2. **How many people** it's for
3. **How many meals** per day
4. **Which dishes** they ordered
5. **How much** they paid
6. **When** they ordered
7. **Payment status**

All stored in a single row in the `orders` table! 🎉
