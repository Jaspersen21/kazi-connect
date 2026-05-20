import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/useAuth';


const API_URL = import.meta.env.VITE_API_URL;

type JobsCountResponse = {
  count: number;
};

async function fetchJobsCount(): Promise<JobsCountResponse> {
  const response = await fetch(`${API_URL}/jobs/count`);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs count');
  }
  return response.json();
}

export default function Landing() {
  const { isLoggedIn } = useAuth();
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load count once
  useEffect(() => {
    let cancelled = false;

    fetchJobsCount()
      .then((res) => {
        if (!cancelled) setCount(res.count);
      })
      .catch((e) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Failed to load');
      });

    return () => {
      cancelled = true;
    };
  }, []);


  const primaryCta = isLoggedIn ? (
    <Link
      to="/jobs"
      className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
    >
      Browse Jobs
    </Link>
  ) : (
    <>
      <Link
        to="/jobs"
        className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
      >
        Browse Jobs
      </Link>
      <Link
        to="/profile"
        className="inline-flex items-center justify-center rounded-xl border border-violet-700/30 bg-white px-5 py-3 font-medium text-violet-800 transition hover:border-violet-700/60"
      >
        Create Profile
      </Link>
    </>
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-violet-600">Kazi Connect</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Find jobs faster. Build your profile once.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Discover verified employer opportunities and apply in minutes.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {primaryCta}

            <div className="sm:ml-auto">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-600">Live jobs</p>
                <p className="text-2xl font-bold text-slate-950">
                  {count === null ? '...' : count}
                </p>
                {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">Targeted filters</p>
              <p className="mt-2 text-sm text-slate-600">
                Search by location, category, and job type.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">Fast applications</p>
              <p className="mt-2 text-sm text-slate-600">
                Apply directly from the job details page.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">Verified employers</p>
              <p className="mt-2 text-sm text-slate-600">
                See “Verified Employer” badges while you browse.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-600">
          By continuing, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </main>
  );
}

