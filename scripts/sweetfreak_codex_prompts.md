# Sweet Freak & Jollies — Codex Prompt Packet
## Status: ALL PROMPTS COMPLETE (SF-00 through SF-07)
## Build verified: tsc clean, next build passing
## Google Drive: RAG Client Ops → sweetfreak → "SF — Codex Prompt Packet (Full Build)"
## Drive File ID: 1YC0ZXzWA2Fxkc_iD57mDSqC0L4ownZYFCDGdL0lTtws
## Codex Log Drive ID: 1P4O_4QDZzSlEW_9ZIVNbXRs7tc79R-Ro

---

## REMAINING MANUAL STEPS (not code — Ezra doing these)

1. Create Firestore project for Sweet Freak
2. Add all env vars to Vercel (see DEPLOYMENT.md for full list)
3. Add admin UID to Firestore adminUsers collection
4. Work Stripe connected account setup with Auset
5. Wire social tokens through /admin/marketing/connect
6. Purchase Telnyx number for Sweet Freak SMS (414 area code)
   - Set env var: TELNYX_SWEETFREAK_PHONE_NUMBER
   - SMS-only for now (order confirmations)

---

## FUTURE PROMPTS (not yet run)

### SF-08: TELNYX SMS ORDER NOTIFICATIONS (run after Telnyx number purchased)

Add outbound SMS notifications for Sweet Freak orders.

1. Install @telnyx/node if not already present (check package.json)

2. Create src/lib/telnyx-sweetfreak.ts:
   - Initialize Telnyx with TELNYX_API_KEY
   - sendOrderSMS(to: string, message: string): sends from TELNYX_SWEETFREAK_PHONE_NUMBER
   - Types of messages:
     a. Order confirmed: "Your Sweet Freak order is confirmed! 🍭 Order #[id]. We'll update you when it's ready."
     b. Order ready: "Your Sweet Freak order is ready for pickup! 🍬 [pickup instructions]"
     c. Order delivered: "Your Sweet Freak order has been delivered. Enjoy! 💕"

3. Update src/app/api/webhooks/stripe/route.ts:
   After creating the order in Firestore and sending email via Resend,
   also call sendOrderSMS if customerPhone is available in session metadata.
   Add customerPhone to Stripe Checkout Session metadata in /api/checkout/session.

4. Update src/app/api/admin/orders/[id]/status/route.ts:
   When status changes to 'ready' or 'delivered', send matching SMS to customer.

5. Update src/app/customer/checkout/page.tsx:
   Add optional phone number field to checkout form.
   Pass phone as metadata.customerPhone to the checkout session API.

After completing, write summary to scripts/SF-08-SUMMARY.md and append to
Google Drive codex log: 1P4O_4QDZzSlEW_9ZIVNbXRs7tc79R-Ro
