import { getServerSession } from '@/lib/auth';
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from '@/lib/firebase-admin';

export default async function CustomerDashboardPage() {
  const session = await getServerSession();
  let recentOrders: Array<{ id: string; total?: number; status?: string }> = [];
  let notifications: Array<{ id: string; message?: string }> = [];

  if (session?.uid && isFirebaseAdminConfigured()) {
    try {
      const [ordersSnapshot, notificationsSnapshot] = await Promise.all([
        getFirebaseAdminDb()
          .collection('orders')
          .where('customerId', '==', session.uid)
          .orderBy('createdAt', 'desc')
          .limit(3)
          .get(),
        getFirebaseAdminDb()
          .collection('notifications')
          .where('recipientId', '==', session.uid)
          .orderBy('createdAt', 'desc')
          .limit(5)
          .get(),
      ]);

      recentOrders = ordersSnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      notifications = notificationsSnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
    } catch (error) {
      console.error('Unable to load customer dashboard:', error);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Dashboard</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Welcome back{session?.name ? `, ${session.name}` : ''}.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Track your latest Sweet Freak orders and watch for prep or delivery updates.
          </p>

          <div className="mt-8 space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-slate-100 px-4 py-4">
                  <p className="font-semibold text-slate-900">Order #{order.id.slice(0, 8)}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    ${(order.total ?? 0).toFixed(2)} · {String(order.status ?? 'pending')}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">
                No recent orders yet.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Notifications</p>
          <div className="mt-5 space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="rounded-2xl bg-pink-50 px-4 py-3 text-sm text-slate-700">
                  {notification.message ?? 'Update received'}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">
                No notifications yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
