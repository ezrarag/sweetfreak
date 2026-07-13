import Link from 'next/link';
import { getFirebaseAdminDb, isFirebaseAdminConfigured } from '@/lib/firebase-admin';

type DashboardMetric = {
  label: string;
  value: string;
};

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  let metrics: DashboardMetric[] = [
    { label: 'Total Orders Today', value: '0' },
    { label: 'Revenue This Week', value: '$0.00' },
    { label: 'Pending Orders', value: '0' },
    { label: 'Active Products', value: '0' },
  ];
  let recentOrders: Array<{ id: string; customerName?: string; total?: number; status?: string }> = [];

  if (!isFirebaseAdminConfigured()) {
    return (
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-pink-200 bg-white/85 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Dashboard</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Admin environment setup required</h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Add Firebase Admin credentials to load live dashboard metrics, orders, and product counts.
          </p>
        </div>
      </section>
    );
  }

  try {
    const [ordersSnapshot, productsSnapshot] = await Promise.all([
      getFirebaseAdminDb().collection('orders').orderBy('createdAt', 'desc').limit(10).get(),
      getFirebaseAdminDb().collection('products').where('active', '==', true).get(),
    ]);

    const orders = ordersSnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as Array<{
      id: string;
      customerName?: string;
      total?: number;
      status?: string;
      createdAt?: { toDate?: () => Date };
    }>;

    const todayOrders = orders.filter((order) => {
      const createdAt = order.createdAt?.toDate?.();
      return createdAt ? createdAt >= startOfToday : false;
    });
    const weeklyRevenue = orders.reduce((sum, order) => {
      const createdAt = order.createdAt?.toDate?.();
      return createdAt && createdAt >= startOfWeek ? sum + (order.total ?? 0) : sum;
    }, 0);
    const pendingOrders = orders.filter((order) => order.status === 'pending').length;

    metrics = [
      { label: 'Total Orders Today', value: String(todayOrders.length) },
      { label: 'Revenue This Week', value: `$${weeklyRevenue.toFixed(2)}` },
      { label: 'Pending Orders', value: String(pendingOrders) },
      { label: 'Active Products', value: String(productsSnapshot.size) },
    ];
    recentOrders = orders;
  } catch (error) {
    console.error('Unable to load admin dashboard metrics:', error);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-pink-200 bg-white/85 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Dashboard</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-5">
              <p className="text-sm font-medium text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Recent orders</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Latest 10 orders</h2>
            </div>
            <Link href="/admin/orders" className="text-sm font-semibold text-pink-600 hover:text-pink-700">
              View all orders
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{order.customerName ?? 'Unknown customer'}</p>
                    <p className="text-sm text-slate-500">Order #{order.id.slice(0, 8)}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      {order.status ?? 'pending'}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-slate-900">${(order.total ?? 0).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">
                No recent orders yet. This will populate after Stripe checkout and webhook handling are live.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Quick actions</p>
          <div className="mt-5 space-y-3">
            <Link href="/admin/products/new" className="block rounded-2xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition hover:bg-pink-600">
              Add Product
            </Link>
            <Link href="/admin/orders" className="block rounded-2xl bg-pink-50 px-4 py-4 text-sm font-semibold text-pink-700 transition hover:bg-pink-100">
              View All Orders
            </Link>
            <Link href="/admin/marketing" className="block rounded-2xl bg-purple-50 px-4 py-4 text-sm font-semibold text-purple-700 transition hover:bg-purple-100">
              Post Promotion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
