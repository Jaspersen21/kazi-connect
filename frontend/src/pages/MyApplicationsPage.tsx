import { Link } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";

export default function MyApplicationsPage() {
  const { data: applications, isLoading, isError } = useApplications();

  if (isLoading) {
    return <p className="p-8 text-slate-600">Loading applications...</p>;
  }

  if (isError) {
    return <p className="p-8 text-rose-600">Failed to load applications.</p>;
  }

  const applicationList = applications?.data ?? [];

  return (
    <main className="min-h-screen bg-slate-100 px-8 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="font-semibold text-violet-600">Your Progress</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-950">
            My Applications
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Track the jobs you have applied for and follow your application status.
          </p>
        </div>

        {applicationList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No applications yet
            </h2>

            <p className="mt-3 text-slate-600">
              Start exploring jobs and apply when you find a good match.
            </p>

            <Link
              to="/jobs"
              className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {applicationList.map((application: { application_id: string; title: string; company: string; status: string }) => (
              <div
                key={application.application_id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {application.title}
                    </h2>

                    <p className="mt-1 text-violet-700">
                      {application.company}
                    </p>
                  </div>

                  <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
                    {application.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}