'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navItems = [
  { href: '/customer/shop', label: 'Shop' },
  { href: '/customer/orders', label: 'My Orders' },
  { href: '/customer/dashboard#notifications', label: 'Notifications' },
  { href: '/customer/dashboard#account', label: 'Account' },
];

export default function CustomerPortalNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors ${active ? 'text-pink-600' : 'hover:text-pink-500'}`}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/customer/checkout"
        className="relative rounded-full border border-pink-200 bg-white px-4 py-2 text-slate-800 shadow-sm transition hover:border-pink-300"
      >
        <ShoppingBag size={16} />
        {itemCount > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-bold text-white">
            {itemCount}
          </span>
        ) : null}
      </Link>
    </nav>
  );
}
