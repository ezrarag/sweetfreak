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
import { Toaster, toast } from 'react-hot-toast';
import { getFirebaseDb } from '@/lib/firebase';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

const normalizeProduct = (
  id: string,
  data: Record<string, unknown>
): Product => ({
  id,
  name: String(data.name ?? ''),
  description: String(data.description ?? ''),
  price: Number(data.price ?? 0),
  category: (data.category as Product['category']) ?? 'Candied Fruits',
  imageUrl: String(data.imageUrl ?? ''),
  inventory: Number(data.inventory ?? 0),
  active: Boolean(data.active ?? false),
  stripeProductId: (data.stripeProductId as string | null) ?? null,
  stripePriceId: (data.stripePriceId as string | null) ?? null,
  createdAt:
    typeof data.createdAt === 'string'
      ? data.createdAt
      : ((data.createdAt as Timestamp | undefined)?.toDate?.().toISOString() ?? null),
});

const categories: Array<'All' | Product['category']> = [
  'All',
  'Candied Fruits',
  'Adult Drinks',
  'Bundles',
  'Seasonal',
  'Gift Sets',
];

export default function CustomerShopClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | Product['category']>('All');
  const { addItem } = useCart();

  useEffect(() => {
    const productsQuery = query(
      collection(getFirebaseDb(), 'products'),
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
      setProducts(snapshot.docs.map((item) => normalizeProduct(item.id, item.data())));
    });

    return () => unsubscribe();
  }, []);

  const visibleProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Toaster position="top-center" />
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Shop</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Build your Sweet Freak order</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? 'bg-slate-900 text-white'
                  : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <div key={product.id} className="rounded-[2rem] border border-pink-200 bg-white/90 p-5 shadow-xl">
              <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                </div>
                <p className="text-lg font-bold text-pink-600">${product.price.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  addItem({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    imageUrl: product.imageUrl,
                  });
                  toast.success(`${product.name} added to cart.`);
                }}
                className="mt-5 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
              >
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/80 px-6 py-12 text-sm text-slate-500 md:col-span-2 xl:col-span-3">
            No active products available yet.
          </div>
        )}
      </div>
    </section>
  );
}
