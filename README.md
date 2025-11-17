# 🍽️ Lamsalna Restaurant - Full Stack Application

Complete restaurant ordering system with customer website and admin dashboard.

## 📦 Project Structure

```
├── Restaurant Website/     # Customer-facing website (React + Vite)
└── restaurant dashboard/   # Admin dashboard (Next.js)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- npm or pnpm

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. **Setup Website**
```bash
cd "Restaurant Website"
npm install
cp .env.example .env
# Add your Supabase credentials to .env
npm run dev
```

3. **Setup Dashboard**
```bash
cd "restaurant dashboard"
npm install
cp .env.example .env.local
# Add your Supabase credentials to .env.local
npm run dev
```

4. **Setup Database**
- Run `supabase-schema.sql` in Supabase SQL Editor
- Run `settings-schema.sql` for settings
- Run `storage-setup.sql` for image uploads
- Run `enable-realtime.sql` for real-time updates

## 🌐 URLs

- **Website**: http://localhost:8080
- **Dashboard**: http://localhost:3000

## 📚 Documentation

- `QUICK_START.md` - Quick setup guide
- `FINAL_FEATURES_SUMMARY.md` - Complete features list
- `SUPABASE_OPTIMIZATION.md` - Performance & capacity info
- `CLEANUP_GUIDE.md` - Database maintenance

## ✨ Features

### Customer Website
- Browse menu from database
- Add items to cart
- Place orders with Stripe (test mode)
- View delivery zones
- Responsive design

### Admin Dashboard
- Real-time order updates
- Menu management (CRUD)
- Image upload for dishes
- Settings management
- Delivery zones management
- Analytics & charts

## 🔒 Security

- Environment variables in `.env` (not committed)
- Supabase RLS policies enabled
- Secure authentication ready

## 📊 Tech Stack

### Website
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Stripe

### Dashboard
- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase
- Recharts

## 🎯 Capacity

- 50-120k users/month on free tier
- Optimized for minimal bandwidth
- 3-month order retention
- Can run forever on free tier!

## 📝 License

Private - All rights reserved

## 🤝 Support

For issues or questions, check the documentation files.
