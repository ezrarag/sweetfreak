import MarketingComposer from '@/components/admin/MarketingComposer';

export default function AdminMarketingPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Marketing</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Plan and queue promotions</h2>
      </div>
      <MarketingComposer />
    </section>
  );
}
