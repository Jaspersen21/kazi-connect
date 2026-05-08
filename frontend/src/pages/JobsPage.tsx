import JobCard from '../components/JobCard'
import { useJobs } from '../hooks/useJobs'

function JobsPage() {
  const { data: jobs, isLoading, error } = useJobs()

  if (isLoading) {
    return <p>Loading jobs...</p>
  }

  if (error) {
    return <p>Failed to fetch jobs</p>
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

      {jobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default JobsPage