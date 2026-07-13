import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      message?: string;
      platforms?: string[];
      imageUrl?: string;
      scheduledAt?: string;
      productId?: string;
      postNow?: boolean;
    };

    if (!payload.message || !payload.platforms?.length) {
      return NextResponse.json({ error: 'Message and platform selection are required.' }, { status: 400 });
    }

    const docRef = await getFirebaseAdminDb().collection('socialPosts').add({
      message: payload.message,
      platforms: payload.platforms,
      imageUrl: payload.imageUrl ?? null,
      productId: payload.productId ?? null,
      scheduledAt: payload.scheduledAt ? new Date(payload.scheduledAt).toISOString() : null,
      postedAt: null,
      status: payload.postNow ? 'queued' : payload.scheduledAt ? 'scheduled' : 'draft',
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Failed to queue social post:', error);
    return NextResponse.json({ error: 'Unable to queue social post.' }, { status: 500 });
  }
}
