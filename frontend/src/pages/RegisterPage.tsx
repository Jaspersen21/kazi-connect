import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"seeker" | "employer">("seeker");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await registerUser({
        name,
        email,
        password,
        role,
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      setErrorMessage("Registration failed. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Create Account
        </h1>

        <p className="mt-2 text-slate-600">
          Join Kazi Connect as a job seeker or employer.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Account Type
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "seeker" | "employer")
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-600"
            >
              <option value="seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {errorMessage && (
            <p className="mt-4 text-sm text-slate-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}