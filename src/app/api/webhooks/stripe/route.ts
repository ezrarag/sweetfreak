import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { getStripe } from '@/lib/stripe';

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
};

export async function POST(request: Request) {
  const stripe = getStripe();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing Stripe webhook configuration.' }, { status: 400 });
  }

  try {
    const rawBody = await request.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata ?? {};
      const orderRef = getFirebaseAdminDb().collection('orders').doc(session.id);
      const existingOrder = await orderRef.get();

      if (!existingOrder.exists) {
        const items = metadata.items ? JSON.parse(metadata.items) : [];
        const customerId = metadata.customerId ?? session.client_reference_id ?? session.customer_email ?? 'guest';
        const customerEmail = metadata.customerEmail ?? session.customer_email ?? '';
        const customerName = metadata.customerName ?? session.customer_details?.name ?? 'Sweet Freak Customer';
        const total = session.amount_total ? session.amount_total / 100 : 0;

        await orderRef.set({
          customerId,
          customerEmail,
          customerName,
          items,
          total,
          status: 'pending',
          notes: metadata.notes ?? '',
          stripeSessionId: session.id,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });

        await getFirebaseAdminDb().collection('notifications').add({
          type: 'order_placed',
          recipientId: 'admin',
          message: `New order from ${customerName} for $${total.toFixed(2)}.`,
          read: false,
          createdAt: FieldValue.serverTimestamp(),
        });

        const resend = getResend();
        if (resend) {
          const adminEmail = process.env.ADMIN_EMAIL;

          if (adminEmail) {
            await resend.emails.send({
              from: 'Sweet Freak <orders@sweetfreakjollies.com>',
              to: adminEmail,
              subject: 'New Sweet Freak order received',
              html: `<p>${customerName} placed a new order for $${total.toFixed(2)}.</p>`,
            });
          }

          if (customerEmail) {
            await resend.emails.send({
              from: 'Sweet Freak <orders@sweetfreakjollies.com>',
              to: customerEmail,
              subject: 'Your Sweet Freak order is confirmed',
              html: `<p>Hi ${customerName},</p><p>We received your order for $${total.toFixed(2)}.</p>`,
            });
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: 'Webhook handling failed.' }, { status: 400 });
  }
}
