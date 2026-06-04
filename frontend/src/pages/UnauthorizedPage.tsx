import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
          Access denied
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          You cannot access this page
        </h1>

        <p className="mt-4 text-slate-600">
          This area is protected. You may need to log in with the correct account
          type to continue.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Go to Login
          </Link>

          <Link
            to="/"
            className="rounded-xl bg-slate-100 px-5 py-3 font-medium text-slate-700 transition hover:text-violet-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}