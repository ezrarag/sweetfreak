import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App as FirebaseAdminApp,
} from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage, type Storage } from 'firebase-admin/storage';

const getAdminConfig = () => ({
  projectId: process.env.FIREBASE_PROJECT_ID ?? '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
});

export const isFirebaseAdminConfigured = () => Object.values(getAdminConfig()).every(Boolean);

export const getFirebaseAdminApp = (): FirebaseAdminApp => {
  if (getApps().length > 0) {
    return getApp();
  }

  const adminConfig = getAdminConfig();

  if (!Object.values(adminConfig).every(Boolean)) {
    throw new Error(
      'Firebase Admin environment variables are missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
    );
  }

  return initializeApp({
    credential: cert({
      projectId: adminConfig.projectId,
      clientEmail: adminConfig.clientEmail,
      privateKey: adminConfig.privateKey,
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
};

export const getFirebaseAdminAuth = (): Auth => getAuth(getFirebaseAdminApp());

export const getFirebaseAdminDb = (): Firestore => getFirestore(getFirebaseAdminApp());

export const getFirebaseAdminStorage = (): Storage => getStorage(getFirebaseAdminApp());
