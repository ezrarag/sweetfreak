'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type Timestamp,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';

type NotificationItem = {
  id: string;
  message: string;
  read: boolean;
  type: string;
  createdAt: string | null;
};

const formatTimestamp = (value: Timestamp | string | null | undefined) => {
  if (!value) {
    return 'just now';
  }

  if (typeof value === 'string') {
    return new Date(value).toLocaleString();
  }

  return value.toDate().toLocaleString();
};

export default function NotificationBell({ recipientId = 'admin' }: { recipientId?: string }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const notificationsQuery = query(
      collection(getFirebaseDb(), 'notifications'),
      where('recipientId', '==', recipientId),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const nextNotifications = snapshot.docs.map((item) => {
        const data = item.data() as {
          message?: string;
          read?: boolean;
          type?: string;
          createdAt?: Timestamp | string | null;
        };

        return {
          id: item.id,
          message: data.message ?? '',
          read: data.read ?? false,
          type: data.type ?? 'general',
          createdAt:
            typeof data.createdAt === 'string'
              ? data.createdAt
              : data.createdAt?.toDate?.().toISOString() ?? null,
        };
      });

      setNotifications(nextNotifications);
    });

    return () => unsubscribe();
  }, [recipientId]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative rounded-full border border-pink-200 bg-white p-3 text-slate-700 shadow-sm transition hover:border-pink-300 hover:text-pink-600"
      >
        <Bell size={18} />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-14 z-50 w-80 rounded-[1.5rem] border border-pink-200 bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">Notifications</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              Close
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl border px-4 py-3 ${
                    item.read ? 'border-slate-100 bg-slate-50' : 'border-pink-200 bg-pink-50'
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">{item.message}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.type} · {formatTimestamp(item.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                No notifications yet.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
