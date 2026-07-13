import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { getStripe } from '@/lib/stripe';

type ProductPayload = {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inventory: number;
  active: boolean;
};

export async function GET() {
  try {
    const snapshot = await getFirebaseAdminDb().collection('products').orderBy('createdAt', 'desc').get();
    const products = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Unable to fetch products.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ProductPayload;
    const stripe = getStripe();

    const stripeProduct = await stripe.products.create({
      name: payload.name,
      description: payload.description,
      images: payload.imageUrl ? [payload.imageUrl] : undefined,
      metadata: {
        category: payload.category,
      },
      active: payload.active,
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(payload.price * 100),
      currency: 'usd',
      product: stripeProduct.id,
    });

    const docRef = await getFirebaseAdminDb().collection('products').add({
      ...payload,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Unable to create product.' }, { status: 500 });
  }
}
