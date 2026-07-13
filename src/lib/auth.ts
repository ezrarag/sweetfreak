import type { DecodedIdToken } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { getFirebaseAdminAuth, getFirebaseAdminDb } from '@/lib/firebase-admin';

export const SESSION_COOKIE_NAME = '__session';

export const getServerSession = async (): Promise<DecodedIdToken | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    return await getFirebaseAdminAuth().verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.error('Failed to verify Firebase session cookie:', error);
    return null;
  }
};

export const isAdmin = async (uid: string): Promise<boolean> => {
  const adminSnapshot = await getFirebaseAdminDb().collection('adminUsers').doc(uid).get();
  return adminSnapshot.exists;
};
