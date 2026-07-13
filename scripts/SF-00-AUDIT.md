# SF-00 Audit Report

## Existing routes

- `/`
- `/about`
- `/admin`
- `/contact`
- `/gallery`
- `/qr/[id]`

## Missing routes that need to be built

Core routes checked in this audit:

- `/admin/login`
- `/customer`
- `/customer/login`

Additional routes referenced by the prompt packet but not present yet:

- `/admin/dashboard`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/orders`
- `/admin/marketing`
- `/admin/marketing/connect`
- `/customer/dashboard`
- `/customer/shop`
- `/customer/orders`
- `/customer/checkout`
- `/customer/checkout/success`
- `/api/auth/session`
- `/api/admin/products`
- `/api/admin/products/[id]`
- `/api/admin/orders/[id]/status`
- `/api/checkout/session`
- `/api/webhooks/stripe`
- `/api/admin/social/post`

## Firebase status

`Partially configured`

Findings:

- No `firebase` or `firebase-admin` package is installed in `package.json`.
- No repo Firebase init files were found such as `src/lib/firebase.ts` or `src/lib/firebase-admin.ts`.
- No `firebaseConfig` pattern was found in the codebase.
- No Firestore usage was found.
- The UI does reference externally hosted Firebase Storage image URLs in the frontend, which suggests Firebase-hosted assets exist outside this repo, but there is no application-level Firebase integration here yet.

## Stripe status

`Installed, but not configured`

Findings:

- `stripe` and `@stripe/stripe-js` are already present in `package.json`.
- No Stripe server/client config helpers were found.
- No Checkout Session API route or webhook handler exists.
- Existing checkout behavior is simulated client-side in `src/components/CheckoutPopup.tsx`.

## Auth status

`Not configured`

Findings:

- No `middleware.ts` file exists in the repo.
- No Firebase Auth setup exists.
- No session cookie route exists.
- No admin/customer route protection exists.

## Firestore collections referenced in codebase

- None found

## Existing order, product, and notification logic

### Product logic

- Static product catalog exists in `src/data/products.ts`.
- Menu/product rendering exists in UI components such as `src/components/Menu.tsx` and `src/components/MenuPopup.tsx`.
- No database-backed product CRUD exists.

### Order logic

- Basic client-side cart UI exists in `src/components/MenuPopup.tsx`.
- `src/components/CheckoutPopup.tsx` contains a simulated checkout flow using `setTimeout`, not real Stripe or order persistence.
- Contact forms in `src/components/Contact.tsx` and `src/app/contact/page.tsx` only log to console and show an alert.
- `src/app/gallery/page.tsx` contains a TODO for cart functionality.

### Notification logic

- No notification system, collection usage, or notification UI was found.

## Recommended dependency installs

Required for the prompt packet build:

- `firebase`
- `firebase-admin`
- `resend`
- `react-hot-toast`
- `react-firebase-hooks`

Already installed:

- `stripe`
- `@stripe/stripe-js`

## Recommended Firestore collections

- `products`
- `orders`
- `customers`
- `notifications`
- `socialPosts`
