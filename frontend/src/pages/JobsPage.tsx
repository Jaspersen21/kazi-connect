import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import JobCardSkeleton from "../components/JobCardSkeleton";
import { useJobs } from "../hooks/useJobs";

function JobsPage() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: jobs, isLoading, error } = useJobs({
    search: debouncedSearch,
    sort: "title",
    order: sortOrder,
  });

  const jobList = jobs?.data ?? [];
  const hasJobs = jobList.length > 0;
  const hasSearch = debouncedSearch.trim().length > 0;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="h-5 w-32 rounded-xl bg-slate-200 animate-pulse" />
          <div className="mt-3 h-10 w-64 rounded-xl bg-slate-200 animate-pulse" />
          <div className="mt-3 h-4 w-96 max-w-full rounded-xl bg-slate-200 animate-pulse" />

          <div className="mt-8 space-y-4">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Unable to load jobs
          </h1>

          <p className="mt-2 text-slate-600">
            Something went wrong while loading available jobs. Please refresh
            the page and try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="font-semibold text-violet-600">Opportunities</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Available Jobs
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Explore current job openings and find opportunities that match your
            skills.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_220px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title or company..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-600"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-600"
          >
            <option value="asc">Title (A-Z)</option>
            <option value="desc">Title (Z-A)</option>
          </select>
        </div>

        {!hasJobs && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              {hasSearch ? "No matching jobs found" : "No jobs available yet"}
            </h2>

            <p className="mt-2 text-slate-600">
              {hasSearch
                ? "Try searching with a different job title or company name."
                : "There are no active jobs at the moment. Please check back later."}
            </p>
          </div>
        )}

        {hasJobs && (
          <div className="grid gap-5">
            {jobList.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default JobsPage;