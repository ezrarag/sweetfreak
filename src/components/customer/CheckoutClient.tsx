'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useCart } from '@/context/CartContext';

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to create checkout session.');
      }

      const payload = (await response.json()) as { url?: string };

      if (!payload.url) {
        throw new Error('Missing Stripe checkout URL.');
      }

      router.push(payload.url);
    } catch (error) {
      console.error(error);
      toast.error('Unable to start checkout.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Toaster position="top-center" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Checkout</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Review your order</h2>
          <div className="mt-6 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 rounded-[1.5rem] border border-slate-100 p-4">
                  <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-2 text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="rounded-full border border-slate-200 p-2 text-slate-600"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-slate-700">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="rounded-full border border-slate-200 p-2 text-slate-600"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="rounded-full border border-slate-200 p-2 text-slate-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-sm text-slate-500">
                Your cart is empty.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Summary</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Estimated tax</span>
              <span>${(subtotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${(subtotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0 || isSubmitting}
            className="mt-6 w-full rounded-full bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Redirecting to Stripe...' : 'Proceed to payment'}
          </button>
        </div>
      </div>
    </section>
  );
}
