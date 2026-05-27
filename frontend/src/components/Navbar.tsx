import { Link } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { data: currentUser } = useCurrentUser();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-4 shadow-sm backdrop-blur">
      <Link to="/" className="text-2xl font-bold text-violet-700">
        Kazi Connect
      </Link>

      <div className="flex items-center gap-6 text-slate-700">
        <Link to="/" className="transition hover:text-violet-600">
          Home
        </Link>

        <Link to="/jobs" className="transition hover:text-violet-600">
          Jobs
        </Link>

        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="transition hover:text-violet-600"
          >
            Dashboard
          </Link>
        )}

        {currentUser?.role === "seeker" && (
          <Link
            to="/my-applications"
            className="transition hover:text-violet-600"
          >
            My Applications
          </Link>
        )}

        {currentUser?.role === "employer" && (
          <>
            <Link
              to="/employer/dashboard"
              className="transition hover:text-violet-600"
            >
              Employer Dashboard
            </Link>

            <Link
              to="/jobs/create"
              className="transition hover:text-violet-600"
            >
              Create Job
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <button
            onClick={logout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-lg bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg border border-violet-600 px-4 py-2 text-violet-600 transition hover:bg-violet-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;