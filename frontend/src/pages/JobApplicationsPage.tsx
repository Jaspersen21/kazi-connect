import { Link, useParams } from "react-router-dom";
import { useJobApplications } from "../hooks/useJobApplications";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { getStatusClasses } from "../lib/applicationStatus";

export default function JobApplicationsPage() {
  const { id } = useParams();

  const {
    data: applications,
    isLoading,
    error,
  } = useJobApplications(id ?? "");

  const updateStatusMutation = useUpdateApplicationStatus(id ?? "");

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading applicants...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Unable to load applicants
          </h2>

          <p className="mt-2 text-slate-600">
            Something went wrong while loading applicants. Please refresh the
            page and try again.
          </p>
        </div>
      </main>
    );
  }

  const applicantList = applications ?? [];
  const hasApplicants = applicantList.length > 0;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/employer/dashboard"
          className="text-sm font-medium text-slate-700 hover:text-violet-600"
        >
          ← Back to employer dashboard
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Job Applicants
          </h1>

          <p className="mt-2 text-slate-600">
            Review applicants for this job and update their application status.
          </p>
        </div>

        {!hasApplicants && (
          <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No applicants yet
            </h2>

            <p className="mt-2 text-slate-600">
              Applicants will appear here once job seekers apply.
            </p>
          </div>
        )}

        {hasApplicants && (
          <div className="mt-8 space-y-4">
            {applicantList.map((application) => (
              <div
                key={application.application_id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {application.name}
                    </h2>

                    <p className="mt-1 text-slate-600">
                      {application.email}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClasses(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  {application.status !== "accepted" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          applicationId: application.application_id,
                          status: "accepted",
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                      className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
                    >
                      {updateStatusMutation.isPending
                        ? "Updating..."
                        : "Accept"}
                    </button>
                  )}

                  {application.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          applicationId: application.application_id,
                          status: "rejected",
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-violet-600 disabled:opacity-50"
                    >
                      {updateStatusMutation.isPending
                        ? "Updating..."
                        : "Reject"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {updateStatusMutation.isError && (
          <p className="mt-4 text-slate-600">
            Failed to update application status. Please try again.
          </p>
        )}
      </div>
    </main>
  );
}