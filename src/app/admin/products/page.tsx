'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import type { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('/api/admin/products');

    if (!response.ok) {
      throw new Error('Unable to fetch products.');
    }

    const payload = (await response.json()) as { products: Product[] };
    return payload.products;
  };

  const loadProducts = async () => {
    const nextProducts = await fetchProducts();
    setProducts(nextProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((nextProducts) => {
        if (cancelled) {
          return;
        }

        setProducts(nextProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        console.error(error);
        toast.error('Unable to load products.');
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggleActive = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active: !product.active,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to update product state.');
      }

      await loadProducts();
      toast.success('Product updated.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to update product.');
    }
  };

  const handleArchive = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Unable to archive product.');
      }

      await loadProducts();
      toast.success('Product archived.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to archive product.');
    }
  };

  return (
    <section className="space-y-6">
      <Toaster position="top-center" />
      <div className="flex items-center justify-between rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Products</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Manage catalog</h2>
        </div>
        <Link href="/admin/products/new" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">
          Add product
        </Link>
      </div>

      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-6 shadow-xl">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">
            No products found yet.
          </p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="grid gap-4 rounded-[1.5rem] border border-slate-100 p-4 md:grid-cols-[96px_1fr_auto] md:items-center">
                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-slate-100">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      {product.category}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${product.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {product.active ? 'Active' : 'Archived'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    ${product.price.toFixed(2)} · Inventory {product.inventory}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(product)}
                    className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-100"
                  >
                    {product.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleArchive(product.id)}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
