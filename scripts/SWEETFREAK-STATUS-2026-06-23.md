# Sweet Freak Status — 2026-06-23

## Current answers

### 1. Are we using Telnyx?

No. The current codebase does not use Telnyx yet.

What exists:

- There is no Telnyx SDK installed in `package.json`.
- There is no `src/lib/telnyx-*` integration file.
- There is no SMS webhook or inbound-text order handler in `src/app/api/`.

What I did find:

- The repo contains a later prompt packet in [scripts/sweetfreak_codex_prompts.md](/Users/ehauga/Desktop/local%20dev/sweetfreak/scripts/sweetfreak_codex_prompts.md) that proposes adding Telnyx outbound SMS notifications, but that work has not been implemented.

### 2. Do we have an admin area login? Are we using Google login?

Yes. There is an admin login area at `/admin/login`.

Current behavior:

- The admin login uses Google sign-in through Firebase Auth.
- The page uses `GoogleAuthProvider` and `signInWithPopup`.
- Admin access is gated by checking whether `adminUsers/{uid}` exists in Firestore.

Relevant files:

- [src/app/admin/login/page.tsx](/Users/ehauga/Desktop/local%20dev/sweetfreak/src/app/admin/login/page.tsx)
- [src/app/admin/layout.tsx](/Users/ehauga/Desktop/local%20dev/sweetfreak/src/app/admin/layout.tsx)
- [src/lib/auth.ts](/Users/ehauga/Desktop/local%20dev/sweetfreak/src/lib/auth.ts)

### 3. Do we have a client login area?

Yes. There is a customer login area at `/customer/login`.

Current behavior:

- Customers can sign in with Google.
- Customers can also sign in or sign up with email and password.

Relevant files:

- [src/app/customer/login/page.tsx](/Users/ehauga/Desktop/local%20dev/sweetfreak/src/app/customer/login/page.tsx)
- [src/app/customer/layout.tsx](/Users/ehauga/Desktop/local%20dev/sweetfreak/src/app/customer/layout.tsx)

### 4. Can a person text the number to complete orders right now?

No. Not from the current codebase.

What the app currently supports:

- Customer web login
- Product browsing at `/customer/shop`
- Cart and checkout flow
- Stripe Checkout session creation
- Stripe webhook order creation

What is missing for text-to-order:

- No Telnyx inbound messaging webhook
- No SMS parsing or order intake workflow
- No phone-number capture flowing through checkout metadata
- No SMS conversation state or admin response loop

Relevant files:

- [src/app/api/checkout/session/route.ts](/Users/ehauga/Desktop/local%20dev/sweetfreak/src/app/api/checkout/session/route.ts)
- [src/app/api/webhooks/stripe/route.ts](/Users/ehauga/Desktop/local%20dev/sweetfreak/src/app/api/webhooks/stripe/route.ts)

## Where the project is overall

Built and present:

- Admin login and protected admin area
- Customer login and protected customer area
- Firestore-backed product management
- Admin orders dashboard
- Stripe Checkout session creation
- Stripe webhook order creation
- Customer orders and dashboard views
- Social marketing scaffolding
- Deployment documentation

Not built yet:

- Telnyx integration
- Inbound SMS ordering
- Outbound SMS order notifications
- Phone-based conversational ordering flow
- Background job/scheduler for social posting

## Suggested next Telnyx work

If you want the phone number to handle orders, the next implementation step should be:

1. Add Telnyx SDK and env vars
2. Create inbound SMS webhook route
3. Define SMS order conversation flow
4. Store phone number and conversation state in Firestore
5. Optionally add outbound order-status SMS notifications

## References

- [README.md](/Users/ehauga/Desktop/local%20dev/sweetfreak/README.md)
- [DEPLOYMENT.md](/Users/ehauga/Desktop/local%20dev/sweetfreak/DEPLOYMENT.md)
- [scripts/SF-COMPLETE.md](/Users/ehauga/Desktop/local%20dev/sweetfreak/scripts/SF-COMPLETE.md)
