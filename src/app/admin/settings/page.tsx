export default function AdminSettingsPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Settings</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Environment-backed admin settings</h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Use Firebase, Stripe, Resend, and social credentials from your deployment environment.
          Social platform tokens can also be stored in Firestore through Marketing Connect.
        </p>
      </div>
    </section>
  );
}
