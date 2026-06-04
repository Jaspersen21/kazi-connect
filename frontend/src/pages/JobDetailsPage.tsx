import { Link, useNavigate, useParams } from "react-router-dom";
import { useApplyToJob } from "../hooks/useApplyToJob";
import { useAuth } from "../context/useAuth";
import { useJob } from "../hooks/useJob";

export default function JobDetailsPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: job, isLoading, isError } = useJob(id);
  const applyMutation = useApplyToJob(id);

  function handleApply() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    applyMutation.mutate();
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading job details...</p>
        </div>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Job not found
          </h1>

          <p className="mt-2 text-slate-600">
            This job may have been removed or is no longer available.
          </p>

          <Link
            to="/jobs"
            className="mt-4 inline-block rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            Back to Jobs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/jobs"
          className="mb-6 inline-block text-sm font-medium text-slate-700 hover:text-violet-600"
        >
          ← Back to Jobs
        </Link>

        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            {job.title}
          </h1>

          <p className="mt-2 text-lg font-medium text-violet-700">
            {job.company}
          </p>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Job Description
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {job.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleApply}
            disabled={applyMutation.isPending || applyMutation.isSuccess}
            className="mt-8 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {applyMutation.isPending
              ? "Applying..."
              : applyMutation.isSuccess
              ? "Applied"
              : "Apply Now"}
          </button>

          {applyMutation.isSuccess && (
            <p className="mt-4 text-sm font-medium text-blue-700">
              Application submitted successfully.
            </p>
          )}

          {applyMutation.isError && (
            <p className="mt-4 text-sm font-medium text-slate-600">
              Failed to apply. You may have already applied for this job.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}