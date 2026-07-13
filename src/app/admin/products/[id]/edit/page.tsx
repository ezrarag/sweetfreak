import ProductForm from '@/components/admin/ProductForm';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import type { Product } from '@/types';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const snapshot = await getFirebaseAdminDb().collection('products').doc(id).get();
  const product = snapshot.exists
    ? ({
        id: snapshot.id,
        ...snapshot.data(),
      } as Partial<Product>)
    : undefined;

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Edit product</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">{product?.name ?? 'Unknown product'}</h2>
      </div>
      <ProductForm product={product} productId={id} />
    </section>
  );
}
