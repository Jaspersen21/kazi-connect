import { useEmployerJobs } from "../hooks/useEmployerJobs";
import { Link } from "react-router-dom";
import { useDeleteJob } from "../hooks/useDeleteJob";

export default function EmployerDashboardPage() {
  const { data, isLoading, error } = useEmployerJobs();
  const deleteJobMutation = useDeleteJob();

  function handleDelete(jobId: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job? This action cannot be undone."
    );

    if (!confirmDelete) return;

    deleteJobMutation.mutate(jobId);
  }

  if (isLoading) {
    return <p className="p-8 text-slate-600">Loading employer jobs...</p>;
  }

  if (error) {
    return <p className="p-8 text-slate-600">Failed to load employer jobs.</p>;
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
            <div key={job.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {job.title}
              </h2>

              <p className="mt-2 text-slate-600">{job.company}</p>

              <div className="mt-4 flex flex-wrap gap-4">
                <Link
                  to={`/employer/jobs/${job.id}/applications`}
                  className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  View Applicants
                </Link>

                <Link
                  to={`/employer/jobs/${job.id}/edit`}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-violet-600"
                >
                  Edit Job
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(job.id)}
                  disabled={deleteJobMutation.isPending}
                  className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}