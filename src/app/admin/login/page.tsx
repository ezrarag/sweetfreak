'use client';

import { startTransition, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Toaster, toast } from 'react-hot-toast';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/admin/dashboard';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getFirebaseAuth(), provider);
      const adminRecord = await getDoc(doc(getFirebaseDb(), 'adminUsers', result.user.uid));

      if (!adminRecord.exists()) {
        await signOut(getFirebaseAuth());
        toast.error('This Google account does not have admin access.');
        return;
      }

      const idToken = await result.user.getIdToken();
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error('Unable to establish an admin session.');
      }

      toast.success('Admin login complete.');
      startTransition(() => {
        router.push(nextPath);
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      toast.error('Google sign-in failed. Check Firebase config and adminUsers access.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.35),_transparent_35%),linear-gradient(135deg,_#2a0d1f_0%,_#5b1b78_55%,_#ff5fa2_100%)] px-4 py-12 text-white">
      <Toaster position="top-center" />
      <div className="w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-200">Sweet Freak</p>
        <h1 className="mt-4 text-4xl font-bold">Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-white/75">
          Sign in with an approved Google account. Access is granted only when a matching
          `adminUsers/{'{uid}'}` record exists in Firestore.
        </p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="mt-8 flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-900 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Checking access...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
}
