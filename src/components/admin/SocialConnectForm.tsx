'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function SocialConnectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    facebookPageId: '',
    facebookPageAccessToken: '',
    instagramBusinessAccountId: '',
    twitterApiKey: '',
    twitterApiSecret: '',
    twitterAccessToken: '',
    twitterAccessSecret: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/social/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Unable to save credentials.');
      }

      toast.success('Social credentials saved.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to save credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-pink-200 bg-white/90 p-8 shadow-xl">
      <Toaster position="top-center" />
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Connect social accounts</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          ['facebookPageId', 'Facebook Page ID'],
          ['facebookPageAccessToken', 'Facebook Page Access Token'],
          ['instagramBusinessAccountId', 'Instagram Business Account ID'],
          ['twitterApiKey', 'Twitter API Key'],
          ['twitterApiSecret', 'Twitter API Secret'],
          ['twitterAccessToken', 'Twitter Access Token'],
          ['twitterAccessSecret', 'Twitter Access Secret'],
        ].map(([key, label]) => (
          <label key={key} className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            <input
              value={formData[key as keyof typeof formData]}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400"
            />
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : 'Save and test connection'}
      </button>
    </form>
  );
}
