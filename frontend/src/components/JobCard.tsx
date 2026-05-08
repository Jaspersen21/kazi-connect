import type { Job } from '../types/job'

type JobCardProps = {
  job: Job
}

function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-950">{job.title}</h3>
          <p className="mt-1 font-medium text-blue-700">{job.company}</p>
        </div>

        <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
          Active
        </span>
      </div>

      <p className="text-slate-600">{job.description}</p>
    </div>
  )
}

export default JobCard