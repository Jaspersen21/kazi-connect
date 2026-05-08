import type { Job } from "../types/job";

type JobCardProps = {
    job: Job
}

function JobCard({ job }: JobCardProps) {
    return (
        <div className="border rounded p-4 mb-4">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className= "text-gray-600">{job.company}</p>

            {job.description && (
                <p className="mt-2 text-gray-800">{job.description}</p>
            )}
        </div>


    )

}
export default JobCard;