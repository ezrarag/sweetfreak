'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type Timestamp,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';
import { orderStatusLabel } from '@/lib/orderStatus';
import type { Order } from '@/types';

const normalizeOrder = (
  id: string,
  data: Record<string, unknown>
): Order => ({
  id,
  customerId: String(data.customerId ?? ''),
  customerEmail: String(data.customerEmail ?? ''),
  customerName: String(data.customerName ?? ''),
  items: Array.isArray(data.items) ? (data.items as Order['items']) : [],
  total: Number(data.total ?? 0),
  status: (data.status as Order['status']) ?? 'pending',
  notes: String(data.notes ?? ''),
  createdAt:
    typeof data.createdAt === 'string'
      ? data.createdAt
      : ((data.createdAt as Timestamp | undefined)?.toDate?.().toISOString() ?? null),
  updatedAt:
    typeof data.updatedAt === 'string'
      ? data.updatedAt
      : ((data.updatedAt as Timestamp | undefined)?.toDate?.().toISOString() ?? null),
});

export default function CustomerOrdersClient({ customerId }: { customerId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const ordersQuery = query(
      collection(getFirebaseDb(), 'orders'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(snapshot.docs.map((item) => normalizeOrder(item.id, item.data())));
    });

    return () => unsubscribe();
  }, [customerId]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">My Orders</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Real-time order updates</h2>
        <div className="mt-6 space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="rounded-[1.5rem] border border-slate-100 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">Order #{order.id.slice(0, 8)}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Pending timestamp'}
                    </p>
                  </div>
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pink-700">
                    {orderStatusLabel[order.status]}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={`${item.productId}-${item.productName}`} className="flex items-center justify-between text-sm text-slate-600">
                      <span>
                        {item.productName} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900">Total ${order.total.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-sm text-slate-500">
              No orders yet. Once checkout is live, your purchases will appear here.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
