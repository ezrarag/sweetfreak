'use client';

const templates = [
  {
    label: 'Flash Sale',
    message: 'Flash sale tonight only. Limited Sweet Freak drops are live now.',
  },
  {
    label: 'New Drop',
    message: 'New Sweet Freak flavor drop just landed. Tap in before it sells out.',
  },
  {
    label: 'Holiday',
    message: 'Holiday pre-orders are open. Book your candied fruit boxes early.',
  },
  {
    label: 'Custom',
    message: 'Sweet Freak is taking custom orders for your next event.',
  },
];

export default function PromotionTemplates({
  onSelect,
}: {
  onSelect: (message: string) => void;
}) {
  return (
    <div className="rounded-[2rem] border border-pink-200 bg-white/90 p-6 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Templates</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {templates.map((template) => (
          <button
            key={template.label}
            type="button"
            onClick={() => onSelect(template.message)}
            className="rounded-2xl bg-pink-50 px-4 py-4 text-left transition hover:bg-pink-100"
          >
            <p className="font-semibold text-slate-900">{template.label}</p>
            <p className="mt-2 text-sm text-slate-600">{template.message}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
