# Sweet Freak & Jollies

Sweet Freak & Jollies is a Next.js App Router storefront and operations portal for a candy-and-drinks brand. The repo now includes customer auth, admin auth, Firestore-backed products and orders, Stripe checkout, webhook-based order creation, and a lightweight social marketing module.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Auth, Firestore, and Storage
- Stripe Checkout + webhooks
- Resend for transactional email

## Main routes

### Public

- `/`
- `/about`
- `/contact`
- `/gallery`
- `/qr/[id]`

### Admin

- `/admin`
- `/admin/login`
- `/admin/dashboard`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/orders`
- `/admin/marketing`
- `/admin/marketing/connect`
- `/admin/settings`

### Customer

- `/customer`
- `/customer/login`
- `/customer/dashboard`
- `/customer/shop`
- `/customer/orders`
- `/customer/checkout`
- `/customer/checkout/success`

### API

- `/api/auth/session`
- `/api/admin/products`
- `/api/admin/products/[id]`
- `/api/admin/orders/[id]/status`
- `/api/admin/social/post`
- `/api/admin/social/connect`
- `/api/checkout/session`
- `/api/webhooks/stripe`

## Architecture

- `src/lib/firebase.ts`: client Firebase accessors
- `src/lib/firebase-admin.ts`: lazy Admin SDK accessors
- `src/lib/auth.ts`: session cookie verification and admin role checks
- `src/lib/firestore.ts`: shared Firestore helpers
- `src/lib/stripe.ts`: server Stripe client
- `src/context/CartContext.tsx`: customer cart persistence
- `src/components/admin/*`: admin navigation, order modal, notifications, marketing tools
- `src/components/customer/*`: shop, checkout, and customer orders UI

## Environment setup

1. Copy `.env.local.example` to `.env.local`.
2. Fill in Firebase, Stripe, Resend, and social credentials.
3. Install dependencies with `pnpm install` or your preferred package manager.
4. Generate Next route types with `next typegen`.
5. Run `next dev`.

## Verification

- `next typegen`
- `tsc --noEmit`
- `next build`

## Deployment

See [DEPLOYMENT.md](/Users/ehauga/Desktop/local%20dev/sweetfreak/DEPLOYMENT.md) for Vercel env vars, Stripe webhook setup, Firebase checklist, and Firestore rules.
