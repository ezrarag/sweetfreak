import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">New product</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Create a catalog entry</h2>
      </div>
      <ProductForm />
    </section>
  );
}
