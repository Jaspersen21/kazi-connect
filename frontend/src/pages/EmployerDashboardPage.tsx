import { Link } from "react-router-dom";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useEmployerJobs } from "../hooks/useEmployerJobs";
import JobCardSkeleton from "../components/JobCardSkeleton";

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
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-5xl ">
          <div className="h-6 w-64 rounded-xl bg-slate-200 animate-pulse" />
          <div className="mt-3 h-4 w-80 rounded-xl bg-slate-200 animate-pulse" />

          <div className="mt-8 space-y-4">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        </div>
      </main>
    );
  }

 if (error) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Unable to load jobs
          </h2>

          <p className="mt-2 text-slate-600">
            Something went wrong while loading your jobs. Please refresh the page and try again.
          </p>
        </div>
      </div>
    </main>
  );
}

  const jobs = data?.data ?? [];
  const hasJobs = jobs.length > 0;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Employer Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Manage the jobs you have created.
        </p>

        {!hasJobs && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No jobs yet
            </h2>

            <p className="mt-2 text-slate-600">
              You haven't posted any jobs yet. Create your first job to start
              receiving applications.
            </p>

            <Link
              to="/jobs/create"
              className="mt-4 inline-block rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Create Job
            </Link>
          </div>
        )}

        {hasJobs && (
          <div className="mt-8 space-y-4">
            {jobs.map((job) => (
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
                    {deleteJobMutation.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>


              </div>
            ))}
          </div>
        )}

        {deleteJobMutation.error && (
          <p className="mt-4 text-slate-600">
            Failed to delete job. Please try again.
          </p>
        )}
      </div>
    </main>
  );
}