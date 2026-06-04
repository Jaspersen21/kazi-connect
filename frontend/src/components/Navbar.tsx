import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const isSeeker = currentUser?.role === "seeker";
  const isEmployer = currentUser?.role === "employer";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
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

          {isSeeker && (
            <>
              <Link to="/dashboard" className="transition hover:text-violet-600">
                Dashboard
              </Link>

              <Link
                to="/my-applications"
                className="transition hover:text-violet-600"
              >
                My Applications
              </Link>
            </>
          )}

          {isEmployer && (
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
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:text-violet-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:text-violet-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;