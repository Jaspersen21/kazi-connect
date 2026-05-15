import JobCard from '../components/JobCard'
import { useJobs } from '../hooks/useJobs'
import { useEffect ,useState } from 'react';

function JobsPage() {
  const [search, setSearch] = useState('');

  const [sortOrder, setSortOrder] = useState('asc');

  const[debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

  const { data: jobs, isLoading, error } = useJobs(
    { search: debouncedSearch,
      sort: 'title',
      order: sortOrder,
    }
  );

  const jobList = jobs?.data ?? [];

  if (isLoading) {
    return <p className="p-8 text-slate-600">Loading jobs...</p>
  }

  if (error) {
    return <p className="p-8 text-rose-600">Failed to fetch jobs</p>
  }

  return (
    <section className="min-h-screen bg-slate-50 px-8 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="font-semibold text-violet-600">Opportunities</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-950">
            Available Jobs
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore current job openings and find opportunities that match your skills.
          </p>
        </div>

        <div className='mb-6 grid gap-4 md:grid-cols-[1fr_220px]'>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, company, or location..."
            className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500'
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='mt-4 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
          >
            <option value="asc">Title (A-Z)</option>
            <option value="desc">Title (Z-A)</option>
          </select>
        </div>

        <div className="grid gap-5">
          {jobList.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default JobsPage