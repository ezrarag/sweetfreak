'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Toaster, toast } from 'react-hot-toast';
import { getFirebaseStorage } from '@/lib/firebase';
import type { Product } from '@/types';

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  category: Product['category'];
  imageUrl: string;
  inventory: string;
  active: boolean;
};

const categories: Product['category'][] = [
  'Candied Fruits',
  'Adult Drinks',
  'Bundles',
  'Seasonal',
  'Gift Sets',
];

const toFormState = (product?: Partial<Product>): ProductFormData => ({
  name: product?.name ?? '',
  description: product?.description ?? '',
  price: product?.price?.toString() ?? '',
  category: product?.category ?? 'Candied Fruits',
  imageUrl: product?.imageUrl ?? '',
  inventory: product?.inventory?.toString() ?? '0',
  active: product?.active ?? true,
});

interface ProductFormProps {
  product?: Partial<Product>;
  productId?: string;
}

export default function ProductForm({ product, productId }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>(toFormState(product));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateField = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      return formData.imageUrl;
    }

    setIsUploading(true);

    try {
      const storageRef = ref(getFirebaseStorage(), `products/${Date.now()}-${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      updateField('imageUrl', downloadUrl);
      return downloadUrl;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const imageUrl = await uploadImage();
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        imageUrl,
        inventory: Number(formData.inventory),
        active: formData.active,
      };

      const response = await fetch(productId ? `/api/admin/products/${productId}` : '/api/admin/products', {
        method: productId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Unable to save product.');
      }

      toast.success(productId ? 'Product updated.' : 'Product created.');
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Product save failed.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-pink-200/70 bg-white/90 p-8 shadow-xl">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Product name</span>
            <input
              value={formData.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
            <select
              value={formData.category}
              onChange={(event) => updateField('category', event.target.value as Product['category'])}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Description</span>
          <textarea
            value={formData.description}
            onChange={(event) => updateField('description', event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
            required
          />
        </label>

        <div className="grid gap-6 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Price</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(event) => updateField('price', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Inventory</span>
            <input
              type="number"
              min="0"
              value={formData.inventory}
              onChange={(event) => updateField('inventory', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
              required
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(event) => updateField('active', event.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-slate-700">Active product</span>
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Image upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="w-full rounded-2xl border border-dashed border-slate-300 px-4 py-3"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Image URL</span>
            <input
              value={formData.imageUrl}
              onChange={(event) => updateField('imageUrl', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
              placeholder="https://..."
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4 text-base font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Saving product...' : isUploading ? 'Uploading image...' : 'Save product'}
        </button>
      </form>
    </div>
  );
}
