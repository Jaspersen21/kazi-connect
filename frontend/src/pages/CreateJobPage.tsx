import type { FormEvent } from "react";
import { useState } from "react";
import { createJob } from "../api/jobs";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateJobPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [ isSubmitting, setIsSubmitting] = useState(false);

 async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const data = await createJob({
            title,
            company,
            description,
        });
        console.log("Job created successfully", data);

        queryClient.invalidateQueries({ queryKey: ["jobs"] });

        navigate("/jobs");
        
    } catch (error) {
        console.error("Error creating job:", error);
    } finally {       
         setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Create Job
        </h1>

        <p className="mt-2 text-slate-600">
          Post a new opportunity for job seekers on Kazi Connect.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company
            </label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Kazi Connect"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={6}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            {isSubmitting ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </main>
  );
}