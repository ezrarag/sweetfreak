# SF-04 Summary

Completed:

- Added `src/app/admin/orders/page.tsx` with a real-time Firestore order table and status tabs.
- Added `src/components/admin/OrderDetailModal.tsx` for reviewing order items, notes, and status updates.
- Added `src/app/api/admin/orders/[id]/status/route.ts` to update order status and optionally send a customer notification/email.
- Added `src/app/api/webhooks/stripe/route.ts` to verify Stripe signatures and create orders, admin notifications, and confirmation emails on `checkout.session.completed`.
- Added `src/components/admin/NotificationBell.tsx` and wired it into the admin layout for real-time admin notifications.
- Added `src/app/customer/orders/page.tsx` for customer-facing real-time order updates.
- Replaced the customer dashboard placeholder with a Firestore-backed recent orders and notifications view.

Notes:

- The webhook expects checkout metadata for `customerId`, `customerEmail`, `customerName`, `items`, and optional `notes`. `SF-05` should populate those consistently when creating Checkout Sessions.
- Email sends are attempted only when `RESEND_API_KEY` is configured.
