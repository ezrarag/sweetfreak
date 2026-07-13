import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { encryptToken } from '@/lib/social/encryption';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, string>;
    const encryptedEntries = Object.entries(payload)
      .filter(([, value]) => Boolean(value))
      .reduce<Record<string, { iv: string; authTag: string; value: string }>>((acc, [key, value]) => {
        acc[key] = encryptToken(value);
        return acc;
      }, {});

    await getFirebaseAdminDb().collection('adminSettings').doc('social').set(
      {
        tokens: encryptedEntries,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to save social credentials:', error);
    return NextResponse.json({ error: 'Unable to save social credentials.' }, { status: 500 });
  }
}
