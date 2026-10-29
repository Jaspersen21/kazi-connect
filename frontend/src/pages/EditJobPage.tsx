import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useJob } from "../hooks/useJob";
import { useUpdateJob } from "../hooks/useUpdateJob";
import type { Job, JobFormValues } from "../types/job";

// This component is mounted only when job data exists.
function LoadedEditJobForm({ job }: { job: Job }) {
  const navigate = useNavigate();

  const [values, setValues] = useState<JobFormValues>(() => ({
    title: job.title,
    company: job.company,
    description: job.description,
  }));

  const updateJobMutation = useUpdateJob(job.id);

  function handleSubmit(formValues: JobFormValues) {
    updateJobMutation.mutate(formValues, {
      onSuccess: () => {
        navigate("/employer/dashboard");
      },
    });
  }

  return (
    <>
      <JobForm
        values={values}
        onChange={setValues}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isSubmitting={updateJobMutation.isPending}
      />

      {updateJobMutation.isError && (
        <p className="text-slate-600">
          Failed to update job. Please try again.
        </p>
      )}
    </>
  );
}

export default function EditJobPage() {
  const { jobId } = useParams();

  const { data: job, isLoading, isError } = useJob(jobId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <p className="text-slate-600">Loading job...</p>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-12">
        <p className="text-slate-600">Failed to load job.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Job
          </h1>

          <p className="mt-2 text-slate-600">
            Update this job post and save your changes.
          </p>
        </div>

        <LoadedEditJobForm key={job.id} job={job} />
      </div>
    </main>
  );
}