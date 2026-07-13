# Sweet Freak & Jollies — Codex Prompt Packet
## Deliver to: /Users/ehauga/Desktop/local dev/sweetfreak/scripts/sweetfreak_codex_prompts.md
## Google Drive copy: RAG Client Ops → sweetfreak → "SF — Codex Prompt Packet (Full Build)"
## Drive File ID: 1YC0ZXzWA2Fxkc_iD57mDSqC0L4ownZYFCDGdL0lTtws

---
## HOW TO USE THIS FILE

Each prompt below is a self-contained Codex instruction. Run them in order.
After each Codex run, Codex should write its session summary to:
  Google Drive → RAG Client Ops → _codex-logs → sweetfreak-log (ID: 1P4O_4QDZzSlEW_9ZIVNbXRs7tc79R-Ro)

Do NOT skip prompts. Each builds on the previous.

---

## PROMPT SF-00: AUDIT & SCAFFOLD REPORT

You are auditing the Next.js 14 App Router repo at the current working directory
(Sweet Freak & Jollies — ezrarag/sweetfreak).

Tasks:
1. List all existing routes under src/app/
2. Check whether /admin, /admin/login, /customer, /customer/login routes exist
3. Check whether Firebase is configured (look for firebase.ts, firebaseConfig, or firebase-admin)
4. Check whether Stripe is installed in package.json
5. Check whether any auth middleware exists (middleware.ts)
6. Check whether any Firestore collections are referenced in the codebase
7. Check for any existing order, product, or notification logic

Output a markdown report at scripts/SF-00-AUDIT.md with:
- Existing routes (list)
- Missing routes that need to be built (list)
- Firebase status (installed / not installed / partially configured)
- Stripe status
- Auth status
- Recommended dependency installs
- Recommended Firestore collections: products, orders, customers, notifications, socialPosts

Do NOT make any code changes. Report only.

---

## PROMPT SF-01: DEPENDENCY INSTALL & FIREBASE SETUP

Install and configure all required dependencies for the Sweet Freak admin/customer build.

1. Install packages:
   npm install firebase firebase-admin stripe @stripe/stripe-js resend react-hot-toast react-firebase-hooks

2. Create src/lib/firebase.ts — client-side Firebase init
   Use environment variables:
   NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, NEXT_PUBLIC_FIREBASE_APP_ID

3. Create src/lib/firebase-admin.ts — server-side Admin SDK
   Use: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (replace \\n)

4. Create src/lib/stripe.ts — Stripe server client using STRIPE_SECRET_KEY

5. Create .env.local.example listing all required env vars

6. Create src/types/index.ts with interfaces:
   - Product { id, name, description, price, category, imageUrl, inventory, active, stripeProductId, stripePriceId, createdAt }
   - Order { id, customerId, customerEmail, customerName, items: OrderItem[], total, status, notes, createdAt, updatedAt }
   - OrderItem { productId, productName, quantity, price }
   - Customer { id, email, displayName, photoURL, createdAt, orderHistory: string[] }
   - Notification { id, type, recipientId, message, read, createdAt }
   - SocialPost { id, message, platforms: string[], imageUrl?, scheduledAt?, postedAt?, status }

7. Create src/lib/firestore.ts with helpers:
   getProducts(), getProduct(id), createProduct(data), updateProduct(id, data), deleteProduct(id)
   getOrders(), getOrder(id), updateOrderStatus(id, status)
   createNotification(data), getNotifications(userId), markNotificationRead(id)

After completing, write summary to scripts/SF-01-SUMMARY.md

---

## PROMPT SF-02: FIREBASE AUTH + MIDDLEWARE

Set up Firebase Auth with Google Sign-In for both admin and customer portals.

1. Create src/middleware.ts:
   - /admin/** routes require admin role (check adminUsers/{uid} in Firestore)
   - /customer/** routes require any authenticated user
   - Redirect unauthenticated to /admin/login or /customer/login

2. Create src/app/admin/login/page.tsx:
   - Google Sign-In button, verify admin role, redirect to /admin/dashboard
   - Use existing Sweet Freak pink/purple palette

3. Create src/app/customer/login/page.tsx:
   - Google Sign-In + Email/Password options
   - Create account toggle for new customers

4. Create src/app/api/auth/session/route.ts:
   - POST: receives Firebase ID token, creates 14-day session cookie
   - DELETE: clears session cookie

5. Create src/lib/auth.ts:
   - getServerSession() — verify session cookie with Admin SDK
   - isAdmin(uid) — check Firestore adminUsers/{uid}

6. Create src/app/admin/layout.tsx and src/app/customer/layout.tsx with session checks

After completing, write summary to scripts/SF-02-SUMMARY.md

---

## PROMPT SF-03: ADMIN DASHBOARD + PRODUCT MANAGEMENT

1. src/app/admin/dashboard/page.tsx:
   - Stats: Total Orders Today, Revenue This Week, Pending Orders, Active Products
   - Recent orders list (last 10) with status badges
   - Quick actions: Add Product, View All Orders, Post Promotion

2. src/app/admin/products/page.tsx — product list with image, toggle active, edit, delete

3. src/app/admin/products/new/page.tsx and /[id]/edit/page.tsx:
   - Fields: name, description, price, category (Candied Fruits, Adult Drinks, Bundles, Seasonal, Gift Sets), image upload to Firebase Storage, inventory, active toggle
   - On save: create/update Firestore + create/update Stripe Product + Price

4. src/app/api/admin/products/route.ts — POST: create in Firestore + Stripe
5. src/app/api/admin/products/[id]/route.ts — PUT: update, DELETE: archive

6. src/components/admin/AdminNav.tsx — sidebar: Dashboard, Products, Orders, Marketing, Settings

After completing, write summary to scripts/SF-03-SUMMARY.md

---

## PROMPT SF-04: ORDER MANAGEMENT + NOTIFICATION SYSTEM

1. src/app/admin/orders/page.tsx — real-time order table via Firestore onSnapshot
   Filter tabs: All | Pending | Confirmed | In Progress | Ready | Delivered

2. src/components/admin/OrderDetailModal.tsx:
   - Order details, status update dropdown, notes field
   - "Send customer update" checkbox triggers notification on save

3. src/app/api/admin/orders/[id]/status/route.ts:
   - PATCH: update status, trigger Firestore notification + Resend email if requested

4. src/app/api/webhooks/stripe/route.ts:
   - Handle checkout.session.completed:
     a. Create Order in Firestore
     b. Create admin Notification (order_placed)
     c. Send email to ADMIN_EMAIL via Resend
     d. Send confirmation email to customer
   - Verify Stripe signature with STRIPE_WEBHOOK_SECRET

5. src/components/admin/NotificationBell.tsx — real-time bell, unread count, dropdown

6. src/app/customer/orders/page.tsx — customer order list with real-time status updates
7. src/app/customer/dashboard/page.tsx — welcome, recent orders, notifications

After completing, write summary to scripts/SF-04-SUMMARY.md

---

## PROMPT SF-05: STRIPE CHECKOUT + CUSTOMER PORTAL

1. src/app/customer/shop/page.tsx — product grid, category filter, add to cart
2. src/context/CartContext.tsx — cart state in localStorage + React context
3. src/app/customer/checkout/page.tsx — order summary, proceed to payment
4. src/app/api/checkout/session/route.ts:
   - POST: create Stripe Checkout Session with line_items from Stripe Price IDs
   - Use STRIPE_CONNECTED_ACCOUNT_ID for connected account payments
5. src/app/customer/checkout/success/page.tsx — confirmation page
6. Update customer layout with nav: Shop, My Orders, Notifications, Account + cart icon

After completing, write summary to scripts/SF-05-SUMMARY.md

---

## PROMPT SF-06: SOCIAL MEDIA MARKETING MODULE

1. src/app/admin/marketing/page.tsx:
   - Promotion composer: message, image upload, product selector, platform checkboxes
   - Schedule: Post Now vs datetime picker
   - Past posts list with status badges

2. src/app/api/admin/social/post/route.ts — save SocialPost to Firestore, queue for posting

3. Social platform modules:
   - src/lib/social/facebook.ts — postToFacebook(message, imageUrl, pageId, accessToken)
   - src/lib/social/instagram.ts — postToInstagram via Facebook Graph API
   - src/lib/social/twitter.ts — postToTwitter via v2 API

4. src/app/admin/marketing/connect/page.tsx:
   - Connect social accounts, paste access tokens, test connection
   - Tokens saved encrypted to Firestore adminSettings

5. src/components/admin/PromotionTemplates.tsx — Flash Sale, New Drop, Holiday, Custom templates

After completing, write summary to scripts/SF-06-SUMMARY.md

---

## PROMPT SF-07: QA, ENV VARS, VERCEL PREP

1. Run npx tsc --noEmit and fix all TypeScript errors
2. Run npm run build and fix all build errors
3. Verify all admin routes check session server-side
4. Verify Stripe webhook has signature verification
5. Create DEPLOYMENT.md with:
   - All Vercel env vars (from .env.local.example)
   - Stripe webhook setup (endpoint: /api/webhooks/stripe, events: checkout.session.completed)
   - Firebase setup checklist (enable Google Auth, add Vercel domain, create adminUsers collection)
   - Firestore security rules
   - Social media token setup per platform
6. Update README.md with new architecture and route map

Final: write complete summary to scripts/SF-COMPLETE.md

---

## ENVIRONMENT VARIABLES REQUIRED

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_CONNECTED_ACCOUNT_ID=

# Email
RESEND_API_KEY=
ADMIN_EMAIL=

# Social
FACEBOOK_PAGE_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=
INSTAGRAM_BUSINESS_ACCOUNT_ID=
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=

---

## CODEX LOG WRITE INSTRUCTIONS

After each prompt, Codex should attempt to append a summary to Google Drive.
If Google Drive MCP is available, write to file ID: 1P4O_4QDZzSlEW_9ZIVNbXRs7tc79R-Ro
Format: "## [DATE] — SF-[NN] COMPLETE\n[2-3 sentence summary of what was built]\n\n---\n"
Also write local summary file: scripts/SF-[NN]-SUMMARY.md
