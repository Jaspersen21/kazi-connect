import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
          Access Denied
        </p>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Unauthorized
        </h1>

        <p className="mt-4 text-slate-600">
          You do not have permission to access this page.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}