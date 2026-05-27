import { useEmployerJobs } from "../hooks/useEmployerJobs";
import { Link } from "react-router-dom";

export default function EmployerDashboardPage() {
  const { data, isLoading, error } = useEmployerJobs();

  if (isLoading) {
    return (
      <p className="p-8 text-slate-600">
        Loading employer jobs...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-red-600">
        Failed to load employer jobs.
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Employer Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Manage the jobs you have created.
        </p>

        <div className="mt-8 space-y-4">
          {data?.data.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {job.title}
              </h2>

              <p className="mt-2 text-slate-600">
                {job.company}
              </p>
                <Link to={`/employer/jobs/${job.id}/applications`}
                className="mt-4 inline-block rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700">
                  View Applicants
                </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}