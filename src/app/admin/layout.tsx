import type { ReactNode } from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import NotificationBell from '@/components/admin/NotificationBell';
import { getServerSession, isAdmin } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = (await headers()).get('x-pathname') ?? '';

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const session = await getServerSession();

  if (!session) {
    redirect('/admin/login');
  }

  const hasAdminAccess = await isAdmin(session.uid);

  if (!hasAdminAccess) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-amber-50 to-purple-100">
      <header className="border-b border-pink-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">
              Sweet Freak Admin
            </p>
            <h1 className="text-xl font-bold text-slate-900">Operations Portal</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
            <Link href="/admin" className="transition-colors hover:text-pink-500">
              Home
            </Link>
            <Link href="/admin/dashboard" className="transition-colors hover:text-pink-500">
              Dashboard
            </Link>
            <NotificationBell recipientId="admin" />
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start">
        <AdminNav />
        <div className="min-w-0 flex-1">{children}</div>
      </main>
    </div>
  );
}
