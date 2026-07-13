'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessClient() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-10 text-center shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Success</p>
        <h2 className="mt-3 text-4xl font-bold text-slate-900">Your order is in.</h2>
        <p className="mt-4 text-slate-600">
          Stripe completed the payment flow. We&apos;ll keep your dashboard updated as the order moves through prep.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/customer/orders"
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            View my orders
          </Link>
          <Link
            href="/customer/shop"
            className="rounded-full border border-pink-200 px-5 py-3 text-sm font-semibold text-pink-700 transition hover:bg-pink-50"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
