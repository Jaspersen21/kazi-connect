import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../api/auth";
import { useAuth } from "../context/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const data = await loginUser(email, password);

      login(data.access_token);

      const currentUser = await getCurrentUser();

      if (currentUser.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobs");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Login failed. Please check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Login</h1>

        <p className="mt-2 text-slate-600">
          Welcome back to Kazi Connect.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-xl border border-slate-200 px-4 py-3 text-slate-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded-xl border border-slate-200 px-4 py-3 text-slate-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && (
            <p className="text-sm text-slate-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;