import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-violet-600">
            Seeker Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage your job search
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Browse available opportunities, apply to jobs, and track the
            progress of your applications from one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/jobs"
              className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
            >
              Browse Jobs
            </Link>

            <Link
              to="/my-applications"
              className="rounded-xl bg-slate-100 px-5 py-3 font-medium text-slate-700 transition hover:text-violet-600"
            >
              My Applications
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Find opportunities
            </h2>

            <p className="mt-2 text-slate-600">
              Search and sort jobs to find openings that match your skills and
              interests.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Track applications
            </h2>

            <p className="mt-2 text-slate-600">
              See whether your applications are pending, accepted, or rejected.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}