'use client';

import { startTransition, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { Toaster, toast } from 'react-hot-toast';
import { getFirebaseAuth } from '@/lib/firebase';

export default function CustomerLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/customer/dashboard';
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const createSession = async (idToken: string) => {
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Unable to create customer session.');
    }

    startTransition(() => {
      router.push(nextPath);
      router.refresh();
    });
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);

    try {
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await createSession(await result.user.getIdToken());
      toast.success('Signed in successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Google sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const auth = getFirebaseAuth();
      const credential =
        mode === 'signup'
          ? await createUserWithEmailAndPassword(auth, formData.email, formData.password)
          : await signInWithEmailAndPassword(auth, formData.email, formData.password);

      if (mode === 'signup' && formData.displayName) {
        await updateProfile(credential.user, {
          displayName: formData.displayName,
        });
      }

      await createSession(await credential.user.getIdToken());
      toast.success(mode === 'signup' ? 'Account created.' : 'Welcome back.');
    } catch (error) {
      console.error(error);
      toast.error(mode === 'signup' ? 'Unable to create account.' : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(192,132,252,0.35),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(251,113,133,0.25),_transparent_35%),linear-gradient(180deg,_#fff7ed_0%,_#fdf2f8_100%)] px-4 py-12">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg overflow-hidden rounded-[2rem] border border-pink-200/60 bg-white/90 shadow-2xl backdrop-blur">
        <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-8 py-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-100">Sweet Freak</p>
          <h1 className="mt-3 text-4xl font-bold">Customer Login</h1>
          <p className="mt-3 max-w-md text-sm text-white/80">
            Continue with Google or use email and password to view orders, checkout, and account updates.
          </p>
        </div>

        <div className="space-y-6 px-8 py-8">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full rounded-full border border-slate-200 px-6 py-4 text-base font-semibold text-slate-900 transition hover:border-pink-300 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Working...' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Display name</span>
                <input
                  value={formData.displayName}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, displayName: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                  placeholder="Sweet Freak fan"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, email: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={formData.password}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, password: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                placeholder="••••••••"
                required
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Working...'
                : mode === 'signup'
                  ? 'Create account'
                  : 'Sign in with email'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode((current) => (current === 'signin' ? 'signup' : 'signin'))}
            className="text-sm font-medium text-pink-600 transition hover:text-pink-700"
          >
            {mode === 'signup'
              ? 'Already have an account? Sign in'
              : 'Need an account? Create one'}
          </button>
        </div>
      </div>
    </div>
  );
}
