import SocialConnectForm from '@/components/admin/SocialConnectForm';

export default function AdminMarketingConnectPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">Social Connections</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Store social platform credentials</h2>
      </div>
      <SocialConnectForm />
    </section>
  );
}
