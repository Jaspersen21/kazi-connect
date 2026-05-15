import {  useState } from "react";
import type { FormEvent } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"seeker" | "employer">("seeker");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
        role,
      });

      console.log("Registration successful", data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Create Account
        </h1>

        <p className="mt-2 text-slate-600">
          Join Kazi Connect and start exploring opportunities.
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            >
              <option value="seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}