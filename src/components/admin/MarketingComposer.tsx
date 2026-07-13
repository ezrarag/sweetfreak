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
import PromotionTemplates from '@/components/admin/PromotionTemplates';
import { getFirebaseDb } from '@/lib/firebase';
import type { Product, SocialPost } from '@/types';

const normalizeProduct = (id: string, data: Record<string, unknown>): Product => ({
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

const normalizePost = (id: string, data: Record<string, unknown>): SocialPost => ({
  id,
  message: String(data.message ?? ''),
  platforms: Array.isArray(data.platforms) ? (data.platforms as string[]) : [],
  imageUrl: data.imageUrl ? String(data.imageUrl) : undefined,
  scheduledAt:
    typeof data.scheduledAt === 'string'
      ? data.scheduledAt
      : ((data.scheduledAt as Timestamp | undefined)?.toDate?.().toISOString() ?? undefined),
  postedAt:
    typeof data.postedAt === 'string'
      ? data.postedAt
      : ((data.postedAt as Timestamp | undefined)?.toDate?.().toISOString() ?? undefined),
  status: (data.status as SocialPost['status']) ?? 'draft',
});

export default function MarketingComposer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    imageUrl: '',
    productId: '',
    platforms: ['facebook'] as string[],
    scheduleMode: 'now' as 'now' | 'schedule',
    scheduledAt: '',
  });

  useEffect(() => {
    const productQuery = query(
      collection(getFirebaseDb(), 'products'),
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );
    const postQuery = query(collection(getFirebaseDb(), 'socialPosts'), orderBy('createdAt', 'desc'));

    const unsubProducts = onSnapshot(productQuery, (snapshot) => {
      setProducts(snapshot.docs.map((item) => normalizeProduct(item.id, item.data())));
    });
    const unsubPosts = onSnapshot(postQuery, (snapshot) => {
      setPosts(snapshot.docs.map((item) => normalizePost(item.id, item.data())));
    });

    return () => {
      unsubProducts();
      unsubPosts();
    };
  }, []);

  const togglePlatform = (platform: string) => {
    setFormData((current) => ({
      ...current,
      platforms: current.platforms.includes(platform)
        ? current.platforms.filter((item) => item !== platform)
        : [...current.platforms, platform],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/social/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: formData.message,
          imageUrl: formData.imageUrl || undefined,
          productId: formData.productId || undefined,
          platforms: formData.platforms,
          scheduledAt: formData.scheduleMode === 'schedule' ? formData.scheduledAt : undefined,
          postNow: formData.scheduleMode === 'now',
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to save social post.');
      }

      toast.success('Promotion queued.');
      setFormData({
        message: '',
        imageUrl: '',
        productId: '',
        platforms: ['facebook'],
        scheduleMode: 'now',
        scheduledAt: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Unable to save promotion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Promotion composer</p>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Message</span>
              <textarea
                value={formData.message}
                onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                rows={5}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                required
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Image URL</span>
                <input
                  value={formData.imageUrl}
                  onChange={(event) => setFormData((current) => ({ ...current, imageUrl: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                  placeholder="https://..."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Featured product</span>
                <select
                  value={formData.productId}
                  onChange={(event) => setFormData((current) => ({ ...current, productId: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                >
                  <option value="">None</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-slate-700">Platforms</span>
              <div className="flex flex-wrap gap-2">
                {['facebook', 'instagram', 'twitter'].map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      formData.platforms.includes(platform)
                        ? 'bg-slate-900 text-white'
                        : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Schedule</span>
                <select
                  value={formData.scheduleMode}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      scheduleMode: event.target.value as 'now' | 'schedule',
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                >
                  <option value="now">Post now</option>
                  <option value="schedule">Schedule</option>
                </select>
              </label>

              {formData.scheduleMode === 'schedule' ? (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Date and time</span>
                  <input
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, scheduledAt: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
                  />
                </label>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Queue promotion'}
          </button>
        </form>

        <PromotionTemplates
          onSelect={(message) =>
            setFormData((current) => ({
              ...current,
              message,
            }))
          }
        />
      </div>

      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Past posts</p>
        <div className="mt-5 space-y-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-slate-100 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{post.message}</p>
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pink-700">
                    {post.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {post.platforms.join(', ')}
                  {post.scheduledAt ? ` · ${new Date(post.scheduledAt).toLocaleString()}` : ''}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">
              No marketing posts yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
