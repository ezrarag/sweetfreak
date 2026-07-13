'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/marketing', label: 'Marketing' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-xs rounded-[2rem] border border-pink-200/70 bg-white/85 p-5 shadow-xl backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Admin Nav</p>
      <nav className="mt-5 space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
