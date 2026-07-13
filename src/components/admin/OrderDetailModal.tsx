'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { orderStatusLabel, orderStatuses, type OrderStatus } from '@/lib/orderStatus';
import type { Order } from '@/types';

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
  onSaved,
}: {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [notes, setNotes] = useState('');
  const [sendCustomerUpdate, setSendCustomerUpdate] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen || !order) {
    return null;
  }

  const currentStatus = (status || order.status) as OrderStatus;

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: currentStatus,
          notes: notes || order.notes,
          sendCustomerUpdate,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to update order.');
      }

      toast.success('Order updated.');
      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Order update failed.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-8">
      <Toaster position="top-center" />
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Order detail</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Order #{order.id.slice(0, 8)}</h3>
            <p className="mt-2 text-sm text-slate-500">
              {order.customerName} · {order.customerEmail}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Items</p>
            <div className="mt-3 space-y-2">
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

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Status</span>
              <select
                value={currentStatus}
                onChange={(event) => setStatus(event.target.value as OrderStatus)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
              >
                {orderStatuses.map((item) => (
                  <option key={item} value={item}>
                    {orderStatusLabel[item]}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <input
                type="checkbox"
                checked={sendCustomerUpdate}
                onChange={(event) => setSendCustomerUpdate(event.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-slate-700">Send customer update</span>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Notes</span>
            <textarea
              value={notes || order.notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
              placeholder="Packing notes, delivery info, custom request..."
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : 'Save order'}
          </button>
        </div>
      </div>
    </div>
  );
}
