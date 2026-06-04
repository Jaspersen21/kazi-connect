import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-4 inline-block rounded-xl bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                Built for job seekers and employers
              </p>

              <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
                Find opportunities. Review applicants. Hire with confidence.
              </h1>

              <p className="mt-4 text-slate-600">
                Kazi Connect helps job seekers discover local opportunities
                while giving employers a simple way to post jobs, review
                applicants, and make hiring decisions without confusion.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/jobs"
                  className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
                >
                  Browse Jobs
                </Link>

                <Link
                  to="/jobs/create"
                  className="rounded-xl bg-slate-100 px-6 py-3 font-medium text-slate-700 transition hover:text-violet-600"
                >
                  Post a Job
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-100 p-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-violet-600">
                  Employer preview
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Manage applicants from one dashboard
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-slate-100 p-4">
                    <p className="font-medium text-slate-900">
                      IT Support Specialist
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Parklands, Nairobi
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      6 applicants pending review
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <span className="rounded-xl bg-violet-600 px-4 py-2 text-sm text-white">
                      Accept
                    </span>

                    <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                      Reject
                    </span>

                    <span className="rounded-xl bg-violet-100 px-4 py-2 text-sm text-violet-700">
                      View Applicants
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Looking for work?
            </h2>

            <p className="mt-2 text-slate-600">
              Browse active opportunities, view job details, and apply directly
              from your account.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Hiring workers?
            </h2>

            <p className="mt-2 text-slate-600">
              Create job posts, receive applications, and manage applicants from
              your employer dashboard.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Clear hiring flow
            </h2>

            <p className="mt-2 text-slate-600">
              Track applications through pending, accepted, and rejected states
              so every decision is easy to follow.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            How Kazi Connect works
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-6">
              <p className="text-sm font-medium text-violet-600">Step 1</p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Employers post jobs
              </h3>

              <p className="mt-2 text-slate-600">
                Employers create job posts with the role, company, and
                description.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-6">
              <p className="text-sm font-medium text-violet-600">Step 2</p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Job seekers apply
              </h3>

              <p className="mt-2 text-slate-600">
                Seekers browse available jobs, open job details, and submit
                applications.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-6">
              <p className="text-sm font-medium text-violet-600">Step 3</p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Employers review applicants
              </h3>

              <p className="mt-2 text-slate-600">
                Employers view applicants and mark each application as accepted
                or rejected.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}