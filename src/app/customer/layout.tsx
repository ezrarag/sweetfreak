import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import CustomerPortalNav from '@/components/customer/CustomerPortalNav';
import { CartProvider } from '@/context/CartContext';
import { getServerSession } from '@/lib/auth';

export default async function CustomerLayout({ children }: { children: ReactNode }) {
  const pathname = (await headers()).get('x-pathname') ?? '';

  if (pathname === '/customer/login') {
    return <>{children}</>;
  }

  const session = await getServerSession();

  if (!session) {
    redirect('/customer/login');
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,105,180,0.20),_transparent_45%),linear-gradient(180deg,_#fff8f1_0%,_#fef2ff_100%)]">
        <header className="border-b border-pink-200/70 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">
                Sweet Freak
              </p>
              <h1 className="text-xl font-bold text-slate-900">Customer Portal</h1>
            </div>
            <CustomerPortalNav />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}
