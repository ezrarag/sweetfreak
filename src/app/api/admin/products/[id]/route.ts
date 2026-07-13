import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { getStripe } from '@/lib/stripe';

type ProductUpdatePayload = {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
  inventory?: number;
  active?: boolean;
  stripeProductId?: string | null;
  stripePriceId?: string | null;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const snapshot = await getFirebaseAdminDb().collection('products').doc(id).get();

    if (!snapshot.exists) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({
      product: {
        id: snapshot.id,
        ...snapshot.data(),
      },
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Unable to fetch product.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = (await request.json()) as ProductUpdatePayload;
    const docRef = getFirebaseAdminDb().collection('products').doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    const existing = snapshot.data() as {
      stripeProductId?: string;
      stripePriceId?: string;
      price?: number;
    };

    const stripe = getStripe();
    let nextStripePriceId = existing.stripePriceId ?? null;

    if (existing.stripeProductId) {
      await stripe.products.update(existing.stripeProductId, {
        name: payload.name,
        description: payload.description,
        images: payload.imageUrl ? [payload.imageUrl] : undefined,
        active: payload.active,
        metadata: payload.category ? { category: payload.category } : undefined,
      });
    }

    if (
      typeof payload.price === 'number' &&
      existing.stripeProductId &&
      payload.price !== existing.price
    ) {
      const stripePrice = await stripe.prices.create({
        currency: 'usd',
        unit_amount: Math.round(payload.price * 100),
        product: existing.stripeProductId,
      });
      nextStripePriceId = stripePrice.id;
    }

    await docRef.update({
      ...payload,
      stripePriceId: nextStripePriceId,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Unable to update product.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = getFirebaseAdminDb().collection('products').doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    const data = snapshot.data() as { stripeProductId?: string };
    const stripe = getStripe();

    if (data.stripeProductId) {
      await stripe.products.update(data.stripeProductId, {
        active: false,
      });
    }

    await docRef.update({
      active: false,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to archive product:', error);
    return NextResponse.json({ error: 'Unable to archive product.' }, { status: 500 });
  }
}
