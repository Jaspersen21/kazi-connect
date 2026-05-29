import { Link, useParams } from "react-router-dom";
import { useJobApplications } from "../hooks/useJobApplications";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";

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
      <p className="p-8 text-slate-600">
        Loading applicants...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-red-600">
        Failed to load applicants.
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/employer/dashboard"
          className="text-sm font-medium text-violet-700 hover:text-violet-900"
        >
          ← Back to employer dashboard
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Job Applicants
          </h1>

          <p className="mt-2 text-slate-600">
            Review applicants for this job.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {applications?.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                No applicants yet
              </h2>

              <p className="mt-2 text-slate-600">
                Applicants will appear here once job seekers apply.
              </p>
            </div>
          ) : (
            applications?.map((application) => (
              <div
                key={application.application_id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {application.name}
                    </h2>

                    <p className="mt-1 text-slate-600">
                      {application.email}
                    </p>
                  </div>

                  <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
                    {application.status}
                  </span>
                  <div className="mt-4 flex gap-4">
                    {application.status !== "accepted" && (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            applicationId: application.application_id,
                            status: "accepted",
                          })
                        }
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                      >
                        Accept
                      </button>
                    )}
                    {application.status !== "rejected" && (
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            applicationId: application.application_id,
                            status: "rejected",
                          })
                        }
                        className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}