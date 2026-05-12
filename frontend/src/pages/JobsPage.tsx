import JobCard from '../components/JobCard'
import { useJobs } from '../hooks/useJobs'

function JobsPage() {
  const { data: jobs, isLoading, error } = useJobs()

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