import { Link } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";
import { getStatusClasses } from "../lib/applicationStatus";

type Application = {
  application_id: string;
  title: string;
  company: string;
  status: string;
};



export default function MyApplicationsPage() {
  const { data: applications, isLoading, isError } = useApplications();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading applications...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Unable to load applications
          </h2>

          <p className="mt-2 text-slate-600">
            Something went wrong while loading your applications. Please refresh
            the page and try again.
          </p>
        </div>
      </main>
    );
  }

  const applicationList: Application[] = applications?.data ?? [];

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="font-semibold text-violet-600">Your Progress</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            My Applications
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Track the jobs you have applied for and follow your application
            status.
          </p>
        </div>

        {applicationList.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
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
            {applicationList.map((application) => (
              <div
                key={application.application_id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {application.title}
                    </h2>

                    <p className="mt-1 text-violet-700">
                      {application.company}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}