'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, type Timestamp } from 'firebase/firestore';
import OrderDetailModal from '@/components/admin/OrderDetailModal';
import { getFirebaseDb } from '@/lib/firebase';
import { orderStatusLabel, type OrderStatus } from '@/lib/orderStatus';
import type { Order } from '@/types';

const statusTabs: Array<'all' | OrderStatus> = [
  'all',
  'pending',
  'confirmed',
  'in_progress',
  'ready',
  'delivered',
];

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const ordersQuery = query(collection(getFirebaseDb(), 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(snapshot.docs.map((item) => normalizeOrder(item.id, item.data())));
    });

    return () => unsubscribe();
  }, []);

  const filteredOrders =
    activeTab === 'all' ? orders : orders.filter((order) => order.status === activeTab);

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Orders</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Live order management</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? 'bg-slate-900 text-white'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              {tab === 'all' ? 'All' : orderStatusLabel[tab]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-6 shadow-xl">
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedOrder(order)}
                className="grid w-full gap-4 rounded-[1.5rem] border border-slate-100 p-4 text-left transition hover:border-pink-200 hover:bg-pink-50/40 md:grid-cols-[1.2fr_0.8fr_0.6fr]"
              >
                <div>
                  <p className="font-semibold text-slate-900">{order.customerName || 'Unknown customer'}</p>
                  <p className="mt-1 text-sm text-slate-500">{order.customerEmail}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Order #{order.id.slice(0, 8)}
                  </p>
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                    {orderStatusLabel[order.status]}
                  </span>
                  <p className="mt-3 text-sm text-slate-600">{order.items.length} item lines</p>
                </div>
                <div className="md:text-right">
                  <p className="text-lg font-bold text-slate-900">${order.total.toFixed(2)}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Pending timestamp'}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-sm text-slate-500">
              No orders in this status yet.
            </div>
          )}
        </div>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        onSaved={() => undefined}
      />
    </section>
  );
}
