import { NextResponse } from 'next/server';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { getServerSession } from '@/lib/auth';
import { getStripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { items } = (await request.json()) as {
      items?: Array<{ productId: string; quantity: number }>;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const productSnapshots = await Promise.all(
      items.map((item) => getFirebaseAdminDb().collection('products').doc(item.productId).get())
    );

    const lineItems = productSnapshots.map((snapshot, index) => {
      if (!snapshot.exists) {
        throw new Error(`Missing product ${items[index]?.productId}.`);
      }

      const data = snapshot.data() as {
        stripePriceId?: string;
        name?: string;
        price?: number;
      };

      if (!data.stripePriceId) {
        throw new Error(`Product ${snapshot.id} is missing a Stripe Price ID.`);
      }

      return {
        price: data.stripePriceId,
        quantity: items[index]?.quantity ?? 1,
      };
    });

    const productsForMetadata = productSnapshots.map((snapshot, index) => {
      const data = snapshot.data() as { name?: string; price?: number };
      return {
        productId: snapshot.id,
        productName: data.name ?? snapshot.id,
        quantity: items[index]?.quantity ?? 1,
        price: Number(data.price ?? 0),
      };
    });

    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${request.headers.get('origin') ?? 'http://localhost:3000'}/customer/checkout/success`,
      cancel_url: `${request.headers.get('origin') ?? 'http://localhost:3000'}/customer/checkout`,
      customer_email: session.email,
      client_reference_id: session.uid,
      metadata: {
        customerId: session.uid,
        customerEmail: session.email ?? '',
        customerName: session.name ?? '',
        items: JSON.stringify(productsForMetadata),
      },
      payment_intent_data: process.env.STRIPE_CONNECTED_ACCOUNT_ID
        ? {
            transfer_data: {
              destination: process.env.STRIPE_CONNECTED_ACCOUNT_ID,
            },
          }
        : undefined,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 500 });
  }
}
