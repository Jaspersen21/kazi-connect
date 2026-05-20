import { useMemo, useState } from 'react';

import { useAuth } from '../context/useAuth';
import { useCreateProfile, useProfile, useUpdateProfile } from '../hooks/useProfile';

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();

  const { data: profile, isLoading, error } = useProfile();

  const createMutation = useCreateProfile();
  const updateMutation = useUpdateProfile();

  const [savedKey, setSavedKey] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    location: '',
    headline: '',
    summary: '',
    skillsText: '',
  });

  // Seed form lazily when profile loads/changes (no useEffect syncing)
  if (profile?.id && profile.id !== savedKey) {
    const nextForm = {
      full_name: profile.full_name ?? '',
      phone: profile.phone ?? '',
      location: profile.location ?? '',
      headline: profile.headline ?? '',
      summary: profile.summary ?? '',
      skillsText: (profile.skills ?? []).join(', '),
    };
    setForm(nextForm);
    setSavedKey(profile.id);
  }

  const canUpdate = useMemo(() => Boolean(profile?.id), [profile?.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      full_name: form.full_name || undefined,
      phone: form.phone || undefined,
      location: form.location || undefined,
      headline: form.headline || undefined,
      summary: form.summary || undefined,
      skills: form.skillsText
        ? form.skillsText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };

    if (!isLoggedIn) return;

    if (canUpdate) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  if (isLoading) {
    return <p className="p-8 text-slate-600">Loading profile...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">Seeker Profile</h1>
        <p className="mt-2 text-slate-600">Tell employers about yourself.</p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {(createMutation.isError || updateMutation.isError) && (
            <p className="mb-4 text-sm font-medium text-rose-600">Failed to save profile.</p>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Full name</span>
              <input
                value={form.full_name}
                onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Phone</span>
              <input
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Location</span>
              <input
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Headline</span>
              <input
                value={form.headline}
                onChange={(e) => setForm((p) => ({ ...p, headline: e.target.value }))}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Summary</span>
              <textarea
                rows={5}
                value={form.summary}
                onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Skills (comma-separated)</span>
              <input
                value={form.skillsText}
                onChange={(e) => setForm((p) => ({ ...p, skillsText: e.target.value }))}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              {profile ? 'Updating existing profile' : 'Creating your profile'}
            </p>

            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateMutation.isPending || createMutation.isPending
                ? 'Saving...'
                : profile
                ? 'Save Changes'
                : 'Create Profile'}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-sm text-slate-600">Profile may not exist yet—use Create Profile.</p>
        )}
      </div>
    </main>
  );
}

